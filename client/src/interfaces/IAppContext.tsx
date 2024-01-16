import IToastMessage from "./IToastMessage";

export interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void;
  isLoggedIn: boolean;
}

export interface IAppContextProvider {
  children: React.ReactNode;
}
