import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { LocationProvider } from "./LocationContext.jsx";
import { ReportsProvider } from "./ReportsContext.jsx";
import "./styles.css";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <LocationProvider>
        <ReportsProvider>
          <App />
        </ReportsProvider>
      </LocationProvider>
    </HashRouter>
  </React.StrictMode>
);
