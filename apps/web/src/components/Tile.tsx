import React, { useEffect, useState } from "react";

const Tile: React.FC = () => {
	const [status, setStatus] = useState<"pending" | "fullfiled" | "rejected">("pending");

	useEffect(() => {
		const timer = setTimeout(() => {
			setStatus("fullfiled");
			console.log("set");
		}, 3000);
		return () => {
			clearTimeout(timer);
		};
	}, []);

	let bg = "bg-blue-500";
	switch (status) {
		case "pending":
			bg = "bg-blue-500";
			break;
		case "fullfiled":
			bg = "bg-yellow-500";
			break;
		case "rejected":
			bg = "bg-red-500";
			break;
	}

	return <div className={`w-5 h-5 rounded-sm m-1 ${bg}`} />;
};

export default Tile;

