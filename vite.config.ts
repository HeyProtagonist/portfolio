import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // React Compiler is experimental in React 19
      // To enable: uncomment the line below (not recommended for production yet)
      // jsxImportSource: "@emotion/react",
    }),
    tailwindcss(),
  ],
});

