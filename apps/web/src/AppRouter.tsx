import ProtectedGaurd from "./gaurds/ProtectedGaurd";
import UnProtectedGaurd from "./gaurds/UnProtectedGaurd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { Suspense } from "react";
const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));

const routes = createBrowserRouter([
	{
		element: <ProtectedGaurd />,
		children: [
			{
				path: "/",
				element: (
					<Suspense>
						<Home />
					</Suspense>
				),
			},
		],
	},
	{
		element: <UnProtectedGaurd />,
		children: [
			{
				path: "/login",
				element: (
					<Suspense>
						<Login />
					</Suspense>
				),
			},
			{
				path: "/signup",
				element: (
					<Suspense>
						<Signup />
					</Suspense>
				),
			},
		],
	},
]);

const AppRouter = () => {
	return <RouterProvider router={routes} />;
};
export default AppRouter;

