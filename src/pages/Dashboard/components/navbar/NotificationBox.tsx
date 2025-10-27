import { useRef } from "react";
import { NotificationItem } from "@/types";

interface NotificationBoxProps {
    notifications: NotificationItem[];
}

function NotificationBox({ notifications }: NotificationBoxProps) {
    const notificationRef = useRef<HTMLDivElement>(null);

    return (
        <div
            id="notification-dropdown"
            ref={notificationRef}
            className="w-full max-w-[400px] bg-white dark:bg-black-300 rounded-3xl shadow-md py-5 px-6 fixed top-20 right-10 z-50"
        >
            <div className="flex items-center mb-4">
                <h2 className="text-lg text-black-200 dark:text-secondary-500 font-bold m-0">
                    Notifications
                </h2>
                <div className="bg-primary-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] ml-2">
                    {notifications.length}
                </div>
            </div>

            <div className="absolute top-0 right-0 w-8 h-8 border-t-3 border-r-3 border-primary-500 dark:border-primary-800 rounded-tr-3xl" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-3 border-l-3 border-primary-500 dark:border-primary-800 rounded-bl-3xl" />

            <div className="flex flex-col overflow-y-auto max-h-[400px] custom-scrollbar">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <div
                            key={index}
                            className={`py-4 px-4 ${
                                index < notifications.length - 1
                                    ? "border-b border-black-50 dark:border-gray-800"
                                    : ""
                            }`}
                        >
                            <div className="flex justify-between items-center mb-1">
                                <h3 className="text-xs text-black-500 dark:text-secondary-500 text-left max-w-[200px] truncate font-bold m-0">
                                    {notification.title}
                                </h3>
                                <span className="text-black-200 dark:text-secondary-500 text-[10px] font-normal">
                                    {notification.time}
                                </span>
                            </div>
                            <p className="text-black-200 dark:text-secondary-500 text-xs text-left m-0 pr-16 max-w-lg truncate">
                                {notification.message}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-black-500 dark:text-secondary-500 text-xs text-left m-0 pr-16 max-w-lg truncate">
                        No notifications
                    </div>
                )}
            </div>
        </div>
    );
}

export default NotificationBox;
