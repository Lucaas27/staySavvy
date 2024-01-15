import IToastMessage from "./IToastMessage";

export interface IAppContext {
  showToast: (toastMessage: IToastMessage) => void;
}

export interface IAppContextProvider {
  children: React.ReactNode;
}
