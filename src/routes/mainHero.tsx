import MainHero from "@/modules/mainHero";
import MainHeroCreate from "@/modules/mainHero/create";
import MainHeroEdit from "@/modules/mainHero/edit";
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
	{
		path: "edit/:mainHeroId",
		element: <MainHeroEdit />,
	},
];

export default mainHeroRoutes;
