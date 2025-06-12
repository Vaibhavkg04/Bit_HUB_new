import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./seniors.css";

const socket = io("http://localhost:5000");

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const messagesEndRef = useRef(null);

	const currentUser = "Ushgcfer"; // Replace with dynamic value if needed

	useEffect(() => {
		axios
			.get("http://localhost:5000/api/messages")
			.then((res) => setMessages(res.data))
			.catch(console.error);

		socket.on("chat message", (msg) => {
			setMessages((prev) => [...prev, msg]);
		});

		return () => socket.off("chat message");
	}, []);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const sendMessage = async () => {
		if (!input.trim()) return;
		const msg = { username: currentUser, content: input };
		await axios.post("http://localhost:5000/api/messages", msg);
		socket.emit("chat message", msg);
		setInput("");
	};

	return (
		<div className="chat-container">
			<div className="chat-box">
				<div className="chat-header">
					<h2>Chat</h2>
					<button className="chat-header-btn">LET'S CHAT APP</button>
				</div>

				<div className="chat-messages">
					{messages.map((msg, idx) => {
						const isCurrentUser = msg.username === currentUser;
						return (
							<div
								key={idx}
								className={`message-row ${isCurrentUser ? "sent" : "received"}`}
							>
								<div className="message-bubble">
									<p className="message-username">{msg.username}</p>
									<p className="message-text">{msg.content}</p>
									<p className="message-time">
										{new Date().toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}
									</p>
								</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>

				<div className="chat-input-container">
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Type message"
						className="chat-input"
					/>
					<button onClick={sendMessage} className="chat-send-btn">
						Send
					</button>
				</div>
			</div>
		</div>
	);
};

export default Chat;
