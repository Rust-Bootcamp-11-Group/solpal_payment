import {useEffect, useState} from "react";
import {useConnection, useWallet} from "@solana/wallet-adapter-react";
import {
    program,
    basicSubscriptionPDA,
    standardSubscriptionPDA,
    premiumSubscriptionPDA,
} from "../anchor/setup";
import SubscriptionCard from "./SubscriptionCard";
import {PublicKey} from "@solana/web3.js";
import {SUBSCRIPTION_PRICES} from "../shared/enum.ts";

export function SubscriptionState() {
    const {connection} = useConnection();
    const {publicKey, sendTransaction} = useWallet();
    const [userSubscriptions, setUserSubscriptions] = useState<Set<PublicKey>>(new Set());

    useEffect(() => {
        const fetchSubscriptionData = async () => {
            if (publicKey) {
                try {
                    // Fetch all subscription accounts
                    const subscriptionsList = await program.account.subscription.all();

                    // Filter subscriptions where the user has an active subscription
                    const userSubscriptionsList = subscriptionsList.filter(({publicKey}) => userSubscriptions.has(publicKey));
                    setUserSubscriptions(new Set(userSubscriptionsList.map(({publicKey}) => publicKey)));
                } catch (error) {
                    console.error("Error fetching subscription data:", error);
                }
            }
        };

        fetchSubscriptionData();

        const subscriptionId1 = connection.onAccountChange(basicSubscriptionPDA, (accountInfo) => {
            // Handle account change for basic subscription
        });
        const subscriptionId2 = connection.onAccountChange(standardSubscriptionPDA, (accountInfo) => {
            // Handle account change for standard subscription
        });
        const subscriptionId3 = connection.onAccountChange(premiumSubscriptionPDA, (accountInfo) => {
            // Handle account change for premium subscription
        });

        return () => {
            connection.removeAccountChangeListener(subscriptionId1);
            connection.removeAccountChangeListener(subscriptionId2);
            connection.removeAccountChangeListener(subscriptionId3);
        };
    }, [program, connection, publicKey]);

    const buySubscription = async (subscriptionPDA: PublicKey) => {
        if (!publicKey) return;

        try {
            const transaction = await program.methods
                .purchase() // Ensure this method name matches your actual method
                .accounts({
                    subscription: subscriptionPDA
                })
                .transaction();

            const transactionSignature = await sendTransaction(transaction, connection);
            console.log(`View on explorer: https://solana.fm/tx/${transactionSignature}?cluster=devnet`);
        } catch (error) {
            console.log(error);
        }
    };


    const isSubscriptionActive = (subscriptionPDA: PublicKey) => {
        return userSubscriptions.has(subscriptionPDA);
    };

    return (
        <div className="subscription-container">
            <div className="card-container">
                <SubscriptionCard
                    title="Basic Plan"
                    price={SUBSCRIPTION_PRICES.basic}
                    isActive={isSubscriptionActive(basicSubscriptionPDA)}
                    onBuy={() => buySubscription(basicSubscriptionPDA)}
                />
                <SubscriptionCard
                    title="Standard Plan"
                    price={SUBSCRIPTION_PRICES.standard}
                    isActive={isSubscriptionActive(standardSubscriptionPDA)}
                    onBuy={() => buySubscription(standardSubscriptionPDA)}
                />
                <SubscriptionCard
                    title="Premium Plan"
                    price={SUBSCRIPTION_PRICES.premium}
                    isActive={isSubscriptionActive(premiumSubscriptionPDA)}
                    onBuy={() => buySubscription(premiumSubscriptionPDA)}
                />
            </div>
        </div>
    );
}
