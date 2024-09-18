import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initialState = {
  notes: JSON.parse(localStorage.getItem("notes")) || [],
  activeNote: null,
  selectedNotes: [],
  editorOptions: {
    bold: false,
    italic: false,
    underline: false,
    alignment: "left",
    fontSize: "16px",
  },
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setActiveNote: (state, action) => {
      state.activeNote = action.payload;
    },
    addNote: (state) => {
      const newNote = {
        id: uuid(),
        title: "Untitled Note",
        body: "Add Text",
        lastModified: Date.now(),
        pinned: false,
      };
      state.notes = [newNote, ...state.notes];
      state.activeNote = newNote.id;
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(({ id }) => id !== action.payload);
      if (state.activeNote === action.payload) {
        state.activeNote = null;
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    pinNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload ? { ...note, pinned: !note.pinned } : note
      );
    },
    updateNote: (state, action) => {
      state.notes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },
    toggleNoteSelection: (state, action) => {
      const noteId = action.payload;
      state.selectedNotes = state.selectedNotes.includes(noteId)
        ? state.selectedNotes.filter((id) => id !== noteId)
        : [...state.selectedNotes, noteId];
    },
    bulkDelete: (state, action) => {
      state.notes = state.notes.filter(
        ({ id }) => !state.selectedNotes.includes(id)
      );
      state.selectedNotes = [];
      if (state.activeNote == action.payload) {
        state.activeNote = null;
      }
      localStorage.setItem("notes", JSON.stringify(state.notes));
    },

    changeEditorOption: (state, action) => {
      state.editorOptions = { ...state.editorOptions, ...action.payload };
    },
    setEditorOptions: (state, action) => {
      state.editorOptions = { ...state.editorOptions, ...action.payload };
    },
  },
});

export const {
  setActiveNote,
  addNote,
  deleteNote,
  pinNote,
  updateNote,
  toggleNoteSelection,
  bulkDelete,
  setEditorOptions,
  changeEditorOption,
} = noteSlice.actions;

export default noteSlice.reducer;
