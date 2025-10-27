import React, { createContext, useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Toast, ToastContextValue, ToastProviderProps } from "@/types";
import { ToastsList } from "@/components/ui/toast/ToastsList";

// Store button handlers globally
type ButtonHandlerMap = Record<string, () => void>;
// Use window object to ensure handlers persist across renders
window._buttonHandlers = window._buttonHandlers || {};
const buttonHandlers: ButtonHandlerMap = window._buttonHandlers;

// Create the context
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

// Create the provider component
export const ToastProvider: React.FC<ToastProviderProps> = ({
    children,
    position = "top-right",
    maxToasts = 5,
    spacing = 4,
}) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Add a new toast
    const addToast = useCallback(
        (toast: Omit<Toast, "id">) => {
            const id = uuidv4();
            // Use the toast's position if provided, otherwise fall back to the provider's position
            const toastPosition = toast.position || position;

            setToasts((prevToasts) => {
                // If we have more than maxToasts, remove the oldest ones
                const newToasts = [
                    ...prevToasts,
                    { ...toast, id, position: toastPosition },
                ];
                if (newToasts.length > maxToasts) {
                    return newToasts.slice(newToasts.length - maxToasts);
                }
                return newToasts;
            });
            return id;
        },
        [maxToasts, position]
    );

    // Remove a toast by ID
    const removeToast = useCallback((id: string) => {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        );
    }, []);

    // Remove all toasts
    const removeAllToasts = useCallback(() => {
        setToasts([]);
    }, []);

    // Update a toast by ID
    const updateToast = useCallback(
        (id: string, updatedToast: Partial<Omit<Toast, "id">>) => {
            setToasts((prevToasts) =>
                prevToasts.map((toast) =>
                    toast.id === id ? { ...toast, ...updatedToast } : toast
                )
            );
        },
        []
    );

    // Create a helper function specifically for alert toasts with buttons
    const addAlertToast = (
        title?: string,
        message?: string,
        buttons?: Array<{
            text: string;
            onClick: () => void;
            variant?: "primary" | "secondary" | "danger";
        }>,
        options?: Partial<Omit<Toast, "message" | "buttons" | "type">>
    ) => {
        // Create unique IDs for each button handler
        const buttonsWithHandlers = Array.isArray(buttons)
            ? buttons.map((button) => {
                  const handlerId = uuidv4();
                  // Store the handler function in the global map
                  buttonHandlers[handlerId] = button.onClick;

                  return {
                      text: button.text,
                      handlerId,
                      variant: button.variant,
                  };
              })
            : undefined;

        // Add the alert toast
        return addToast({
            type: "alert",
            title,
            message,
            buttons: buttonsWithHandlers,
            ...options,
        });
    };

    const getButtonHandler = (handlerId: string): (() => void) | undefined => {
        const handler = buttonHandlers[handlerId];
        return handler;
    };

    // Context value
    const contextValue: ToastContextValue = {
        toasts,
        position,
        onClose: removeToast,
        spacing,
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
        addAlertToast,
        getButtonHandler,
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <ToastsList />
        </ToastContext.Provider>
    );
};

export { ToastContext };

declare global {
    interface Window {
        _buttonHandlers: ButtonHandlerMap;
    }
}
