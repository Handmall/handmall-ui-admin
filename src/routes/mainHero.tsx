import MainHero from "@/modules/mainHero";
import MainHeroCreate from "@/modules/mainHero/create";
import { RouteObject } from "react-router-dom";

const mainHeroRoutes: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <MainHero />,
	},
	{
		path: "create",
		element: <MainHeroCreate />,
	},
];

export default mainHeroRoutes;
