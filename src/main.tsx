import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeEditor } from "./layouts/ThemeEditor";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemeEditor />
    </ThemeProvider>
  </StrictMode>
);
