
import { Outlet } from "react-router";
import { Header } from "../components/header/Header";


export const MainLayout = () => {
    return(
        <>
            <Header></Header>
            <div className="container mt-5 mb-5">
                <Outlet />
            </div>
        </>
    )
}
