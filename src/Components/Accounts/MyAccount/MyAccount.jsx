import React, { useEffect, useState } from "react";
import "./MyAccount.css";

const MyAccount = () => {
    const [user, setUser] = useState(null);
    const [account, setAccount] = useState(null);

useEffect(() => {
    const logged = JSON.parse(localStorage.getItem("loggedInUser") || "null");
    setUser(logged);

    try {
        const accounts = JSON.parse(localStorage.getItem("accounts") || "[]");
        if (logged && logged.email) {
        const found = accounts.find(a => String(a.email || "").toLowerCase() === String(logged.email || "").toLowerCase());
        setAccount(found || null);
        } else {
        setAccount(null);
    }
    } catch {
        setAccount(null);
    }
}, []);

    if (!user) {
        return (
            <div className="my-account">
                <h2>Account</h2>
                <p>You are not logged in.</p>
            </div>
    );
}

    return (
        <div className="my-account">
            <h2>My Account</h2>
        <div className="account-section">
            <h3>Account details</h3>
        <div className="account-row">
            <div className="field">
            <div className="label">Name</div>
            <div className="value">{account?.name || "—"}</div>
            </div>
            <div className="field">
            <div className="label">Email</div>
            <div className="value">{account?.email || "—"}</div>
            </div>
            <div className="field">
            <div className="label">Password</div>
            <div className="value">{account?.password ? String(account.password) : "—"}</div>
        </div>
    </div>
    </div>
    <div className="account-section">
            <h3>Orders</h3>
        {Array.isArray(JSON.parse(localStorage.getItem("orders") || "[]")) && JSON.parse(localStorage.getItem("orders") || "[]").length === 0 ? (
            <p style={{ color: "#6b7280" }}>You have no orders yet.</p>
        ) : (
            <div className="order-list">
            {(JSON.parse(localStorage.getItem("orders") || "[]")).filter(o => (o.email||"").toLowerCase() === (user.email||"").toLowerCase()).map(o => (
                <div className="order-card" key={o.id}>
                <div className="order-top">
                    <div className="order-id">{o.id}</div>
                    <div className="order-total">${Number(o.total||0).toFixed(2)}</div>
                </div>
                <div className="order-meta">{o.items} • {o.date}</div>
                </div>
            ))}
        </div>
        )}
    </div>
    </div>
    );
};

export default MyAccount;
