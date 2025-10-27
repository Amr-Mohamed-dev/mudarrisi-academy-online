import { ToastItem } from "./ToastItem";
import { ToastPosition } from "@/types";
import { useToast } from "@/hooks/useToast";
import AlertToast from "./AlertToast";

// Position class mapping
const positionClasses: Record<ToastPosition, string> = {
    "top-right": "fixed top-4 right-4 flex flex-col gap-4 z-50",
    "top-left": "fixed top-4 left-4 flex flex-col gap-4 z-50",
    "bottom-right": "fixed bottom-4 right-4 flex flex-col gap-4 z-50",
    "bottom-left": "fixed bottom-4 left-4 flex flex-col gap-4 z-50",
    "top-center":
        "fixed top-4 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50",
    "bottom-center":
        "fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50",
    center: "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4 z-50",
};

const ToastsList = () => {
    const { toasts, position, spacing, removeToast } = useToast();

    // Group toasts by position
    const toastsByPosition: Record<ToastPosition, typeof toasts> = {
        "top-right": [],
        "top-left": [],
        "bottom-right": [],
        "bottom-left": [],
        "top-center": [],
        "bottom-center": [],
        center: [],
    };

    // Sort toasts into position groups
    toasts.forEach((toast: any) => {
        const toastPosition = toast.position || position;
        if (toastPosition) {
            (toastsByPosition[toastPosition as keyof typeof toastsByPosition] as any[]).push(toast);
        }
    });

    return (
        <>
            {Object.entries(toastsByPosition).map(([pos, positionToasts]) => {
                if (positionToasts.length === 0) return null;

                return (
                    <div
                        key={pos}
                        className={positionClasses[pos as ToastPosition]}
                        style={{ gap: `${spacing * 0.25}rem` }}
                    >
                        {positionToasts.map((toast: any) => {
                            // Handle alert toasts with buttons separately
                            if (
                                toast.type === "alert" &&
                                toast.buttons &&
                                toast.buttons.length > 0
                            ) {
                                return (
                                    <div key={toast.id} className="my-2">
                                        <AlertToast
                                            id={toast.id || ""}
                                            title={toast.title || ""}
                                            message={toast.message || ""}
                                            onClose={() => {
                                                if (toast.id) {
                                                    removeToast(toast.id);
                                                    toast.onCloseToast?.();
                                                }
                                            }}
                                            buttons={toast.buttons}
                                        />
                                    </div>
                                );
                            }

                            // Regular toasts
                            return (
                                <div
                                    key={toast.id}
                                    className="pointer-events-auto w-full"
                                >
                                    <ToastItem
                                        id={toast.id}
                                        type={toast.type}
                                        title={toast.title}
                                        message={toast.message}
                                        duration={toast.duration}
                                        position={toast.position}
                                    />
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </>
    );
};

export { ToastsList };
