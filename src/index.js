/**
 * Entry point for the Fetch Dog Finder application.
 * Renders the main App component into the DOM.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'focus-visible';

// Get the root DOM element where the app will be rendered
const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

// Render the App component wrapped in React.StrictMode for highlighting potential issues
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
