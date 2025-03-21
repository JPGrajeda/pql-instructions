import { createContext } from "react";

export interface AppContextType {
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  playersSelected: number[]
  setPlayersSelected: React.Dispatch<React.SetStateAction<number[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);