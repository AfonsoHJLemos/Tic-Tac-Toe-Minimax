import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.querySelector("#Root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
