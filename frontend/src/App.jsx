import React, { useState } from "react";

import Dashboard from "./components/dashboard/dashboard";
import RegisterForm from "./components/AuthPages/register";
import LoginForm from "./components/AuthPages/login";
function App() {
	const [count, setCount] = useState(0);

	return (
		<>	
			 {/* <LoginForm/> */}
			{/*  <RegisterForm/> */} 
			<Dashboard />
		</>
	);
}

export default App;
