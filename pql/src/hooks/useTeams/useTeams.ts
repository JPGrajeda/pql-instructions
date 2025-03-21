import { useEffect, useState } from "react";


interface fetchTeams<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

export const useTeams = () => {

    const [state, setState] = useState<fetchTeams<Player[]>>({
        data: [],
        loading: true,
        error: null,
    });

    const url = "http://localhost:3001/api/teams";

    const postTeams = async () => {
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    "name": "Team 1",
                    "slogan": "Slogan 1",
                    "players": [1]
                })
            });
            if (!response.ok) throw new Error("Error en la petición");
            const result: Player[] = await response.json();
            setState((prevState) => ({
                ...prevState,
                data: result,
                loading: false,
              }));
        } catch (err) {
            setState((prevState) => ({
                ...prevState,
                error: (err as Error).message,
                loading: false,
              }));
        } finally {
            setState((prevState) => ({
                ...prevState,
                loading: false,
              }));
        }
    }


    return {
        state
    };
}