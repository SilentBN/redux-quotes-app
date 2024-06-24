// ✨ create your `store` in this module
import { configureStore } from "@reduxjs/toolkit";
// We import configureStore from Redux Toolkit. This function sets up a Redux store with some default middleware and configuration that's generally useful for most applications.
import quotesReducer from "./quotesSlice";
// We import the reducer we created in quotesSlice.js. Remember, we exported it as the default export.

const store = configureStore({
  // We create our Redux store using configureStore. This function takes an object as an argument with: Inside the configureStore object, we specify a reducer property. This is where we define the structure of our Redux store.
  reducer: {
    quotes: quotesReducer, // The quotes key means that in our Redux state, there will be a quotes property that is managed by quotesReducer.
    // multiple slices can be added here
  },
});

export default store; // We export the configured store so we can use it in our React application.
