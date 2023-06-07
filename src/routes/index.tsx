import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import Layout from "../components/Layout";
import Category from "../modules/Category";
import Department from "../modules/Department";

const routes: RouteObject[] = [
    {
        path: '*',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Dashboard/>
            },
            {
                path: 'category',
                element: <Category/>
            },
            {
                path: 'department',
                element: <Department/>
            }
        ]
    }
]

export default routes