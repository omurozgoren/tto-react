import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import logo from "./logo.jpeg";
import Welcome from "./Welcome";
import Profile from "./Profile";

const skills = [
    "Guitar 🎸",
    "French 🇫🇷",
    "Spanish 🇪🇸",
    "Graphic Design 🎨",
    "Web Development 💻",
    "Photography 📸",
    "Public Speaking 🎤",
    "Cooking 🍳",
    "Yoga 🧘‍♀️",
    "Video Editing 🎬"
];

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [selectedSkillsHave, setSelectedSkillsHave] = useState([]);
    const [selectedSkillsWant, setSelectedSkillsWant] = useState([]);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?.email && savedUser?.token) {
            setEmail(savedUser.email);
            setIsLoggedIn(true);
        }
    }, []);

    const toggleSkill = (skill, list, setList) => {
        if (list.includes(skill)) {
            setList(list.filter(s => s !== skill));
        } else if (list.length < 3) {
            setList([...list, skill]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering
            ? "https://tto-backend.onrender.com/register"
            : "https://tto-backend.onrender.com/login";

        const payload = isRegistering
            ? {
                email,
                password,
                skillsHave: selectedSkillsHave,
                skillsWant: selectedSkillsWant,
            }
            : { email, password };

        try {
            const res = await axios.post(url, payload);
            setMessage(res.data.message);

            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify({
                    email,
                    token: res.data.token,
                    skillsHave: selectedSkillsHave,
                    skillsWant: selectedSkillsWant
                }));
                setIsLoggedIn(true);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Bir hata oluştu.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
        localStorage.removeItem("user");
        setMessage("Çıkış yapıldı.");
    };

    return (
        <Router>
            <div className="app-container">
                {isLoggedIn ? (
                    <Routes>
                        <Route path="/" element={<Welcome handleLogout={handleLogout} />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                ) : (
                    <>
                        <img src={logo} alt="TTO Logo" className="logo" />
                        <h2>{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="E-posta"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Şifre"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            {isRegistering && (
                                <>
                                    <h4>Sahip Olduğun Yetenekler (en fazla 3)</h4>
                                    <div className="pill-container">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className={`pill ${selectedSkillsHave.includes(skill) ? "selected" : ""}`}
                                                onClick={() => toggleSkill(skill, selectedSkillsHave, setSelectedSkillsHave)}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <h4>Öğrenmek İstediğin Yetenekler (en fazla 3)</h4>
                                    <div className="pill-container">
                                        {skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className={`pill ${selectedSkillsWant.includes(skill) ? "selected" : ""}`}
                                                onClick={() => toggleSkill(skill, selectedSkillsWant, setSelectedSkillsWant)}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}

                            <button type="submit">{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</button>
                        </form>
                        <button
                            className="switch-btn"
                            onClick={() => setIsRegistering(!isRegistering)}
                        >
                            {isRegistering
                                ? "Hesabın var mı? Giriş Yap"
                                : "Hesabın yok mu? Kayıt Ol"}
                        </button>
                        {message && <pre>{message}</pre>}
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
