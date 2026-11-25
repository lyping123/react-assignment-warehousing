import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import {Head} from "./Head.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
      <Head title="My product" />
  </StrictMode>
);