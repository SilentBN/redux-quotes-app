import { createSlice } from "@reduxjs/toolkit";
// We import createSlice from Redux Toolkit. This function helps us create a slice of Redux state along with its actions and reducers.

let id = 4; // Start from 4 since we already have 3 initial quotes
const getNextId = () => id++;

// We set up a simple ID generator. This is outside the Redux state because we don't need React to re-render when this changes.

const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: 1,
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: 2,
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: 3,
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

// We define our initial state. This is what our Redux store will look like when the app starts. It includes:
// displayAllQuotes: A boolean to toggle between showing all quotes or only non-apocryphal ones
// highlightedQuote: The ID of the currently highlighted quote (if any).
// quotes: An array of quote objects.

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  // We create our slice using createSlice. This function takes an object with:
  // name: A string name for this slice of state.
  // initialState: The initial state we defined earlier.
  //reducers: An object where each key is an action name, and each value is a reducer function.
  reducers: {
    toggleVisibility: (state) => {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    // toggleVisibility: This reducer toggles the displayAllQuotes boolean. With Redux Toolkit, we can mutate the state directly thanks to Immer library working behind the scenes.
    deleteQuote: (state, action) => {
      state.quotes = state.quotes.filter(
        (quote) => quote.id !== action.payload
      );
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
      }
    },
    // deleteQuote: This reducer removes a quote from the array based on the ID passed in action.payload. It also clears the highlighted quote if the deleted quote was highlighted.
    editQuoteAuthenticity: (state, action) => {
      const quote = state.quotes.find((quote) => quote.id === action.payload);
      if (quote) {
        quote.apocryphal = !quote.apocryphal;
      }
    },
    // editQuoteAuthenticity: This reducer toggles the apocryphal property of a quote based on the ID passed in action.payload.
    setHighlightedQuote: (state, action) => {
      state.highlightedQuote = action.payload;
    },
    // setHighlightedQuote: This reducer sets the highlightedQuote to the ID passed in action.payload.
    createQuote: (state, action) => {
      const newQuote = {
        id: getNextId(),
        quoteText: action.payload.quoteText,
        authorName: action.payload.authorName,
        apocryphal: false,
      };
      state.quotes.push(newQuote);
    },
    // createQuote: This reducer creates a new quote object and adds it to the quotes array. The quote details are passed in action.payload.
  },
});

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote,
} = quotesSlice.actions;

export default quotesSlice.reducer;

// We export the action creators and the reducer. Redux Toolkit automatically creates action creators with the same names as our reducers.
