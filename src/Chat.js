// frontend/Chat.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Chat() {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        fetch(`http://localhost:5000/api/friends/${user.email}`)
            .then(res => res.json())
            .then(data => setFriends(data))
            .catch(err => console.error("Arkadaşlar alınamadı", err));
    }, []);

    const handleSelectFriend = (email) => {
        setSelectedFriend(email);
        setMessages([]); // örnek: mesajları sıfırla veya ileride mesaj çek
    };

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { from: "me", text: input }]);
        setInput("");
    };

    return (
        <div className="chat-container">
            <h2>Arkadaşlarınla Sohbet</h2>

            {!selectedFriend ? (
                <>
                    <h4>Bir arkadaş seç:</h4>
                    {friends.map((f, i) => (
                        <button
                            key={i}
                            className="blue"
                            style={{ margin: "5px" }}
                            onClick={() => handleSelectFriend(f.friendEmail)}
                        >
                            {f.friendEmail}
                        </button>
                    ))}
                    <br />
                    <button className="red" onClick={() => navigate("/profile")}>Geri Dön</button>
                </>
            ) : (
                <>
                    <h4>{selectedFriend} ile konuşuyorsun</h4>
                    <div className="chat-box">
                        {messages.map((msg, i) => (
                            <p key={i}><strong>{msg.from === "me" ? "Sen" : selectedFriend}:</strong> {msg.text}</p>
                        ))}
                    </div>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mesaj yaz..."
                    />
                    <button className="green" onClick={handleSend}>Gönder</button>
                    <br /><br />
                    <button className="red" onClick={() => setSelectedFriend(null)}>Kapat</button>
                </>
            )}
        </div>
    );
}

export default Chat;
