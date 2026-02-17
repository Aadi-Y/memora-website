import React from "react";
import "./ShapePreview.css";

/**
 * Read-only preview of shape diagram data.
 * Receives `data` as a JSON string (array of shape objects).
 * Renders shapes as CSS elements (no canvas needed).
 */
function ShapePreview({ data, maxHeight }) {
  let shapes = [];
  try {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) shapes = parsed;
  } catch {
    return null;
  }

  if (shapes.length === 0) return null;

  /* compute bounding box to auto-scale */
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  shapes.forEach((s) => {
    minX = Math.min(minX, s.x);
    minY = Math.min(minY, s.y);
    maxX = Math.max(maxX, s.x + s.w);
    maxY = Math.max(maxY, s.y + s.h);
  });

  const contentW = maxX - minX + 30;
  const contentH = maxY - minY + 30;
  const containerH = maxHeight || 260;
  const scale = Math.min(1, containerH / contentH, 300 / contentW);

  return (
    <div
      className="sp"
      style={{
        width: contentW * scale,
        height: contentH * scale,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {shapes.map((s) => {
        const left = (s.x - minX + 15) * scale;
        const top = (s.y - minY + 15) * scale;
        const w = s.w * scale;
        const h = s.h * scale;
        const fontSize = Math.max(8, 12 * scale);

        let className = "sp__shape";
        if (s.type === "circle") className += " sp__shape--circle";
        if (s.type === "roundRect") className += " sp__shape--round";
        if (s.type === "diamond") className += " sp__shape--diamond";

        return (
          <div
            key={s.id}
            className={className}
            style={{
              left,
              top,
              width: w,
              height: h,
              borderColor: s.color || "#43a047",
              fontSize,
            }}
          >
            {s.type === "diamond" ? (
              <div
                className="sp__diamond-inner"
                style={{ borderColor: s.color || "#43a047" }}
              >
                <span className="sp__text">{s.text}</span>
              </div>
            ) : (
              <span className="sp__text">{s.text}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ShapePreview;
