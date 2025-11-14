import * as React from "react";

import { cn } from "@/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = React.ComponentProps<"input"> & {
    name: Path<T>;
    control: Control<T>;
};

export const Input = <T extends FieldValues>({
    className,
    type,
    name,
    control,
    ...props
}: Props<T>) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <input
                    {...field}
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                        className
                    )}
                    {...props}
                    dir="rtl"
                />
            )}
        />
    );
};
