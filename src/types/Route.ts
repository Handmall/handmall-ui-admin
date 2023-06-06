interface Route {
    path: string,
    element: JSX.Element,
    permission?: string,
    children?: Array<Route>
}