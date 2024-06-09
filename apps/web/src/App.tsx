import React from "react";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const appRouter = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/",
		element: <Home />,
	},
]);

const App: React.FC = () => {
	return <RouterProvider router={appRouter} />;
};

export default App;

