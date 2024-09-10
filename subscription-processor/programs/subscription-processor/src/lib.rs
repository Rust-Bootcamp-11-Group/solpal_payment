use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("Fm52pPHemzrbA8FGjh2KTYjJYju3SGstnJwoJTCkESkm");

#[program]
pub mod subscription_processor {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> ProgramResult {
        let subscription_account = &mut ctx.accounts.subscription_account;
        subscription_account.authority = *ctx.accounts.authority.key;
        subscription_account.tier1_price = 1_000_000; // 0.001 SOL
        subscription_account.tier2_price = 5_000_000; // 0.005 SOL
        subscription_account.tier3_price = 10_000_000; // 0.01 SOL
        Ok(())
    }

    pub fn subscribe(ctx: Context<Subscribe>, tier: u8) -> ProgramResult {
        let subscription_account = &mut ctx.accounts.subscription_account;
        let user = &ctx.accounts.user;
        let price = match tier {
            1 => subscription_account.tier1_price,
            2 => subscription_account.tier2_price,
            3 => subscription_account.tier3_price,
            _ => return Err(ProgramError::InvalidArgument.into()),
        };

        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: user.to_account_info(),
                to: subscription_account.to_account_info(),
            },
        );

        anchor_lang::system_program::transfer(cpi_context, price)?;

        // Update user subscription status
        subscription_account.subscribers.push(Subscriber {
            user: *user.key,
            tier,
            paid_amount: price,
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 8 + 8 + 8 + 1000)] // Increased space for subscribers
    pub subscription_account: Account<'info, SubscriptionAccount>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Subscribe<'info> {
    #[account(mut)]
    pub subscription_account: Account<'info, SubscriptionAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}


#[account]
pub struct SubscriptionAccount {
    pub authority: Pubkey,
    pub tier1_price: u64,
    pub tier2_price: u64,
    pub tier3_price: u64,
    pub subscribers: Vec<Subscriber>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy)]
pub struct Subscriber {
    pub user: Pubkey,
    pub tier: u8,
    pub paid_amount: u64,
}