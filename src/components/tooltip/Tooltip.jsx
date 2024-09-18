import React from "react";

const Tooltip = ({ tooltip, mousePosition }) => {
  if (!tooltip) return null;

  return (
    <div
      className="tooltip"
      style={{
        top: mousePosition.top,
        left: mousePosition.left,
      }}
    >
      <strong>{tooltip.term}</strong>: {tooltip.definition}
    </div>
  );
};

export default Tooltip;
