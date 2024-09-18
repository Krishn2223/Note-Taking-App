//HighlightContext.jsx
import React, { createContext, useState } from "react";
import axios from "axios";

export const HighlightContext = createContext();

const HighlightProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState(null);
  const [hoveredTerm, setHoveredTerm] = useState(null);

  const fetchTermDefinition = async (term) => {
    try {
      const response = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
      );
      const definition =
        response.data[0]?.meanings[0]?.definitions[0]?.definition ||
        "Definition not available";
      setTooltip({ term, definition });
    } catch (error) {
      setTooltip({ term, definition: "Error fetching definition" });
    }
  };

  return (
    <HighlightContext.Provider
      value={{
        fetchTermDefinition,
        tooltip,
        hoveredTerm,
        setHoveredTerm,
        setTooltip,
      }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

export { HighlightProvider };
