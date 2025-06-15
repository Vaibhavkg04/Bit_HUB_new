import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./seniors.css";

const socket = io("http://localhost:5001");

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const [image, setImage] = useState(null);
	const messagesEndRef = useRef(null);

	const currentUser = "Ushgcfer"; // Replace with dynamic value if needed

	useEffect(() => {
		axios
			.get("http://localhost:5001/api/messages")
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
		if (!input.trim() && !image) return;

		const formData = new FormData();
		formData.append("username", currentUser);
		formData.append("content", input);
		if (image) {
			formData.append("image", image);
		}

		try {
			const res = await axios.post("http://localhost:5001/api/messages", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});
			socket.emit("chat message", res.data); // Emit the full saved message
			setInput("");
			setImage(null);
		} catch (err) {
			console.error("Message send failed", err);
		}
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
									{msg.image && (
										<img
											src={msg.image}
											alt="attachment"
											className="message-image"
										/>
									)}
									<p className="message-time">
										{new Date(msg.createdAt).toLocaleTimeString([], {
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
					<input
						type="file"
						accept="image/*"
						onChange={(e) => setImage(e.target.files[0])}
						className="chat-file-input"
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
