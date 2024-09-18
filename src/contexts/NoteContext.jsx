//NoteContext.jsx
import React, { createContext, useState, useEffect } from "react";
import uuid from "react-uuid";

const NoteContext = createContext();

const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(null);
  const [selectedNotes, setSelectedNotes] = useState([]);

  const [editorOptions, setEditorOptions] = useState({
    bold: false,
    italic: false,
    underline: false,
    alignment: "left",
    fontSize: "16px",
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "Add Text",
      lastModified: Date.now(),
      pinned: false,
    };

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onPinNote = (noteId) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId ? { ...note, pinned: !note.pinned } : note
      )
    );
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const handleFormattingChange = (format) => {
    setEditorOptions((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
  };

  const handleAlignmentChange = (alignment) => {
    setEditorOptions((prev) => ({
      ...prev,
      alignment,
    }));
  };

  const handleFontSizeChange = (size) => {
    setEditorOptions((prev) => ({
      ...prev,
      fontSize: size,
    }));
  };

  const handleColorChange = (color) => {
    setEditorOptions((prevOptions) => ({
      ...prevOptions,
      color: color,
    }));
  };

  const onBulkDelete = () => {
    setNotes(notes.filter(({ id }) => !selectedNotes.includes(id)));
    setSelectedNotes([]);
    setActiveNote(null);
  };

  const toggleNoteSelection = (noteId) => {
    setSelectedNotes((prevSelected) =>
      prevSelected.includes(noteId)
        ? prevSelected.filter((id) => id !== noteId)
        : [...prevSelected, noteId]
    );
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        activeNote,
        editorOptions,
        onAddNote,
        onDeleteNote,
        onPinNote,
        onUpdateNote,
        getActiveNote,
        handleFormattingChange,
        handleAlignmentChange,
        handleFontSizeChange,
        setActiveNote,
        handleColorChange,
        selectedNotes,
        toggleNoteSelection,
        onBulkDelete,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export { NoteProvider, NoteContext };
