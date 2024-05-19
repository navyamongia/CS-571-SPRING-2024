
import React, { useEffect } from 'react';
import { useContext } from 'react';
import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
export default function BadgerLogout() {
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            // Maybe you need to do something here?
            sessionStorage.removeItem("loggedUser");
            setLoginStatus(false)
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
