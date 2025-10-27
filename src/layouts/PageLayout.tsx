import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string;
    showBorder?: boolean;
    noPadding?: boolean;
    noContainer?: boolean;
}

function PageLayout({
    children,
    className,
    showBorder = false,
    noPadding = false,
    noContainer = false,
}: PageLayoutProps) {
    return (
        <div
            className={`page-wrapper ${
                noContainer ? (noPadding ? "p-0" : "px-10") : "container"
            } print:shadow-none print:border-none ${
                showBorder ? "border-wrapper" : ""
            }   ${className} ${noPadding ? "p-0" : "p-5"}`}
        >
            {children}
        </div>
    );
}

export default PageLayout;
