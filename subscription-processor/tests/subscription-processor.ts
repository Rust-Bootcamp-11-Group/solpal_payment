import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { SubscriptionProcessor } from "../target/types/subscription_processor";
import { PublicKey } from "@solana/web3.js";
import { assert } from "chai";
import { BN } from "bn.js";

describe("subscription-processor", () => {
    // Configure the client to use the local cluster
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.SubscriptionProcessor as Program<SubscriptionProcessor>;

    const [subscriptionPDA] = PublicKey.findProgramAddressSync(
      [Buffer.from("account")],
      program.programId,
    );

    it("Initializes the subscription contract", async () => {
      await program.methods
        .initialize()
        .rpc();

        const accountData = await program.account.subscriptionAccount.fetch(subscriptionPDA);         
        assert.ok(accountData.tier1Price.eq(new BN(1_000_000)), "tier 1 price");
        assert.ok(accountData.tier2Price.eq(new BN(5_000_000)), "tier 2 price");
        assert.ok(accountData.tier3Price.eq(new BN(10_000_000)), "tier 3 price");
        assert.ok(accountData.authority.equals(provider.wallet.publicKey), "authority");
        assert.ok(accountData.subscribers.length === 0, "subs");
    });

    it("Subscribes tier 1", async () => {
      await program.methods
      .subscribe(1)
      .rpc();

      const accountData = await program.account.subscriptionAccount.fetch(subscriptionPDA);
      assert.ok(accountData.subscribers.length === 1, "subs");
      assert.ok(accountData.subscribers[0].paidAmount.eq(new BN(1_000_000)), "paid amount");
      assert.ok(accountData.subscribers[0].user.equals(provider.publicKey), "payer public key");
    });

    it("Subscribes tier 2", async () => {
      await program.methods
      .subscribe(2)
      .rpc();

      const accountData = await program.account.subscriptionAccount.fetch(subscriptionPDA);
      assert.ok(accountData.subscribers.length === 2, "subs");
      assert.ok(accountData.subscribers[1].paidAmount.eq(new BN(5_000_000)), "paid amount");
      assert.ok(accountData.subscribers[1].user.equals(provider.publicKey), "payer public key");
    });
});
