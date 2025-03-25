import { RouteObject } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import Player from "../pages/Player";
import Team from "../pages/Team";

export const appRouter: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Player />,
            },
            {
                path: '/teams',
                element: <Team />,
            }
        ]
    }
]