import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeEditor } from "./layouts/ThemeEditor";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeEditor />
  </StrictMode>
);
