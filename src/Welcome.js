import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";

function Welcome({ handleLogout }) {
    const [skillsHave, setSkillsHave] = useState([]);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

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

    const goToSkillPage = (skill) => {
        // Örnek: "İspanyolca 🇪🇸" -> "ispanyolca"
        const slug = skill.split(" ")[0].toLowerCase();
        navigate(`/skill/${slug}`);
    };

    return (
        <div className="welcome-container">
            <img src={logo} alt="Logo" className="welcome-logo" />
            <h2 className="welcome-title">TTO' ya Hoş geldin</h2>
            <p className="welcome-subtitle">
                Seni görmek güzel, <strong>{userName}</strong>!
            </p>
            <p className="welcome-subtitle">Yeteneklerini paylaş, birlikte geliş.</p>

            {skillsHave.length > 0 && (
                <>
                    <h4 className="skills-title">Yeteneklerin</h4>
                    <div className="skills-display-row">
                        {skillsHave.slice(0, 3).map((skill, idx) => (
                            <div
                                key={idx}
                                className="circle-display"
                                onClick={() => goToSkillPage(skill)}
                                style={{ cursor: "pointer" }}
                                title="Bu yetenek için sayfaya git"
                            >
                                {skill}
                            </div>
                        ))}
                    </div>
                </>
            )}

            <button className="profile-btn" onClick={() => navigate("/profile")}>
                Profil
            </button>
            <button className="red" onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
    );
}

export default Welcome;
