import React, { useEffect, useState } from "react";
import "./dashboard.css";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:5001");

function Dashboard() {
	const navigate = useNavigate();

	const [profile, setProfile] = useState({
		name: "",
		email: "",
		batch: "",
		branch: "",
	});

	const [loading, setLoading] = useState(true);

	// Fetch user profile from backend
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = localStorage.getItem("token");

				const res = await fetch("http://localhost:5001/api/auth/profile", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				});

				const data = await res.json();

				if (res.ok && data.user) {
					setProfile({
						name: data.user.name || "",
						email: data.user.email || "",
						batch: data.user.batch || "",
						branch: data.user.branch || "",
					});
				} else {
					console.error("Failed to load profile:", data.message);
				}
			} catch (err) {
				console.error("Error fetching profile:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	const handleInputChange = (e) => {
		// setProfile({
		// 	...profile,
		// 	[e.target.name]: e.target.value,
		// });
	};
	const search = ()=>{
		navigate('/searchPeople')
	}
	const handleUpdate = () => {
		alert("Profile updated successfully!");
		// Optional: Send PUT request to update profile
	};

	const InteractSeniors = () => {
		navigate("/InteractSeniors");
	};
	const InteractAlumni = () => {
		navigate("/InteractAlumni")
	}

	return (
		<div className="app bbody">
			{/* Header */}
			<header className="header">
				<div className="logo">BIT Comm. Hub</div>
				<nav className="nav">
					<button className="nav-btn">🏠</button>
					<button className="nav-btn">💻</button>
					<button className="nav-btn">👥</button>
					<button className="nav-btn">📚</button>
					<button className="nav-btn">🎓</button>
				</nav>
				<div className="profile-icon">👤</div>
			</header>

			{/* Main Content */}
			<main className="main">
				{/* Sidebar */}
				<aside className="sidebar">
					<div className="card">
						<h3>Important Links</h3>
						<ul>
							<li><a href="#notice">Notice</a></li>
							<li><a href="#erp">ERP</a></li>
							<li><a href="#club">Club Detail</a></li>
							<li><a href="#welfare">Welfare Society</a></li>
							<li><a href="#contact">Contact BIT</a></li>
						</ul>
					</div>
				</aside>

				{/* Center Content */}
				<section className="content">
					{/* Welcome Card */}
					<div className="welcome-card">
						<h1 className="hello">Hello { profile.name}</h1>
						<h2>Welcome to BIT Community Hub</h2>
						<p>
							A digital space designed for learning and connection. Dive in,
							explore, and let's make every interaction count.
						</p>
					</div>

					{/* Action Cards */}
					<div className="action-grid">
						<div className="action-card">
							<h3>Report Hostel or Mess Issue</h3>
						</div>
						<button onClick={search}>
							<div className="action-card">
								<h3>Search People</h3>
							</div>
						</button>
						<button onClick={InteractAlumni}>
							<div className="action-card">
								<h3>Allumini Interaction</h3>
							</div>
						</button>
						<button onClick={InteractSeniors}>
							<div className="action-card">
								<h3>Within College</h3>
							</div>
						</button>
					</div>
				</section>

				{/* Profile Card */}
				<aside className="profile-card">
					{loading ? (
						<p>Loading profile...</p>
					) : (
						<>
							<div className="profile-circle">👤</div>
							<div className="profile-form">
								<div className="form-group">
									<label>Name:</label>
									<input
										type="text"
										name="name"
										value={profile.name}
										onChange={handleInputChange}
										placeholder="Enter your name"
									/>
								</div>
								<div className="form-group">
									<label>Email:</label>
									<input
										type="email"
										name="email"
										value={profile.email}
										onChange={handleInputChange}
										placeholder="Enter your email"
									/>
								</div>
								<div className="form-group">
									<label>Batch:</label>
									<input
										type="text"
										name="batch"
										value={profile.batch}
										onChange={handleInputChange}
										placeholder="Enter your batch"
									/>
								</div>
								<div className="form-group">
									<label>Branch:</label>
									<input
										type="text"
										name="branch"
										value={profile.branch}
										onChange={handleInputChange}
										placeholder="Enter your branch"
									/>
								</div>
								<button className="update-btn" onClick={handleUpdate}>
									Update
								</button>
							</div>
						</>
					)}
				</aside>
			</main>
		</div>
	);
}

export default Dashboard;
