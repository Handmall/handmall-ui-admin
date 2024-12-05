import TagCreate from "@/modules/tag/create.tsx";
import TagEdit from "@/modules/tag/edit.tsx";
import TagIndex from "@/modules/tag/index.tsx";
import { RouteObject } from "react-router-dom";

const Tag: RouteObject[] = [
	{
		path: "",
		index: true,
		element: <TagIndex />,
	},
	{
		path: "create",
		element: <TagCreate />,
	},
	{
		path: "edit/:tagId",
		element: <TagEdit />,
	},
];

export default Tag;