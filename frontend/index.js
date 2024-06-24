import "./styles/reset.css";
import "./styles/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // ✨ import the Provider
import store from "./state/store"; // ✨ import the store
import App from "./components/App";

const domNode = document.getElementById("root");
const root = createRoot(domNode);

// ✨ wrap <App /> with a provider that uses the store as a prop
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
