import React, { useState } from "react";

function App() {
	const [profile, setProfile] = useState({
		name: "",
		email: "",
		batch: "",
		branch: "",
	});

	const handleInputChange = (e) => {
		setProfile({
			...profile,
			[e.target.name]: e.target.value,
		});
	};

	const handleUpdate = () => {
		alert("Profile updated successfully!");
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
			{/* Header */}
			<header className="bg-white/90 backdrop-blur-xl border-b border-indigo-100 px-8 py-4 flex justify-between items-center shadow-lg shadow-indigo-500/5">
				<div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300">
					BIT Comm. Hub
				</div>

				<nav className="flex gap-2">
					{["🏠", "💻", "👥", "📚", "🎓"].map((icon, index) => (
						<button
							key={index}
							className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 p-3 rounded-xl text-xl text-indigo-600 hover:from-blue-50 hover:to-indigo-100 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300"
						>
							{icon}
						</button>
					))}
				</nav>

				<div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-3 rounded-full text-xl text-amber-600 hover:from-orange-50 hover:to-amber-100 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer">
					👤
				</div>
			</header>

			{/* Main Content */}
			<main className="grid grid-cols-1 lg:grid-cols-[300px_1fr_350px] gap-8 p-8 max-w-7xl mx-auto">
				{/* Sidebar */}
				<aside className="order-2 lg:order-1">
					<div className="bg-white/80 backdrop-blur-xl border border-indigo-100 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300">
						<h3 className="text-purple-900 text-xl font-semibold mb-4">
							Important Links
						</h3>
						<ul className="space-y-3">
							{[
								"Notice",
								"ERP",
								"Club Detail",
								"Welfare Society",
								"Contact BIT",
							].map((link, index) => (
								<li key={index}>
									<a
										href="#"
										className="block text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 py-2 px-3 rounded-lg hover:pl-4 transition-all duration-300"
									>
										{link}
									</a>
								</li>
							))}
						</ul>
					</div>
				</aside>

				{/* Center Content */}
				<section className="order-1 lg:order-2 flex flex-col gap-8">
					{/* Welcome Card */}
					<div className="bg-gradient-to-br from-white/90 to-indigo-50/90 backdrop-blur-xl border border-indigo-100 rounded-2xl p-12 text-center shadow-xl shadow-indigo-500/5">
						<h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
							Hello
						</h1>
						<h2 className="text-purple-900 text-2xl font-medium mb-4">
							Welcome to BIT Community Hub
						</h2>
						<p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
							A digital space designed for learning, and connection. Dive in,
							explore, and let's make every interaction count.
						</p>
					</div>

					{/* Action Cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-gradient-to-br from-red-50/80 to-pink-50/80 backdrop-blur-xl border border-red-200 rounded-2xl p-8 text-center cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-red-500/15 hover:border-red-300 transition-all duration-300">
							<h3 className="text-slate-700 text-lg font-semibold leading-snug">
								Report Hostel or Mess Issue?
							</h3>
						</div>

						<div className="bg-gradient-to-br from-purple-50/80 to-indigo-50/80 backdrop-blur-xl border border-purple-200 rounded-2xl p-8 text-center cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/15 hover:border-purple-300 transition-all duration-300">
							<h3 className="text-slate-700 text-lg font-semibold leading-snug">
								Anything to ask to Your Professors?
							</h3>
						</div>

						<div className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-xl border border-green-200 rounded-2xl p-8 text-center cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-green-500/15 hover:border-green-300 transition-all duration-300">
							<h3 className="text-slate-700 text-lg font-semibold leading-snug">
								Having Academic Doubts?
							</h3>
						</div>

						<div className="bg-gradient-to-br from-orange-50/80 to-amber-50/80 backdrop-blur-xl border border-orange-200 rounded-2xl p-8 text-center cursor-pointer hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-500/15 hover:border-orange-300 transition-all duration-300">
							<h3 className="text-slate-700 text-lg font-semibold leading-snug">
								Want to interact from seniors?
							</h3>
						</div>
					</div>
				</section>

				{/* Profile Card */}
				<aside className="order-3">
					<div className="bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-xl border border-indigo-100 rounded-2xl p-6 shadow-xl shadow-indigo-500/5 flex flex-col items-center gap-6">
						<div className="w-24 h-24 border-2 border-indigo-300 rounded-full bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center text-3xl text-indigo-600">
							👤
						</div>

						<div className="w-full space-y-4">
							<div>
								<label className="block text-slate-700 mb-2 font-medium text-sm">
									Name:
								</label>
								<input
									type="text"
									name="name"
									value={profile.name}
									onChange={handleInputChange}
									placeholder="Enter your name"
									className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-300"
								/>
							</div>

							<div>
								<label className="block text-slate-700 mb-2 font-medium text-sm">
									Email:
								</label>
								<input
									type="email"
									name="email"
									value={profile.email}
									onChange={handleInputChange}
									placeholder="Enter your email"
									className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-300"
								/>
							</div>

							<div>
								<label className="block text-slate-700 mb-2 font-medium text-sm">
									Batch:
								</label>
								<input
									type="text"
									name="batch"
									value={profile.batch}
									onChange={handleInputChange}
									placeholder="Enter your batch"
									className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-300"
								/>
							</div>

							<div>
								<label className="block text-slate-700 mb-2 font-medium text-sm">
									Branch:
								</label>
								<input
									type="text"
									name="branch"
									value={profile.branch}
									onChange={handleInputChange}
									placeholder="Enter your branch"
									className="w-full px-3 py-3 border-2 border-slate-200 rounded-xl bg-white/80 text-slate-700 text-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:bg-white focus:shadow-lg focus:shadow-indigo-500/10 transition-all duration-300"
								/>
							</div>

							<button
								onClick={handleUpdate}
								className="w-full px-3 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none rounded-xl font-semibold cursor-pointer hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-300"
							>
								Update
							</button>
						</div>
					</div>
				</aside>
			</main>
		</div>
	);
}

export default Dashbora;
