export default interface IToastMessage {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose?: () => void;
}
