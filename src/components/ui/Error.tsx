interface ErrorProps {
    message: string;
}

// Accept either a string or an ErrorProps object
function Error(props: ErrorProps | string) {
    // If props is a string, convert it to an object
    const message = typeof props === 'string' ? props : props.message;
    return <div className="text-red-500">{message}</div>;
}

export default Error;
