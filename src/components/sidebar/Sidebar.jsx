import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveNote,
  deleteNote,
  pinNote,
  toggleNoteSelection,
  bulkDelete,
  addNote,
} from "../../redux/NoteSlice";
import "../../css/Sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();
  const { notes, activeNote, selectedNotes } = useSelector(
    (state) => state.notes
  );

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.lastModified - a.lastModified;
  });

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <h1 className="heading">Notes</h1>
        <button className="menu" onClick={() => dispatch(addNote())}></button>
        {selectedNotes.length > 0 && (
          <button
            className="bulk-delete"
            onClick={() => dispatch(bulkDelete())}
          >
            Delete Selected
          </button>
        )}
      </div>

      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified, pinned }) => (
          <div
            key={id}
            className={`app-sidebar-note ${id === activeNote ? "active" : ""} ${
              pinned ? "pinned" : ""
            }`}
            onClick={() => dispatch(setActiveNote(id))}
          >
            <input
              type="checkbox"
              checked={selectedNotes.includes(id)}
              onChange={() => dispatch(toggleNoteSelection(id))}
              className="note-checkbox"
            />
            <div className="sidebar-note-title">
              <strong>
                {title.length > 10 ? `${title.slice(0, 15)}...` : title}
              </strong>
              <div className="button-icons">
                <button
                  className="buttons btn-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(pinNote(id));
                  }}
                >
                  {pinned ? "unpin" : "📍"}
                </button>
                <button
                  className="buttons delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteNote(id));
                  }}
                >
                  🚫
                </button>
              </div>
            </div>
            <p>{body.length > 20 ? `${body.slice(0, 30)}...` : body}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
