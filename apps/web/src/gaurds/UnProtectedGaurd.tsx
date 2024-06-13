import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const UnProtectedGaurd: React.FC = () => {
	const isAuthed = localStorage.getItem("accessToken");
	if (isAuthed) return <Navigate to={"/"} />;
	return <Outlet />;
};

export default UnProtectedGaurd;

