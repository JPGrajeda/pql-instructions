import React, { use, useContext, useEffect } from "react"
import { TableTeams } from "../components/table/TableTeams"
// import { useAppContext } from "../hooks/useAppContext/useAppContext"
import { useTeams } from "../hooks/useTeams/useTeams";
import { usePlayers } from "../hooks/usePlayers/usePlayers";

interface GroupByTeam {
    team: Team;
    player?: Player
}

interface TeamKeyValueObj {
    [id: string]: string,
}

export const Team = () => {
    // const { players, teams, setTeams  } = useAppContext();
    const { state: teamState } = useTeams();
    const { state: playerState, getPlayersUnavailable } = usePlayers();

    const teamKeyValue = teamState.data?.reduce<TeamKeyValueObj>((obj, team) => {
        obj[team.id] = team.name;
        return obj;
    }, {} as TeamKeyValueObj) || {};


    const groupedByTeam = playerState.data?.reduce<Record<string, Player[]>>(
        (acc, player) => {

            const teamName = player.team_id != null && teamKeyValue[player.team_id]
                ? teamKeyValue[player.team_id]
                : "Unknown Team";

            if (!acc[teamName]) {
                acc[teamName] = [];
            }

            acc[teamName].push({ ...player });
            return acc;
        }, {} as Record<string, Player[]>) || {}; // Si es undefined, devolver un objeto vacío

    console.log("🚀 ~ Team ~ groupedByTeam:", groupedByTeam)

    useEffect(() => {
        getPlayersUnavailable();
    }, []);

    return (
        <React.Fragment>




            {
                Object.entries(groupedByTeam).map(([teamName, players]) => (

                    <ol className="list-group mb-2" key={teamName}>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{teamName}</div>
                                {players.map(player => (
                                    <li key={player.id}>
                                        {player.name} - {player.position}
                                    </li>
                                ))}
                            </div>
                            <span className="badge text-bg-primary rounded-pill">{players.length}</span>
                        </li>
                    </ol>



                    // <div key={teamName}>
                    //     <h2>{teamName}</h2>
                    //     <ul>
                    //         {players.map(player => (
                    //             <li key={player.id}>
                    //                 {player.name} - {player.position}
                    //             </li>
                    //         ))}
                    //     </ul>
                    // </div>
                ))
            }

        </React.Fragment>
    )
}