import { ReactNode } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";

interface FormLayoutProps {
    children: ReactNode;
    className?: string;
    formClassName?: string;
    handleFormSubmit: (formData: any) => Promise<void>;
    handleSubmit: (
        onValid: SubmitHandler<any>,
        onInvalid?: SubmitErrorHandler<any> | undefined
    ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    removeBorder?: boolean;
    noPadding?: boolean;
}

function FormLayout({
    children,
    className,
    formClassName,
    handleSubmit,
    handleFormSubmit,
    removeBorder = false,
    noPadding = false,
}: FormLayoutProps) {
    return (
        <div
            className={`rounded-3xl ${!removeBorder ? "border-wrapper" : ""} ${
                !noPadding ? "py-5" : ""
            } ${className}`}
        >
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className={formClassName}
            >
                {children}
            </form>
        </div>
    );
}

export default FormLayout;
