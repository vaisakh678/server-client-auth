import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import IResponseType from "@repo/interfaces/responseType";

const Tile: React.FC = () => {
	const [status, setStatus] = useState<"pending" | "fullfiled" | "rejected">("pending");
	const http = useHttp();

	useEffect(() => {
		const ref = setTimeout(async () => {
			const res = (await http.get("/test")).data as IResponseType;
			if (res.status) {
				setStatus("fullfiled");
			}
		}, 1000);
		return () => {
			clearTimeout(ref);
		};
	}, [http]);

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

	return <div className={`w-5 h-5 rounded-sm m-1 transition-colors ${bg}`} />;
};

export default Tile;

