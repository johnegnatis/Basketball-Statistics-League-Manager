import React from "react";
import { Link } from "react-router-dom";
import { NAV } from "../appConstants";

export const Navigation = () => {

    return (
        <nav>
            <Link to={NAV.INDEX}>Home</Link>
            <Link to={NAV.STATS}>Stats</Link>
            <Link to={NAV.TEAMS}>Teams</Link>
        </nav>
    )
}