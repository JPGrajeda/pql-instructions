import { useState } from "react";


interface fetchTeams<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useTeams = () => {

    const [state, setState] = useState<fetchTeams<Team>>({
        data: null,
        loading: true,
        error: null,
    });

    const url = "http://localhost:3001/api/teams";

    const postTeams = async (team: Pick<Team, 'name' | 'slogan' |'players'>) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...team
                })
            });
            if (!response.ok) throw new Error("Error en la petición");
            const result: Team = await response.json();
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
        state,
        postTeams
    };
}