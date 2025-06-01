import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";

function Welcome({ handleLogout }) {
    const [skillsHave, setSkillsHave] = useState([]);
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser) {
            if (savedUser.skillsHave?.length > 0) {
                setSkillsHave(savedUser.skillsHave);
            }
            if (savedUser.name) {
                setUserName(savedUser.name);
            }
        }
    }, []);

    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <h2 className="welcome-title">TTO' ya Hoş geldin </h2>
            <p className="welcome-subtitle">Seni görmek güzel, <strong>{userName}</strong>!</p>
            <p className="welcome-subtitle">Yeteneklerini paylaş, birlikte geliş.</p>

            {skillsHave.length > 0 && (
                <>
                    <h4 className="skills-title">Yeteneklerin</h4>
                    <div className="skills-display-row">
                        {skillsHave.slice(0, 3).map((skill, idx) => (
                            <div key={idx} className="circle-display">
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <button className="profile-btn" onClick={() => window.location.href = "/profile"}>
                Profil
            </button>
            <button className="red" onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
    );
}

export default Welcome;
