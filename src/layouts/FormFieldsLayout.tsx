import { ReactNode } from "react";

interface FormLayoutProps {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    greenTitle?: string;
    className?: string;
    separator?: boolean;
    cols?: string;
}

function FormFieldsLayout({
    children,
    title,
    subtitle,
    greenTitle,
    className,
    separator,
    cols,
}: FormLayoutProps) {
    // Get the appropriate grid columns class based on cols prop
    const getGridColsClass = () => {
        switch (cols) {
            case "1":
                return "lg:grid-cols-1";
            case "2":
                return "lg:grid-cols-2";
            case "3":
                return "lg:grid-cols-3";
            case "4":
                return "lg:grid-cols-4";
            case "5":
                return "lg:grid-cols-5";
            case "6":
                return "lg:grid-cols-6";
            default:
                return "lg:grid-cols-3";
        }
    };

    return (
        <>
            {title && (
                <h1 className="text-xl text-left font-bold px-5 dark:text-secondary-500">
                    {title}
                </h1>
            )}
            {subtitle && (
                <h2 className="text-left font-bold px-5 dark:text-secondary-500">
                    {subtitle}
                </h2>
            )}

            <div className=" flex flex-col gap-2 my-5">
                <h3 className="text-left font-bold px-7 text-primary-500 capitalize">
                    {greenTitle}
                </h3>
                <div
                    className={`grid md:grid-cols-2 ${getGridColsClass()} gap-4 px-3 ${className}`}
                >
                    {children}
                </div>
            </div>

            {separator && (
                <div className="my-20 h-px bg-gray-200 dark:bg-gray-700" />
            )}
        </>
    );
}

export default FormFieldsLayout;
