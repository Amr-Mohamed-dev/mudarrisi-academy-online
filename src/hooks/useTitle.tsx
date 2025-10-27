import React from "react";

export const useTitle = (title?: string) => {
    const documentDefined = typeof document !== "undefined";
    const originalTitle = React.useRef(documentDefined ? document.title : null);

    React.useEffect(() => {
        if (!documentDefined) return;
        if (document.title !== title)
            document.title = title
                ? "CompareThePro | " +
                  title
                      .replace(/-/g, " ")
                      .split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")
                : "CompareThePro";
        return () => {
            document.title = originalTitle.current!;
        };
    }, [title]);
};
