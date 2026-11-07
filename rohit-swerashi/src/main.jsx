import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { startSmoothPage } from "./lib/fx";
import "./styles/base.css";
import "./styles/site.css";
import "./styles/work.css";
import "./styles/theme.css";

startSmoothPage();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
document.documentElement.classList.remove("js-wait");
