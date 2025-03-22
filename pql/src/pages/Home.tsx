import React, { useContext } from "react"
import TablePlayers from "../components/table/TablePlayers";
import { useForm } from "react-hook-form";
import { schema, FormData } from "../utils/teamSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTeams } from "../hooks/useTeams/useTeams";
import { usePlayers } from "../hooks/usePlayers/usePlayers";
import { AppContext } from "../context/appContext/AppContext";

interface propsHome {

}

const Home = (props: propsHome) => {
    const { state, postTeams } = useTeams();
    const appContext = useContext(AppContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {

        if (appContext?.playersSelected.length === 0)
            return false;

        postTeams({
            name: data.name,
            slogan: data.description || null,
            players: appContext?.playersSelected
        })

    });

    return (
        <React.Fragment>

            <form onSubmit={onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col mb-3">
                            <label className="form-label" htmlFor="name">* Name</label>
                            <input className="form-control" {...register("name")} />
                            <p>{errors.name?.message}</p>
                        </div>

                        <div className="col mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <input className="form-control" {...register("description")} />
                            <p>{errors.description?.message}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <TablePlayers />
                </div>
                
                <input type="submit" className="btn btn-primary" />
            </form>

        </React.Fragment>
    )
}

export default Home;