import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

const appRouter = createBrowserRouter(routes);

const App: React.FC = () => {
	return <RouterProvider router={appRouter} />;
};

export default App;

