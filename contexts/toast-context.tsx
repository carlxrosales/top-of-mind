import { Toast } from "@/components/toast";
import { Animation } from "@/constants/theme";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ToastPosition = "top" | "bottom";

interface DisplayToastOptions {
  message: string;
  duration?: number;
  position?: ToastPosition;
}

interface ToastContextType {
  displayToast: (options: DisplayToastOptions) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [message, setMessage] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(Animation.duration.toast);
  const [position, setPosition] = useState<ToastPosition>("top");

  const displayToast = ({
    message: toastMessage,
    duration: toastDuration = Animation.duration.toast,
    position: toastPosition = "top",
  }: DisplayToastOptions) => {
    setMessage(toastMessage);
    setDuration(toastDuration);
    setPosition(toastPosition);
    setVisible(true);
  };

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  return (
    <ToastContext.Provider
      value={{
        displayToast,
      }}
    >
      {children}
      <Toast
        message={message}
        visible={visible}
        duration={duration}
        position={position}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
