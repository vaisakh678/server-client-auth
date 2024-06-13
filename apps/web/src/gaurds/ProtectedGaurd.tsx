import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedGaurd: React.FC = () => {
	const isAuthed = localStorage.getItem("accessToken");
	if (isAuthed) return <Outlet />;
	return <Navigate to={"/login"} />;
};

export default ProtectedGaurd;

