import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleVisibility,
  deleteQuote,
  setHighlightedQuote,
  editQuoteAuthenticity,
} from "../state/quotesSlice";

export default function Quotes() {
  const dispatch = useDispatch();
  const quotes = useSelector((state) => state.quotes.quotes);
  const displayAllQuotes = useSelector(
    (state) => state.quotes.displayAllQuotes
  );
  const highlightedQuote = useSelector(
    (state) => state.quotes.highlightedQuote
  );

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
                <button
                  onClick={() =>
                    /* ✨ dispatch an action */
                    dispatch(setHighlightedQuote(qt.id))
                  }
                >
                  HIGHLIGHT
                </button>
                <button
                  onClick={() =>
                    /* ✨ dispatch an action */
                    dispatch(editQuoteAuthenticity(qt.id))
                  }
                >
                  FAKE
                </button>
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
    </div>
  );
}
