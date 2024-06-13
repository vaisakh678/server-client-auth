import ProtectedGaurd from "./gaurds/ProtectedGaurd";
import UnProtectedGaurd from "./gaurds/UnProtectedGaurd";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
	{
		element: <ProtectedGaurd />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
		],
	},
	{
		element: <UnProtectedGaurd />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
];
export default routes;

