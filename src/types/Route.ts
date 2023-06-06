interface Route {
    path: string,
    element: React.ReactNode,
    permission?: string,
    children?: Array<Route>
}