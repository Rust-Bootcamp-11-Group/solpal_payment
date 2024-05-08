import {IdlAccounts, Program} from "@coral-xyz/anchor";
import {IDL, Subscription} from "./idl";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";

const programId = new PublicKey("C87Mkt2suddDsb6Y15hJyGQzu9itMhU7RGxTQw17mTm");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<Subscription>(IDL, programId, {
    connection,
});

export const [basicSubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("basic_subscription")],
    program.programId
);

export const [standardSubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("standard_subscription")],
    program.programId
);

export const [premiumSubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("premium_subscription")],
    program.programId
);

export type SubscriptionData = IdlAccounts<Subscription>["subscription"];