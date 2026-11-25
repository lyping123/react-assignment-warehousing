// main.jsx – React entry point
// Renders the App component into the HTML root element.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Bootstrap CSS & JS (for modal/navbar toggling)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// Bootstrap Icons
import "bootstrap-icons/font/bootstrap-icons.css";

// Our app-wide styles
import "./index.css";

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
