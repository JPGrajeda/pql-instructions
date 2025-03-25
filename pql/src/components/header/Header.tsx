import React from "react"
import { NavLink } from "react-router"


export const Header = () => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">

                        <img
                            src="/quidditch.png"
                            alt="Logo"
                            width="30"
                            height="24"
                            className="d-inline-block align-text-top" />

                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    Players
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    to="/teams"
                                    className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                >
                                    Teams
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}