import React, { useContext, useRef, useState } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router";
import user from "../assets/images/user.svg";
import { userDataContext } from "../../App";
export default function Header() {
    const navigate = useNavigate();

    let {userData, updateUserData} = useContext(userDataContext);

    return (
        <header>
            <div className="left">
                <h1>
                    <a href="/">
                        <img src={logo} alt="logo" />
                    </a>
                </h1>
            </div>
            <div className="right">
                {userData ? (
                    <button
                        className="logout"
                        onClick={() => {
                            updateUserData({type: "LOGOUT"})
                        }}
                    >
                        Log Out
                    </button>
                ) : (
                    <button onClick={() => navigate("/auth/login")}>
                        Login
                    </button>
                )}
            </div>
        </header>

        // So here we took the userData from context userDataContext using useContext
        // Now we can check that userData is present or not
        // if true it will dispaly logout else it will be login
        // Go to App.js

        // So we took the functon from the context and called in the click event 
        // here the tyoe is logout so it wil clear the local storage and userData
    );
}
