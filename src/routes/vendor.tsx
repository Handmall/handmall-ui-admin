import Vendor from "@/modules/Vendor";
import VendorCreate from "@/modules/Vendor/create";
import VendorEdit from "@/modules/Vendor/edit";
import { RouteObject } from "react-router-dom";

const vendorRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <Vendor />,
	},
	{
		path: "create",
		element: <VendorCreate />,
	},
	{
		path: "edit/:vendorId",
		element: <VendorEdit />,
	},
];

export default vendorRoutes;
