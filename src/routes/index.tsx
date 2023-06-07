import { RouteObject } from "react-router-dom";
import Dashboard from "../modules/Dashboard";
import Layout from "../components/Layout";
import Category from "../modules/Category";
import Department from "../modules/Department";
import Login from "../modules/Auth/login";

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
        ],
    },
    {
        path: 'auth/*',
        children: [
            {
                path: 'login',
                element: <Login />
            }
        ]
    }
]

export default routes