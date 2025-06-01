import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import logo from "./logo.jpeg";

export default function Profile() {
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail") || "example@tto.com";

    return (
        <div className="profile-page">
            <div className="card-container">
                <img src={logo} alt="TTO Logo" className="profile-logo" />
                <h2 className="profile-title">Profilim</h2>
                <p className="profile-email">{email}</p>

                <div className="skills-section">
                    <h3>🎓 Sahip Olduğu Yetenekler</h3>
                    <div className="pill-container">
                        <span className="pill">🎸 Guitar</span>
                        <span className="pill">🇫🇷 French</span>
                    </div>

                    <h3>🔍 Öğrenmek İstediği Yetenekler</h3>
                    <div className="pill-container">
                        <span className="pill">🇫🇷 French</span>
                        <span className="pill">🎨 Graphic Design</span>
                    </div>
                </div>

                <div className="stats">
                    <div><strong>⭐ Puan :</strong> 4.7</div>
                    <div><strong>⏳ Time Credits:</strong> 12</div>
                </div>

                <button onClick={() => navigate("/")} className="red">Ana Menü</button>
            </div>
        </div>
    );
}
