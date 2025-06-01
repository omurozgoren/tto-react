import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";

function Profile({ handleLogout }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    if (!user) return <p>Yükleniyor...</p>;

    return (
        <div className="profile-card">
            <img src={logo} alt="TTO Logo" className="profile-logo" />
            <h2 className="profile-title">Profilim</h2>
            <p className="profile-name">{user.name}</p> {/* 👈 Email yerine isim */}

            <div className="profile-section">
                <h4>🎓 Sahip Olduğu Yetenekler</h4>
                <div className="pill-container">
                    {user.skillsHave && user.skillsHave.map((skill, i) => (
                        <span key={i} className="pill">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="profile-section">
                <h4>🔍 Öğrenmek İstediği Yetenekler</h4>
                <div className="pill-container">
                    {user.skillsWant && user.skillsWant.map((skill, i) => (
                        <span key={i} className="pill">{skill}</span>
                    ))}
                </div>
            </div>

            <div className="stats">
                <p><span className="stat-pill">⭐ Puan :</span> 4.7</p>
                <p><span className="stat-pill">⏳ Time Credits:</span> 12</p>
            </div>

            <button className="red" onClick={handleLogout}>Ana Menü</button>
        </div>
    );
}

export default Profile;
