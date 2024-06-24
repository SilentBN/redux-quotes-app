import "./styles/reset.css";
import "./styles/styles.css";
import React from "react";
import { createRoot } from "react-dom/client";
// This imports the createRoot function from React DOM, which is used for rendering React applications in the browser.
import { Provider } from "react-redux";
// This imports the Provider component from React Redux. The Provider is a crucial part of connecting Redux to React.
import store from "./state/store";
// This imports the Redux store we created in store.js.
import App from "./components/App";
// This imports our main App component.

const domNode = document.getElementById("root");
const root = createRoot(domNode);
// This creates a React root using the DOM node.

// ✨ wrap <App /> with a provider that uses the store as a prop
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// This is where we render our React application.
// The Provider component is wrapped around our entire App.
// We pass our Redux store as a prop to the Provider.
// This setup allows any component in our App to access the Redux store.

// The Provider component is key here. It uses React's context feature to make the Redux store available to any nested components that need to access Redux state or dispatch actions.
// By wrapping our entire App in the Provider, we ensure that all components in our application can interact with the Redux store if they need to. This doesn't mean every component will use Redux, but it means any component can use Redux if we set it up to do so.
// This setup in index.js is the bridge between the Redux store we created and our React components. It allows our React components to "talk" to Redux, both reading state from the store and dispatching actions to update that state.
