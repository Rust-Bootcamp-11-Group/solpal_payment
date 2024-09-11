import {IdlAccounts, Program} from "@coral-xyz/anchor";
import {IDL, SubscriptionProcessor} from "./idl";
import {clusterApiUrl, Connection, PublicKey} from "@solana/web3.js";

const programId = new PublicKey("C87Mkt2suddDsb6Y15hJyGQzu9itMhU7RGxTQw17mTm");
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

export const program = new Program<SubscriptionProcessor>(IDL, {
    connection,
    publicKey: programId
});

export const [subscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("account")],
    program.programId
);

export const [tier1SubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("account1")],
    program.programId
);

export const [tier2SubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("account2")],
    program.programId
);

export const [tier3SubscriptionPDA] = PublicKey.findProgramAddressSync(
    [Buffer.from("account3")],
    program.programId
);

export type SubscriptionData = IdlAccounts<SubscriptionProcessor>["subscriptionAccount"];