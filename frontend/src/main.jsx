import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chat from "./components/ChatPages/seniors.jsx";
// ✅ Define router here
const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/InteractSeniors",
		element: <Chat />,
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
