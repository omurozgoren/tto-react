import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import logo from "./logo.jpeg";
import Welcome from "./Welcome";
import Profile from "./Profile";

function App() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 🔄 Otomatik giriş kontrolü
    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        if (savedUser?.email && savedUser?.token) {
            setEmail(savedUser.email);
            setIsLoggedIn(true);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isRegistering
            ? "https://tto-backend.onrender.com/register"
            : "https://tto-backend.onrender.com/login";

        try {
            const res = await axios.post(url, { email, password });
            setMessage(res.data.message);

            // ✅ Giriş başarılıysa localStorage’a kullanıcıyı kaydet
            if (res.data.token) {
                localStorage.setItem("user", JSON.stringify({ email, token: res.data.token }));
            }

            setIsLoggedIn(true);
        } catch (err) {
            setMessage(err.response?.data?.message || "Bir hata oluştu.");
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail("");
        setPassword("");
        localStorage.removeItem("user"); // 🔴 Çıkışta sil
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
