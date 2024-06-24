import React, { useReducer } from "react"; // We import useReducer from React to manage local state in our component.
import { useDispatch } from "react-redux"; // ✨ We import useDispatch from React Redux to dispatch actions to the Redux store.
import { createQuote } from "../state/quotesSlice"; // We import the createQuote action creator from our quotesSlice.

const CHANGE_INPUT = "CHANGE_INPUT";
const RESET_FORM = "RESET_FORM";

const initialState = {
  authorName: "",
  quoteText: "",
};

// We define action types, initial state, and a reducer for managing the form's local state.

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    }
    case RESET_FORM:
      return { authorName: "", quoteText: "" };
    default:
      return state;
  }
};

export default function TodoForm() {
  const [state, dispatch] = useReducer(reducer, initialState); // We use useReducer to manage the form's local state.
  const dispatchRedux = useDispatch(); // We use useDispatch to get the Redux dispatch function.

  const onChange = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } });
  };
  const resetForm = () => {
    dispatch({ type: RESET_FORM });
  };
  const onNewQuote = (evt) => {
    evt.preventDefault();
    // ✨ dispatch creation of a new quote here, using the values from the form
    dispatchRedux(
      createQuote({
        authorName: state.authorName,
        quoteText: state.quoteText,
      })
    );
    resetForm();
  };

  // When the form is submitted, we dispatch the createQuote action to Redux with the form data. We then reset the form using the local state.

  return (
    <form id="quoteForm" onSubmit={onNewQuote}>
      <h3>New Quote Form</h3>
      <label>
        <span>Author:</span>
        <input
          type="text"
          name="authorName"
          placeholder="type author name"
          onChange={onChange}
          value={state.authorName}
        />
      </label>
      <label>
        <span>Quote text:</span>
        <textarea
          type="text"
          name="quoteText"
          placeholder="type quote"
          onChange={onChange}
          value={state.quoteText}
        />
      </label>
      <label>
        <span>Create quote:</span>
        <button
          role="submit"
          disabled={!state.authorName.trim() || !state.quoteText.trim()}
        >
          DO IT!
        </button>
      </label>
    </form>
  );
}

// This component demonstrates an interesting mix of local state management (for the form fields) and Redux state management (for creating a new quote).

// Local state (managed by useReducer) is used for the form inputs because this data doesn't need to be shared with other components and doesn't need to persist beyond the form submission.
// Redux is used to actually create the new quote because this action affects the global state of the application (the list of all quotes).

// This pattern - using local state for transient UI state and Redux for global application state - is common in React-Redux applications. It allows us to keep our Redux store focused on essential application data while still having the flexibility of local state where appropriate.
