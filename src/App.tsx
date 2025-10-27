import { useAuthStateListener } from "./hooks/useAuthStateListener";
import Loading from "./components/ui/Loading";
import AppRoutes from "./routes";

const App = () => {
    const { isLoading } = useAuthStateListener();

    if (isLoading) return <Loading />;

    return (
        <div className="w-full h-full dark:bg-black-500">
            <AppRoutes />
        </div>
    );
};

export default App;
