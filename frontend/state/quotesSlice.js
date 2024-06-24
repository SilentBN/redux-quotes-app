import { createSlice } from "@reduxjs/toolkit";

let id = 4; // Start from 4 since we already have 3 initial quotes
const getNextId = () => id++;

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

const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    deleteQuote: (state, action) => {
      state.quotes = state.quotes.filter(
        (quote) => quote.id !== action.payload
      );
      if (state.highlightedQuote === action.payload) {
        state.highlightedQuote = null;
      }
    },
    editQuoteAuthenticity: (state, action) => {
      const quote = state.quotes.find((quote) => quote.id === action.payload);
      if (quote) {
        quote.apocryphal = !quote.apocryphal;
      }
    },
    setHighlightedQuote: (state, action) => {
      state.highlightedQuote = action.payload;
    },
    createQuote: (state, action) => {
      const newQuote = {
        id: getNextId(),
        quoteText: action.payload.quoteText,
        authorName: action.payload.authorName,
        apocryphal: false,
      };
      state.quotes.push(newQuote);
    },
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
