import { RouteObject } from "react-router-dom";
import Dashboard from "@modules/Dashboard/index.tsx";
import Layout from "@components/AppLayout.tsx";
import Login from "@modules/Auth/login.tsx";
import NotFound from "@components/NotFound.tsx";
import categoryRoutes from "./category.tsx";
import departmentRoutes from "./department.tsx";
import vendorRoutes from "./vendor.tsx";

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
