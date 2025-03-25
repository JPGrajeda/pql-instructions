import { createBrowserRouter } from "react-router";
import { appRouter } from "./appRouter";
import { errorRouter } from "./errorRouter";


export const router = createBrowserRouter([
    ...appRouter,
    ...errorRouter
]);