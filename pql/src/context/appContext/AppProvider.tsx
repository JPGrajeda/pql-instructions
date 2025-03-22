import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [playersSelected, setPlayersSelected] = useState<number[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <AppContext.Provider value={{ 
        players, 
        setPlayers,
        playersSelected,
        setPlayersSelected,
        teams, 
        setTeams
    }}>
      {children}
    </AppContext.Provider>
  );
};