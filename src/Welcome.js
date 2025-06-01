import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";

function Welcome({ handleLogout }) {
    const [skillsHave, setSkillsHave] = useState([]);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?.skillsHave) {
            setSkillsHave(savedUser.skillsHave);
        }
    }, []);

    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <h2 className="welcome-title">Welcome to TTO</h2>
            <p className="welcome-subtitle">Swap skills and grow together</p>
            {/* 👇 Yetenekler başlığı */}
            <h4 className="skills-title">Senin Yeteneklerin</h4>
            <div className="skills-display-row">
                {skillsHave.slice(0, 3).map((skill, idx) => (
                    <div key={idx} className="circle-display">{skill}</div>
                ))}
            </div>

            <button className="profile-btn" onClick={() => window.location.href = "/profile"}>Profil</button>
            <button className="red" onClick={handleLogout}>Çıkış Yap</button>
        </div>
    );
}

export default Welcome;
