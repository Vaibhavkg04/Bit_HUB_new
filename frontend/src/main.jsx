import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./components/ChatPages/seniors.jsx";
import RegisterForm from "./components/AuthPages/register.jsx";
import Dashboard from "./components/dashboard/dashboard.jsx";
// ✅ Define router here
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/dashboard",
		element: <Dashboard />,
	},
	{
		path: "/InteractSeniors",
		element: <Chat />,
	},
	{
		path: "/Register",
		element: <RegisterForm />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
