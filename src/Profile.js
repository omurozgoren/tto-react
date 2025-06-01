import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
    const [user, setUser] = useState(null);
    const [friendEmail, setFriendEmail] = useState("");
    const [friendStatus, setFriendStatus] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleGoBack = () => {
        navigate("/"); // Welcome sayfasına yönlendir
    };

    const handleGoChat = () => {
        navigate("/chat"); // ✅ Chat sayfasına yönlendir
    };

    const handleAddFriend = async () => {
        if (!friendEmail || !user?.email) return;

        try {
            const res = await axios.post("https://tto-backend.onrender.com/friend/add", {
                userEmail: user.email,
                friendEmail: friendEmail.trim()
            });
            setFriendStatus(res.data.message);
        } catch (err) {
            setFriendStatus(err.response?.data?.message || "Bir hata oluştu");
        }
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
            </div>

            <div className="friend-section">
                <input
                    type="email"
                    placeholder="Arkadaşının e-posta adresi"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                />
                <button onClick={handleAddFriend}>Arkadaş Ekle</button>
                {friendStatus && <p style={{ fontSize: "14px", color: "#333" }}>{friendStatus}</p>}
            </div>

            <div className="button-group">
                <button className="blue" onClick={handleGoChat}>Sohbete Git 💬</button>
                <button className="red" onClick={handleGoBack}>Ana Menü</button>
            </div>
        </div>
    );
}

export default Profile;
