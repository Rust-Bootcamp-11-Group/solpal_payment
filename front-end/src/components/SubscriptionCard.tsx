import {SubscriptionCardProps} from "../shared/types.ts";


export default function SubscriptionCard({title, price, isActive, onBuy}: SubscriptionCardProps) {
    return (
        <div className={`subscription-card ${isActive ? "active" : ""}`}>
            <h2>{title}</h2>
            <p>Price: {price}</p>
            <p>Status: {isActive ? "Paid" : "Not Paid"}</p>
            <button onClick={onBuy} disabled={isActive}>Buy Subscription</button>
        </div>
    );
}
