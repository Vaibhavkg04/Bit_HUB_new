import React, { useState } from "react";

import Dashboard from "./components/dashboard/dashboard";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Dashboard />
		</>
	);
}

export default App;
