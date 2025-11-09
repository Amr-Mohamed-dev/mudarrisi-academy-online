import React, { useState, useEffect, useRef, useCallback } from "react";
import { ToastProps } from "@/types";
import {
    ErrorIcon,
    WarningIcon,
    SuccessIcon,
    InfoIcon,
} from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/useToast";

const toastTypeConfig = {
    error: {
        icon: <ErrorIcon />,
        bgColor: "bg-red-50 dark:bg-[#470e0e]",
        borderColor: "border-[#ff3232]",
    },
    warning: {
        icon: <WarningIcon />,
        bgColor: "bg-[#fff5e3] dark:bg-[#4d3d21]",
        borderColor: "border-[#ffca6d]",
    },
    success: {
        icon: <SuccessIcon />,
        bgColor: "bg-[#e6f6f2] dark:bg-[#0d4636]",
        borderColor: "border-[#00a878]",
    },
    info: {
        icon: <InfoIcon />,
        bgColor: "bg-[#F5FBFF] dark:bg-[#1a374d]",
        borderColor: "border-[#4EA3E0]",
    },
    alert: {
        icon: <InfoIcon />,
        bgColor: "bg-[#F5FBFF] dark:bg-[#1a374d]",
        borderColor: "border-[#4EA3E0]",
    },
};

export const ToastItem: React.FC<ToastProps & { position?: string }> = ({
    id,
    type = "info",
    title,
    message,
    duration = 5000,
    position: toastPosition,
}) => {
    const { onClose, position: providerPosition } = useToast();
    const position = toastPosition || providerPosition;
    const [isVisible, setIsVisible] = useState(true);
    const config = toastTypeConfig[type];

    // For resizing
    const MIN_WIDTH = 200;
    const [width, setWidth] = useState<number>(320); // Default width
    const toastRef = useRef<HTMLDivElement>(null);
    const resizingRef = useRef(false);
    const startPositionRef = useRef(0);
    const startWidthRef = useRef(0);

    // For truncation
    const [isTruncated, setIsTruncated] = useState(true);
    const messageRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose(id);
        }, 300); // Wait for exit animation to complete
    };

    // Animation variants based on position
    const getAnimationVariants = () => {
        const isTop = position?.startsWith("top");
        const isBottom = position?.startsWith("bottom");

        return {
            initial: {
                opacity: 0,
                y: isTop ? -20 : isBottom ? 20 : 0,
                x: position?.includes("center") ? 0 : 0,
            },
            animate: {
                opacity: 1,
                y: 0,
                x: 0,
            },
            exit: {
                opacity: 0,
                scale: 0.95,
            },
        };
    };

    // Handle resize move
    const handleResizeMove = useCallback(
        (e: MouseEvent) => {
            if (!resizingRef.current) return;

            e.preventDefault();

            const isRightPosition =
                position?.includes("right") || !position?.includes("left");
            const diff = e.clientX - startPositionRef.current;

            // If toast is on the right side, resize in opposite direction
            const newWidth = isRightPosition
                ? Math.max(startWidthRef.current - diff, MIN_WIDTH)
                : Math.max(startWidthRef.current + diff, MIN_WIDTH);

            // Update the toast element width
            if (toastRef.current) {
                toastRef.current.style.width = `${newWidth}px`;
            }

            // Update the state for persistence
            setWidth(newWidth);
        },
        [position]
    );

    // Handle resize end
    const handleResizeEnd = useCallback(() => {
        if (!resizingRef.current) return;

        resizingRef.current = false;

        // Remove event listeners
        document.removeEventListener("mousemove", handleResizeMove, true);
        document.removeEventListener("mouseup", handleResizeEnd, true);

        // Restore text selection
        document.body.style.userSelect = "";
    }, [handleResizeMove]);

    // Handle resize start
    const handleResizeStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // Get the current width of the toast
        if (!toastRef.current) return;

        const currentWidth = toastRef.current.getBoundingClientRect().width;

        resizingRef.current = true;
        startPositionRef.current = e.clientX;
        startWidthRef.current = currentWidth;

        // Prevent text selection during resize
        document.body.style.userSelect = "none";

        // Add event listeners with capture phase
        document.addEventListener("mousemove", handleResizeMove, true);
        document.addEventListener("mouseup", handleResizeEnd, true);
    };

    // Toggle message truncation
    const toggleTruncation = () => {
        setIsTruncated(!isTruncated);
    };

    // Clean up event listeners when component unmounts
    useEffect(() => {
        return () => {
            if (resizingRef.current) {
                document.removeEventListener(
                    "mousemove",
                    handleResizeMove,
                    true
                );
                document.removeEventListener("mouseup", handleResizeEnd, true);
                document.body.style.userSelect = "";
            }
        };
    }, [handleResizeMove, handleResizeEnd]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    ref={toastRef}
                    initial={getAnimationVariants().initial}
                    animate={getAnimationVariants().animate}
                    exit={getAnimationVariants().exit}
                    transition={{ duration: 0.2 }}
                    style={{ width: `${width}px` }}
                    className={`${config.bgColor} relative ${
                        message ? "py-3" : "py-1"
                    } pl-3 pr-10 rounded-3xl shadow-md overflow-hidden flex justify-start items-center gap-2 w-full border ${
                        config.borderColor
                    } cursor-default`}
                    role="alert"
                    aria-live="assertive"
                >
                    {/* Resize handle - left side */}
                    {position?.includes("right") && (
                        <div
                            className="absolute left-0 top-0 w-1.5 h-full cursor-ew-resize hover:bg-gray-200 hover:bg-opacity-30"
                            onMouseDown={handleResizeStart}
                        />
                    )}

                    {/* Resize handle - right side */}
                    {(!position?.includes("right") ||
                        position?.includes("left")) && (
                        <div
                            className="absolute right-0 top-0 w-1.5 h-full cursor-ew-resize hover:bg-gray-200 hover:bg-opacity-30"
                            onMouseDown={handleResizeStart}
                        />
                    )}

                    {/* Icon */}
                    <div className="flex-shrink-0 flex items-center justify-center">
                        <div className={`rounded-full text-white`}>
                            {config.icon}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-grow min-w-0">
                        {title && (
                            <h3
                                className={`${
                                    message ? "text-[16px]" : "text-sm"
                                } font-bold text-right text-black-500 dark:text-secondary-500 truncate`}
                            >
                                {title}
                            </h3>
                        )}
                        {message && (
                            <div>
                                <p
                                    ref={messageRef}
                                    className={`text-sm text-right text-black-200 dark:text-secondary-500 ${
                                        isTruncated ? "line-clamp-2" : ""
                                    }`}
                                    onClick={toggleTruncation}
                                >
                                    {message}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={handleClose}
                        className="absolute top-3 right-3 text-black hover:text-gray-600 dark:text-secondary-500 focus:outline-none"
                        aria-label="Close notification"
                    >
                        <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
