import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateNote } from "../../redux/NoteSlice";
import {
  setHoveredTerm,
  fetchTooltip,
  setTooltip,
} from "../../redux/HighlightSlice";
import Toolbar from "../toolbar/Toolbar";
import Tooltip from "../tooltip/Tooltip";
import keywordExtractor from "keyword-extractor";

const Note = () => {
  const dispatch = useDispatch();
  const activeNote = useSelector((state) => state.note.activeNote);
  const editorOptions = useSelector((state) => state.note.editorOptions);
  const notes = useSelector((state) => state.note.notes);
  const tooltip = useSelector((state) => state.highlight.tooltip);
  const hoveredTerm = useSelector((state) => state.highlight.hoveredTerm);

  const [mousePosition, setMousePosition] = useState({ top: 0, left: 0 });

  const activeNoteData = notes.find(({ id }) => id === activeNote);

  const handleMouseMove = (event) => {
    setMousePosition({
      top: event.clientY + 10,
      left: event.clientX + 10,
    });
  };

  const handleChange = (field, value) => {
    dispatch(
      updateNote({
        ...activeNoteData,
        [field]: value,
        lastModified: Date.now(),
      })
    );
  };

  const extractKeywords = (text) => {
    const extraction = keywordExtractor.extract(text, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });
    return extraction;
  };

  const highlightKeyTerms = (text) => {
    const terms = extractKeywords(text);
    const regex = new RegExp(`\\b(${terms.join("|")})\\b`, "gi");

    return text.split(regex).map((part, index) => {
      if (terms.includes(part)) {
        return (
          <span
            key={index}
            className="highlighted-term"
            onMouseEnter={() => {
              dispatch(setHoveredTerm(part));
              dispatch(fetchTooltip(part));
            }}
            onMouseLeave={() => {
              dispatch(setTooltip(null));
            }}
            style={{ color: "blue", cursor: "pointer" }}
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!activeNoteData)
    return <div className="no-active-note">No Active Note</div>;

  return (
    <>
      <div className="app-main" onMouseMove={handleMouseMove}>
        <Toolbar />
        <div className="app-main-note-edit">
          <input
            value={activeNoteData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            autoFocus
            id="title"
          />
          <div className="note-body">
            <textarea
              className="text-area-1"
              style={{
                fontWeight: editorOptions.bold ? "bold" : "normal",
                fontStyle: editorOptions.italic ? "italic" : "normal",
                textDecoration: editorOptions.underline ? "underline" : "none",
                textAlign: editorOptions.alignment,
                fontSize: editorOptions.fontSize,
                backgroundColor: editorOptions.color,
              }}
              value={activeNoteData.body}
              onChange={(e) => handleChange("body", e.target.value)}
            />
            <div className="app-main-note-preview">
              {highlightKeyTerms(activeNoteData.body)}
            </div>
          </div>
        </div>

        {tooltip && hoveredTerm && (
          <Tooltip tooltip={tooltip} mousePosition={mousePosition} />
        )}
      </div>
    </>
  );
};

export default Note;
