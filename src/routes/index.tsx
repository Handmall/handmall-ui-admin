import { RouteObject } from "react-router-dom";
import Dashboard from "@modules/Dashboard";
import Layout from "@components/AppLayout";
import Login from "@modules/Auth/login";
import NotFound from "@components/NotFound";
import categoryRoutes from "./category";
import departmentRoutes from "./department";
import vendorRoutes from "./vendor";

const routes: RouteObject[] = [
	{
		path: "/",
		element: <Layout />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: "category",
				children: categoryRoutes,
			},
			{
				path: "department",
				children: departmentRoutes,
			},
			{
				path: "vendor",
				children: vendorRoutes,
			},
		],
	},
	{
		path: "auth/*",
		children: [
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <NotFound />,
	},
];

export default routes;
