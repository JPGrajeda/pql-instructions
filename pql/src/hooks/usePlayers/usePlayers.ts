import { useEffect, useState } from "react";
import { useAppContext } from "../useAppContext/useAppContext";


interface fetchPlayers<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

export const usePlayers = () => {

    const [state, setState] = useState<fetchPlayers<Player[]>>({
        data: [],
        loading: true,
        error: null,
    });

    const { setPlayers } = useAppContext();

    const url = "http://localhost:3001/api";

    const getPlayers = async () => {
        try {
            const response = await fetch(`${url}/players/available`);
            if (!response.ok) throw new Error("Error en la petición");
            const result: Player[] = await response.json();
            setState((prevState) => ({
                ...prevState,
                data: result,
                loading: false,
              }));
              setPlayers(result);
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

    // const deletePlayer = async => {

    // }

    useEffect(() => {
        getPlayers();
    }, [url])


    return {
        state
    };
}