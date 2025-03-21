import { useContext } from "react";
import { AppContext, AppContextType } from "../../context/appContext/AppContext";

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  
  if (!context) {
    throw new Error("useAppContext");
  }

  return context;
};
