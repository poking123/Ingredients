import React from 'react';
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Inventory Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Shopping_List">Shopping List</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Recipes">Recipes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/Create_An_Account">Create An Account</Link>
                    </li>
                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar;