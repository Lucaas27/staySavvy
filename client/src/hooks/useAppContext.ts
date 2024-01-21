import { useContext } from "react";
import { IAppContext } from "../interfaces/IAppContext";
import AppContext from "../contexts/AppContext";

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context as IAppContext;
};
