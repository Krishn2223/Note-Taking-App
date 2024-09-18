import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { tooltip: null, hoveredTerm: null };

export const highlightSlice = createSlice({
  name: "highlight",
  initialState,
  reducers: {
    setTooltip: (state, action) => {
      state.tooltip = action.payload;
    },
    setHoveredTerm: (state, action) => {
      state.hoveredTerm = action.payload;
    },
  },
});

export const fetchTooltip = (term) => async (dispatch) => {
  try {
    console.log("kri");
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
    );
    console.log({ response });
    const definition =
      response.data[0]?.meanings[0]?.definitions[0]?.definition ||
      "Definition not available";
    dispatch(setTooltip({ term, definition }));
  } catch (error) {
    dispatch(setTooltip({ term, definition: "Error fetching definition" }));
  }
};

export const { setTooltip, setHoveredTerm } = highlightSlice.actions;
export default highlightSlice.reducer;
