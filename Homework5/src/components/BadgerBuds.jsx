import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import BadgerBudsNavbar from "./nav/BadgerBudsNavbar";
import BadgerBudsDataContext from "../contexts/BadgerBudsDataContext";

export default function BadgerBuds() {

    const [buds, setBuds] = useState([]);

    useEffect(() => {
        fetch('https://cs571.org/api/s24/hw5/buds', {
            headers: {
                "X-CS571-ID": "bid_f1b2b24aab28bd2a2f7852d3b2631b258e7a3e587be609c19a027beb3117e513" 
            }
        })
            .then(res => res.json())
            .then(cats => {
                setBuds(cats)
            })
    }, []);

    console.log(buds)

    return <div>
        <BadgerBudsNavbar />
        <div style={{ margin: "1rem" }}>
            <BadgerBudsDataContext.Provider value={buds}>
                <Outlet />
            </BadgerBudsDataContext.Provider>
        </div>
    </div>
}