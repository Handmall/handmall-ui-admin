import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
// import Department from '../pages/Department/index';
// import DepartmentCreate from '../pages/Department/Create';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'department',
                element: <h1>Depa123</h1>,
            },
        ],
    },
    {
        path: 'abc',
        element: <h1>Depa</h1>,
    },
]);

export default router;
