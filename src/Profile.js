import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";

function Profile({ handleLogout }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleGoBack = () => {
        handleLogout(); // localStorage temizle
        navigate("/");  // ana sayfaya yönlendir
    };

    if (!user) return <p>Yükleniyor...</p>;

    return (
        <div className="profile-card">
            <img src={logo} alt="TTO Logo" className="profile-logo" />
            <h2 className="profile-title">Profilim</h2>
            <p className="profile-name">{user.name}</p>

            <div className="profile-section">
                <h4>🎓 Sahip Olduğu Yetenekler</h4>
                {user.skillsHave?.length > 0 ? (
                    <div className="pill-container">
                        {user.skillsHave.map((skill, i) => (
                            <span key={i} className="pill">{skill}</span>
                        ))}
                    </div>
                ) : <p style={{ color: "#999", fontSize: "14px" }}>Yetenek seçilmedi.</p>}
            </div>

            <div className="profile-section">
                <h4>🔍 Öğrenmek İstediği Yetenekler</h4>
                {user.skillsWant?.length > 0 ? (
                    <div className="pill-container">
                        {user.skillsWant.map((skill, i) => (
                            <span key={i} className="pill">{skill}</span>
                        ))}
                    </div>
                ) : <p style={{ color: "#999", fontSize: "14px" }}>Seçim yapılmadı.</p>}
            </div>

            <div className="stats">
                <p><span className="stat-pill">⭐ Puan :</span> 4.7</p>
                <p><span className="stat-pill">⏳ Time Credits:</span> 12</p>
            </div>

            <button className="red" onClick={handleGoBack}>Ana Menü</button>
        </div>
    );
}

export default Profile;
