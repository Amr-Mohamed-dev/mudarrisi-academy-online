import React from "react";
import Loading from "./Loading";

type ImageWithSpinnerProps = {
    src: string;
    fallbackSrc?: string;
    alt: string;
    isLoading?: boolean;
    className?: string;
    rounded?: boolean;
} & Omit<React.ComponentProps<"img">, "src" | "alt">;

export default function ImgWithSpinner({
    src,
    fallbackSrc,
    alt,
    isLoading,
    className,
    rounded = false,
    ...props
}: ImageWithSpinnerProps) {
    return (
        <div
            className={`relative p-1 overflow-hidden ${
                rounded ? "rounded-full" : ""
            }`}
        >
            {isLoading && (
                <div
                    className={`absolute inset-0 flex items-center justify-center bg-white/80 ${className}`}
                    style={{
                        width: `${props.width}px`,
                        height: `${props.height}px`,
                        borderRadius: "50%",
                    }}
                >
                    <Loading />
                </div>
            )}

            <img
                src={src || fallbackSrc}
                alt={alt}
                className={` ${isLoading ? "opacity-0" : "opacity-100"} ${
                    rounded ? "rounded-full" : ""
                } transition-opacity duration-500 w-full h-full`}
                style={{
                    width: `${props.width}px`,
                    height: `${props.height}px`,
                    borderRadius: "500%",
                }}
                loading="lazy"
                {...props}
            />
        </div>
    );
}
