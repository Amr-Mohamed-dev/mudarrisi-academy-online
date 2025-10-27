import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";
import { TrashIcon } from "@/components/ui/icons";

interface AlertToastProps {
    id: string;
    title?: string;
    message: string;
    onClose: () => void;
    buttons: {
        text: string;
        onClick?: () => void;
        variant?: "primary" | "secondary" | "danger";
        handlerId?: string;
    }[];
}

const AlertToast: React.FC<AlertToastProps> = ({
    title,
    message,
    onClose,
    buttons,
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const { getButtonHandler } = useToast();

    useEffect(() => {
        // Fade in animation
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = (button: AlertToastProps["buttons"][0]) => {
        if (button.handlerId) {
            const handler = getButtonHandler(button.handlerId);

            if (handler) {
                try {
                    handler();
                } catch (error) {
                    console.error(
                        "AlertToast: Error executing handler:",
                        error
                    );
                }
            } else {
                console.error(
                    `AlertToast: No handler found for ID: ${button.handlerId}`
                );
            }
        } else if (button.onClick) {
            try {
                button.onClick();
            } catch (error) {
                console.error(
                    "AlertToast: Error executing direct onClick:",
                    error
                );
            }
        }

        onClose();
    };

    return (
        <>
            {/* Overlay behind the alert */}
            <div className="h-screen w-screen fixed inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10000] bg-black/50" />

            {/* Alert box above the overlay */}
            <div
                className={`fixed z-[10001] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-lg min-w-80 p-5 bg-white dark:bg-black-300 transition-opacity duration-300 ease-in-out ${
                    isVisible ? "opacity-100" : "opacity-0"
                }`}
            >
                <div className="w-full flex flex-col justify-between items-center space-y-2.5 mb-5">
                    {/* <div className="w-7 h-7 rounded-full flex items-center justify-center mr-3 bg-amber-100">
                        <AlertTriangle size={16} className="text-amber-500" />
                    </div> */}
                    {/* Close Button */}
                    {/* <button
                        title="Close"
                        onClick={onClose}
                        className="p-1 text-gray-500 hover:text-gray-700 self-end"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button> */}

                    <div className="flex-1">
                        {title && (
                            <h4 className="font-bold text-[#0D1821] dark:text-secondary-500 capitalize">
                                {title}
                            </h4>
                        )}

                        {message && (
                            <p className="text-sm text-[#0D1821] dark:text-secondary-500">
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 justify-end">
                    {buttons.map((button, index) => {
                        const buttonVariant = button.variant || "primary";
                        let buttonClasses =
                            "px-3 py-1 text-sm rounded-2xl transition-colors";

                        switch (buttonVariant) {
                            case "primary":
                                buttonClasses +=
                                    " bg-primary-500 text-white hover:bg-primary-600";
                                break;
                            case "secondary":
                                buttonClasses +=
                                    " bg-gray-200 text-gray-800 hover:bg-gray-300";
                                break;
                            case "danger":
                                buttonClasses +=
                                    " flex justify-center items-center gap-2 bg-red-500 text-white hover:bg-red-600";
                                break;
                        }

                        return (
                            <button
                                key={index}
                                className={buttonClasses}
                                onClick={() => handleButtonClick(button)}
                                type="button"
                            >
                                <div>
                                    {buttonVariant === "danger" && (
                                        <TrashIcon width={15} height={15} />
                                    )}
                                </div>

                                <div>{button.text}</div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AlertToast;
