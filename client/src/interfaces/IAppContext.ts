import IToastMessage from "./IToastMessage";

export interface IAppContext {
  isLoggedIn: boolean;
  showToast: (toastMessage: IToastMessage) => void;
}

export interface IAppContextProvider {
  children: React.ReactNode;
}
