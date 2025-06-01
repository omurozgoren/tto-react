import React, { useEffect, useState } from "react";
import logo from "./logo.jpeg";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [friendEmail, setFriendEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        setUser(storedUser);
    }, []);

    const handleGoBack = () => {
        navigate("/");
    };

    const handleGoChat = () => {
        navigate("/chat");
    };

    const handleAddFriend = async () => {
        if (!friendEmail || !user?.email) return;

        try {
            const response = await fetch("http://localhost:5000/api/friends", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userEmail: user.email,
                    friendEmail
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Arkadaş başarıyla eklendi!");
                setFriendEmail("");
            } else {
                setMessage(data.error || "Bir hata oluştu.");
            }
        } catch (err) {
            setMessage("Sunucu hatası.");
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

            <div className="stats" style={{ marginBottom: "15px", marginTop: "25px" }}>
                <p><span className="stat-pill">⭐ Puan :</span> 4.7</p>
            </div>

            <div className="friend-section" style={{ marginBottom: "15px" }}>
                <input
                    type="email"
                    value={friendEmail}
                    placeholder="Arkadaşının e-posta adresi"
                    onChange={(e) => setFriendEmail(e.target.value)}
                    style={{ marginBottom: "8px" }}
                />
                <button
                    className="green"
                    style={{ marginBottom: "12px" }}
                    onClick={handleAddFriend}
                >
                    Arkadaş Ekle
                </button>
                {message && <p>{message}</p>}
            </div>

            <div className="button-group">
                <button className="blue" onClick={handleGoChat}>Sohbete Git 💬</button>
                <button className="red" onClick={handleGoBack}>Ana Menü</button>
            </div>
        </div>
    );
}

export default Profile;
