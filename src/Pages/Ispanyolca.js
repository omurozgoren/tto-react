import React, { useEffect, useState } from "react";
import axios from "axios";

function Ispanyolca() {
    const [users, setUsers] = useState([]);
    const currentUser = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await axios.get("http://localhost:5000/users?skill=İspanyolca 🇪🇸");
        setUsers(res.data);
    };

    const handleRate = async (toUserId, score) => {
        try {
            await axios.post("http://localhost:5000/rate", {
                fromUserId: currentUser._id,
                toUserId,
                skill: "İspanyolca 🇪🇸",
                score
            });
            fetchUsers(); // güncelle
        } catch (err) {
            alert("Zaten oy verdiniz veya hata oluştu.");
        }
    };

    return (
        <div className="profile-card">
            <h2>🇪🇸 İspanyolca Yetenek Odası</h2>

            {users.length === 0 ? (
                <p>Henüz kullanıcı yok.</p>
            ) : (
                users.map((user, idx) => (
                    <div key={user._id} className="pill-container" style={{ marginBottom: 12 }}>
                        <strong>{idx + 1}. {user.name}</strong>
                        <p>Puan: {user.points?.["İspanyolca 🇪🇸"] || 0}</p>
                        {user._id !== currentUser._id && (
                            <div>
                                {[1, 2, 3, 4, 5].map(star => (
                                    <button
                                        key={star}
                                        onClick={() => handleRate(user._id, star)}
                                        style={{ margin: "0 4px" }}
                                    >
                                        ⭐{star}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Ispanyolca;
