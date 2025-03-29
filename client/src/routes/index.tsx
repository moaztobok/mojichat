import { useAuth } from "@clerk/clerk-react";
import { useEffect, useLayoutEffect } from "react";
import { Route, useNavigate } from "react-router-dom";

type TRoute = {
    path: string;
    element: React.ReactNode;
    children?: TRoute[];
}
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate()
    const { isSignedIn } = useAuth()
    useLayoutEffect(() => {
        if (!isSignedIn) {
            navigate('/login')
        }
    }, [isSignedIn])
    return <>{children}</>;
}
export const createProtectedRouter = (routes: TRoute[]) => {
    return routes.map((route) => {
        if (route.path === '/' ||
            route.path === '/home'
        )
            return <Route
                path={route.path}
                element={<AuthGuard> {route.element}</AuthGuard>}
                key={route.path}
            />

        if (route.children) {
            return <Route
                path={route.path}
                element={<AuthGuard> {route.element}</AuthGuard>}
                key={route.path}
            >
                {createProtectedRouter(route.children)}
            </Route>
        }
        return <Route
            path={route.path}
            element={route.element}
            key={route.path}
        />
    })

}
export const createPublicRouter = (routes: TRoute[]) => {
    return routes.map((route) => {
        if (route.children) {
            return <Route
                path={route.path}
                element={route.element}
                key={route.path}
            >
                {createPublicRouter(route.children)}
            </Route>
        }
        return <Route
            path={route.path}
            element={route.element}
            key={route.path}

        />
    })

}