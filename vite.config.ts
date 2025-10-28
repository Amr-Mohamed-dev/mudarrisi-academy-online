import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());

    const apiTarget = env.VITE_API_BASE_URL;

    console.log(`[VITE] API Target: ${apiTarget}`);

    return {
        plugins: [
            react(),
            mode === 'development' && componentTagger(),
        ].filter(Boolean),
        server: {
            host: "::",
            port: 8080,
            proxy: {
                "/api": {
                    target: apiTarget,
                    changeOrigin: true,
                    secure: false,
                },
            },
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                react: path.resolve("./node_modules/react"),
                "react-dom": path.resolve("./node_modules/react-dom"),
            },
        },
        optimizeDeps: {
            exclude: ["lucide-react"],
        },
    };
});
