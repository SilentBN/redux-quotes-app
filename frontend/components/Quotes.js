import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleVisibility,
  deleteQuote,
  setHighlightedQuote,
  editQuoteAuthenticity,
} from "../state/quotesSlice";

// We import useSelector and useDispatch hooks from React Redux. These are the primary ways a component interacts with Redux.
// We also import the action creators from our quotesSlice.

export default function Quotes() {
  const dispatch = useDispatch(); // This hook gives us a reference to the Redux store's dispatch function. We use this to send actions to the store.
  // Using useSelector:
  const quotes = useSelector((state) => state.quotes.quotes);
  const displayAllQuotes = useSelector(
    (state) => state.quotes.displayAllQuotes
  );
  const highlightedQuote = useSelector(
    (state) => state.quotes.highlightedQuote
  );
  // useSelector allows us to extract data from the Redux store state.
  // Each call to useSelector returns a specific piece of the state.

  return (
    <div id="quotes">
      <h3>Quotes</h3>
      <div>
        {quotes
          ?.filter((qt) => {
            return displayAllQuotes || !qt.apocryphal;
          })
          .map((qt) => (
            <div
              key={qt.id}
              className={`quote${qt.apocryphal ? " fake" : ""}${
                highlightedQuote === qt.id ? " highlight" : ""
              }`}
            >
              {/* We filter the quotes based on displayAllQuotes state.
                Then we map over the filtered quotes to render each one. */}
              <div>{qt.quoteText}</div>
              <div>{qt.authorName}</div>
              <div className="quote-buttons">
                <button
                  onClick={() =>
                    /* ✨ dispatch an action */
                    dispatch(deleteQuote(qt.id))
                  }
                >
                  DELETE
                </button>
                {/* dispatch(deleteQuote(qt.id)) sends an action to delete a specific quote. */}
                <button
                  onClick={() =>
                    /* ✨ dispatch an action */
                    dispatch(setHighlightedQuote(qt.id))
                  }
                >
                  HIGHLIGHT
                </button>
                {/* dispatch(setHighlightedQuote(qt.id)) highlights a quote. */}
                <button
                  onClick={() =>
                    /* ✨ dispatch an action */
                    dispatch(editQuoteAuthenticity(qt.id))
                  }
                >
                  FAKE
                </button>
                {/* dispatch(editQuoteAuthenticity(qt.id)) toggles whether a quote is considered apocryphal. */}
              </div>
            </div>
          ))}
        {!quotes?.length && "No quotes here! Go write some."}
      </div>
      {!!quotes?.length && (
        <button
          onClick={() =>
            /* ✨ dispatch an action */
            dispatch(toggleVisibility())
          }
        >
          {displayAllQuotes ? "HIDE" : "SHOW"} FAKE QUOTES
        </button>
      )}
      {/* This button dispatches the toggleVisibility action to show/hide apocryphal quotes. */}
    </div>
  );
}

// This component demonstrates how to read state from Redux (using useSelector) and how to update state (using dispatch). The component doesn't manage any state itself; it relies entirely on Redux for its data and actions.
// By using Redux in this way, we've separated our state management from our UI components. This can make our application easier to understand and maintain, especially as it grows in complexity.
