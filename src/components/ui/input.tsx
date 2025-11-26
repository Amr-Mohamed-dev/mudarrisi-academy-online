import * as React from "react";
import { cn } from "@/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues = any> = React.ComponentProps<"input"> & {
  name?: Path<T>;
  control?: Control<T>;
};

export const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, type, name, control, ...props }, ref) => {
    // إذا في control - استخدم Controller
    if (control && name) {
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <input
              {...field}
              ref={ref}
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
    }

    // وإلا - ببساطة input عادي
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
        dir="rtl"
      />
    );
  }
);

Input.displayName = "Input";
