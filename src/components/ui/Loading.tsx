function Loading({ message }: { message?: string }) {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />

                {message && (
                    <p className="text-gray-500">
                        {message || "Loading data..."}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Loading;
