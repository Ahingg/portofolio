import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Self-hosted, so there is no render-blocking request to a font CDN.
// Variable faces: one file each instead of a file per weight.
// `full` carries the opsz/SOFT/WONK axes the display treatment uses.
import "@fontsource-variable/fraunces/full.css";
import "@fontsource-variable/instrument-sans";
import "@fontsource-variable/azeret-mono";

import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
