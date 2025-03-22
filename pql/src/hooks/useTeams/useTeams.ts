import { useEffect, useState } from "react";
import { useAppContext } from "../useAppContext/useAppContext";


interface fetchTeams<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

export const useTeams = () => {

    const [state, setState] = useState<fetchTeams<Team[]>>({
        data: null,
        loading: true,
        error: null,
    });

    const { setTeams } = useAppContext();

    const url = "http://localhost:3001/api";

    const getTeams = async () => {
        try {
            const response = await fetch(`${url}/teams`);
            if (!response.ok) throw new Error("Error en la petición");
            const result: Team[] = await response.json();
            setState((prevState) => ({
                ...prevState,
                data: result,
                loading: false,
            }));
            setTeams(result);
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

    const postTeam = async (team: Pick<Team, 'name' | 'slogan' | 'players'>) => {
        try {
            const response = await fetch(`${url}/teams`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...team
                })
            });
            if (!response.ok) throw new Error("Error en la petición");
            const result: { team_id: number, message: string } = await response.json();
            setState((prevState) => ({
                ...prevState,
                data: prevState.data ? prevState.data.filter(team => team.id !== result.team_id) : [],
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

    useEffect(() => {
        getTeams();
    }, [url])

    return {
        state,
        postTeam,
        getTeams
    };
}