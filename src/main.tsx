import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ThemeEditor } from "./components/ThemeEditor/ThemeEditor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeEditor />
  </StrictMode>
);
