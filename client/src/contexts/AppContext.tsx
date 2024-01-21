import { useState, createContext } from "react";
import { IAppContext, IAppContextProvider } from "../interfaces/IAppContext";
import IToastMessage from "../interfaces/IToastMessage";
import Toast from "../components/Toast";
import * as AuthService from "../services/AuthService";
import { useQuery } from "react-query";

const AppContext = createContext<IAppContext | undefined>(undefined);

export const AppContextProvider = ({ children }: IAppContextProvider) => {
  const [toast, setToast] = useState<IToastMessage | undefined>(undefined);
  const { data: isLoggedIn } = useQuery(
    "validateToken",
    AuthService.ValidateToken,
    {
      retry: false,
      enabled: true, // Disable automatic fetching on mount
    },
  );

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage: IToastMessage) => {
          setToast(toastMessage);
        },
        isLoggedIn: isLoggedIn as boolean,
      }}
    >
      {
        /*
        Initially Toast component does not render as toast state is undefined.
        Forms use react query to invoke showToast function from app context
        Message passed into showToast message is used to set toast state causing a re-render
        Toast component will now render and props are passed to it
        In the Toast component a setTimeout will call the onClose function after 5s
        The onClose function will set the toast state back to undefined
        This change in state causes the Toast component to re-render disappear as toast state is undefined again.
        */
        toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(undefined)}
          />
        )
      }
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
