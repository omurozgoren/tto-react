import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useNavigate
} from "react-router-dom";
import "./App.css";
import logo from "./logo.jpeg";
import Welcome from "./Welcome";
import Profile from "./Profile";
import Chat from "./Chat"; // ✅ Chat bileşeni eklendi

const skills = [
    "Gitar 🎸",
    "Fransızca 🇫🇷",
    "İspanyolca 🇪🇸",
    "Grafik Tasarım 🎨",
    "Web Development 💻",
    "Fotoğraf 📸",
    "Konuşma 🎤",
    "Aşçılık 🍳",
    "Yoga 🧘‍♀️",
    "Vidyo Düzenleme 🎬"
];

function AppRoutes() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [selectedSkillsHave, setSelectedSkillsHave] = useState([]);
    const [selectedSkillsWant, setSelectedSkillsWant] = useState([]);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?.email && savedUser?.token) {
            setEmail(savedUser.email);
            setName(savedUser.name || "");
            setSelectedSkillsHave(savedUser.skillsHave || []);
            setSelectedSkillsWant(savedUser.skillsWant || []);
            setIsLoggedIn(true);
        }
    }, []);

    const toggleSkill = (skill, list, setList) => {
        if (list.includes(skill)) {
            setList(list.filter((s) => s !== skill));
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
                name,
                email,
                password,
                skillsHave: selectedSkillsHave,
                skillsWant: selectedSkillsWant
            }
            : { email, password };

        try {
            const res = await axios.post(url, payload);
            setMessage(res.data.message);

            if (res.data.token) {
                const storedData = {
                    name: res.data.name || name,
                    email,
                    token: res.data.token,
                    skillsHave: isRegistering
                        ? selectedSkillsHave
                        : res.data.skillsHave,
                    skillsWant: isRegistering
                        ? selectedSkillsWant
                        : res.data.skillsWant
                };

                localStorage.setItem("user", JSON.stringify(storedData));
                setName(storedData.name);
                setSelectedSkillsHave(storedData.skillsHave || []);
                setSelectedSkillsWant(storedData.skillsWant || []);
                setIsLoggedIn(true);
                navigate("/"); // ✅ Welcome sayfasına yönlendir
            }
        } catch (err) {
            setMessage(err.response?.data?.message || "Bir hata oluştu.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
        setName("");
        setSelectedSkillsHave([]);
        setSelectedSkillsWant([]);
        localStorage.removeItem("user");
        setMessage("Çıkış yapıldı.");
        navigate("/");
    };

    if (isLoggedIn) {
        return (
            <Routes>
                <Route path="/" element={<Welcome handleLogout={handleLogout} />} />
                <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
                <Route path="/chat" element={<Chat />} /> {/* ✅ Yeni chat route */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        );
    }

    return (
        <div className="app-container">
            <img src={logo} alt="TTO Logo" className="logo" />
            <h2>{isRegistering ? "Kayıt Ol" : "Giriş Yap"}</h2>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <input
                        type="text"
                        placeholder="İsminiz"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                )}
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
                                    onClick={() =>
                                        toggleSkill(skill, selectedSkillsHave, setSelectedSkillsHave)
                                    }
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
                                    onClick={() =>
                                        toggleSkill(skill, selectedSkillsWant, setSelectedSkillsWant)
                                    }
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
                {isRegistering ? "Hesabın var mı? Giriş Yap" : "Hesabın yok mu? Kayıt Ol"}
            </button>
            {message && <pre>{message}</pre>}
        </div>
    );
}

export default function App() {
    return (
        <Router>
            <AppRoutes />
        </Router>
    );
}
