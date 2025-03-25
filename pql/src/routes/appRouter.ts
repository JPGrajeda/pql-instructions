import { RouteObject } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import Player from "../pages/Player";
import { Team } from "../pages/Team";

export const appRouter: RouteObject[] = [
    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Player,
            },
            {
                path: '/teams',
                Component: Team,
            }
        ]
    }
]