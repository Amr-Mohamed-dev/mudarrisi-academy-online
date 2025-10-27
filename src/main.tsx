import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import Providers from "./providers/index.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Providers>
                <App />
            </Providers>
        </BrowserRouter>
    </StrictMode>
);
