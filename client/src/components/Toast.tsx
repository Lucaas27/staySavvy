import { useEffect } from "react";
import IToastMessage from "../interfaces/IToastMessage";

const Toast = ({ message, type, onClose }: IToastMessage) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose!();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed bottom-4 left-4 z-50 p-4 rounded-md bg-green-600 max-w-md text-white"
      : "fixed bottom-4 left-4 z-50 p-4 rounded-md bg-red-600 max-w-md text-white";
  return (
    <div className={styles} data-testid="toast-component">
      <div className="flex items-center justify-center">
        <span
          className="text-lg font-semibold"
          data-testid="toast-component-message"
        >
          {message}
        </span>
      </div>
    </div>
  );
};

export default Toast;
