import { configureStore } from "@reduxjs/toolkit";
import NoteReducer from "../redux/NoteSlice";
import HighlightReducer from "../redux/HighlightSlice";

const store = configureStore({
  reducer: { notes: NoteReducer, Highlight: HighlightReducer },
});

export default store;
