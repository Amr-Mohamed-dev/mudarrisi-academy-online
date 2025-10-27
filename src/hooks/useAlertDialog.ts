import { useState } from 'react';
import { nanoid } from 'nanoid';

export interface AlertButton {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface AlertDialogProps {
  id: string;
  title?: string;
  message: string;
  buttons: AlertButton[];
}

export const useAlertDialog = () => {
  const [alerts, setAlerts] = useState<AlertDialogProps[]>([]);

  const showAlert = (
    message: string,
    buttons: AlertButton[],
    title?: string
  ) => {
    const id = nanoid();
    const newAlert: AlertDialogProps = {
      id,
      title,
      message,
      buttons,
    };
    
    setAlerts((prev) => [...prev, newAlert]);
    return id;
  };

  const closeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  return {
    alerts,
    showAlert,
    closeAlert,
  };
};
