import React, { use, useRef, useState } from "react"
import TablePlayers from "../components/table/TablePlayers";
import { useForm } from "react-hook-form";
import { schema, FormData } from "../utils/teamSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTeams } from "../hooks/useTeams/useTeams";
import TeamDropdown from "../components/dropdown/TeamDropdown";
import { useAppContext } from "../hooks/useAppContext/useAppContext";
import { usePlayers } from "../hooks/usePlayers/usePlayers";
import { PlayerAddModal } from "../components/modal/PlayerAddModal";

interface propsHome {

}

const Player = (props: propsHome) => {
    const [stateTeam, setTeam] = useState<{ nameTeam: string, descriptionTeam: string | null }>({ nameTeam: '', descriptionTeam: '' })
    const modalRef = useRef<{ open: () => void; close: () => void } | null>(null);
    const { teams } = useAppContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: yupResolver(schema),
    });

    const onSubmit = handleSubmit(async (data) => {

        modalRef.current?.open();

        setTeam((prevState) => ({
            ...prevState,
            nameTeam: data.name,
            descriptionTeam: data.description || null
        }));

        // if (playersSelected.length === 0)
        //     return false;

        // await postTeam({
        //     name: data.name,
        //     slogan: data.description || null,
        //     players: playersSelected
        // })

        // await getPlayers();

    });

    return (
        <React.Fragment>

            {
                teams.length > 0 &&
                <React.Fragment>
                    <div className="card p-3">
                        <TeamDropdown />
                    </div>
                    <br />
                </React.Fragment>
            }

            <form onSubmit={onSubmit}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label className="form-label" htmlFor="name">* Name</label>
                            <input className="form-control" {...register("name")} />
                            <p>{errors.name?.message}</p>
                        </div>

                        <div className="col-md-8 mb-3">
                            <label className="form-label" htmlFor="description">Description</label>
                            <input className="form-control" {...register("description")} />
                            <p>{errors.description?.message}</p>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <TablePlayers />
                </div>

                <br />
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <input type="submit" className="btn btn-primary right" value="Create Team" />
                </div>
            </form>

            <PlayerAddModal nameTeam={stateTeam.nameTeam} descriptionTeam={stateTeam.descriptionTeam} ref={modalRef} />

        </React.Fragment>
    )
}

export default Player;