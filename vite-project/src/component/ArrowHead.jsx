import React from "react";

// Simple SVG arrowhead marker for lines
export default function ArrowHead({ color = "#333" }) {
  return (
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth">
      <polygon points="0 0, 8 4, 0 8" fill={color} />
    </marker>
  );
}
