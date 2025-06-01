// src/Welcome.js
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "./logo.jpeg";
import "./App.css";

const Welcome = ({ handleLogout }) => {
    const navigate = useNavigate();

    const goToProfile = () => {
        navigate("/profile");
    };

    return (
        <div className="welcome-page">
            <div className="card-container">
                <img src={logo} alt="TTO Logo" className="profile-logo" />
                <h1 className="welcome-title">Welcome to TTO</h1>
                <p className="welcome-subtitle">Swap skills and grow together</p>

                <div className="button-row">
                    <button className="circle-btn">Language</button>
                    <button className="circle-btn">Music</button>
                    <button className="circle-btn">Design</button>
                </div>

                <div className="button-row">
                    <button onClick={goToProfile} className="profile-btn">Profil</button>
                    <button onClick={handleLogout} className="red">Çıkış Yap</button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
