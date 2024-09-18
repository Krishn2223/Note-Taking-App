import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeEditorOption } from "../../redux/NoteSlice";
import "../../css/Toolbar.css";

const Toolbar = () => {
  const dispatch = useDispatch();
  const { editorOptions } = useSelector((state) => state.notes);

  const handleFormattingChange = (format) => {
    dispatch(changeEditorOption({ [format]: !editorOptions[format] }));
  };

  const handleAlignmentChange = (alignment) => {
    dispatch(changeEditorOption({ alignment }));
  };

  const handleFontSizeChange = (size) => {
    dispatch(changeEditorOption({ fontSize: size }));
  };

  const handleColorChange = (color) => {
    dispatch(changeEditorOption({ color }));
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar-btn bold"
        onClick={() => handleFormattingChange("bold")}
      >
        Bold
      </button>
      <button
        className="toolbar-btn"
        onClick={() => handleFormattingChange("italic")}
      >
        𝘐𝘵𝘢𝘭𝘪𝘤
      </button>
      <button
        className="toolbar-btn"
        onClick={() => handleFormattingChange("underline")}
      >
        U͟n͟d͟e͟r͟l͟i͟n͟e͟
      </button>
      <button
        className="toolbar-btn"
        onClick={() => handleAlignmentChange("left")}
      >
        Align Left
      </button>
      <button
        className="toolbar-btn"
        onClick={() => handleAlignmentChange("center")}
      >
        Align Center
      </button>
      <button
        className="toolbar-btn"
        onClick={() => handleAlignmentChange("right")}
      >
        Align Right
      </button>
      <select
        className="toolbar-btn"
        onChange={(e) => handleFontSizeChange(e.target.value)}
        value={editorOptions.fontSize}
      >
        <option value="12px">12px</option>
        <option value="14px">14px</option>
        <option value="16px">16px</option>
        <option value="18px">18px</option>
        <option value="20px">20px</option>
        <option value="22px">22px</option>
        <option value="24px">24px</option>
      </select>
      <input
        type="color"
        className="toolbar-btn color-picker"
        onChange={(e) => handleColorChange(e.target.value)}
        value={editorOptions.color}
      />
    </div>
  );
};

export default Toolbar;
