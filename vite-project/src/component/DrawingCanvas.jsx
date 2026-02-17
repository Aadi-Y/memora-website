import { useState, useEffect, useRef, useCallback } from "react";
import "./DrawingCanvas.css";
import { FiTrash2, FiSquare, FiCircle, FiType } from "react-icons/fi";
import { MdOutlineDiamond } from "react-icons/md";
import { RxCornerBottomRight } from "react-icons/rx";

/* ── helpers ── */
let nextId = 1;

function newShape(type, x, y, color) {
  const base = { id: nextId++, x, y, color, text: "" };
  switch (type) {
    case "rect":
      return { ...base, type: "rect", w: 140, h: 70 };
    case "roundRect":
      return { ...base, type: "roundRect", w: 140, h: 70 };
    case "circle":
      return { ...base, type: "circle", w: 100, h: 100 };
    case "diamond":
      return { ...base, type: "diamond", w: 120, h: 80 };
    default:
      return { ...base, type: "rect", w: 140, h: 70 };
  }
}

// Removed newArrow function as it is no longer needed

/* ── component ── */

  const [shapes, setShapes] = useState([]);
  const [arrows, setArrows] = useState([]); // {id, from, to, color}
  const [selectedId, setSelectedId] = useState(null);
  const [color, setColor] = useState("#43a047");
  const [addMode, setAddMode] = useState(null); // null | "rect" | "circle" | "diamond" | "roundRect" | "arrow"
  const [arrowFrom, setArrowFrom] = useState(null); // shape id
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const boardRef = useRef(null);

  const colors = [
    { value: "#43a047", label: "Green" },
    { value: "#1565c0", label: "Blue" },
    { value: "#d32f2f", label: "Red" },
    { value: "#f57f17", label: "Amber" },
    { value: "#6a1b9a", label: "Purple" },
    { value: "#212121", label: "Black" },
    { value: "#00838f", label: "Teal" },
  ];

  // Load initial data (now supports {shapes, arrows} or array fallback)
  useEffect(() => {
    if (initialData) {
      try {
        const parsed = JSON.parse(initialData);
        if (Array.isArray(parsed)) {
          setShapes(parsed);
          setArrows([]);
          const maxId = parsed.reduce((m, s) => Math.max(m, s.id || 0), 0);
          nextId = maxId + 1;
        } else if (parsed && parsed.shapes && parsed.arrows) {
          setShapes(parsed.shapes);
          setArrows(parsed.arrows);
          const maxId = parsed.shapes.reduce((m, s) => Math.max(m, s.id || 0), 0);
          nextId = maxId + 1;
          const maxArrowId = parsed.arrows.reduce((m, a) => Math.max(m, parseInt((a.id||'a0').slice(1)) || 0), 0);
          nextArrowId = maxArrowId + 1;
        }
      } catch {
        // not valid JSON, ignore
      }
    }
  }, []);

  // Emit changes
  const emitChange = useCallback(
    (updated) => {
      onChange?.(JSON.stringify(updated));
    },
    [onChange]
  );

  function updateShapes(updater) {
    setShapes((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      emitChange(next);
      return next;
    });
  }

  /* ── Board click: add shape ── */
  function handleBoardClick(e) {
    if (!addMode) {
      // deselect if clicking empty space
      if (e.target === boardRef.current) {
        setSelectedId(null);
        setEditingId(null);
      }
      return;
    }
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const shape = newShape(addMode, x - 60, y - 30, color);
    updateShapes((prev) => [...prev, shape]);
    setSelectedId(shape.id);
    setAddMode(null);
  }

  /* ── Drag ── */
  function startDrag(e, id) {
    e.stopPropagation();
    if (editingId === id) return;
    setSelectedId(id);
    const rect = boardRef.current.getBoundingClientRect();
    const shape = shapes.find((s) => s.id === id);
    setDragging({
      id,
      offsetX: e.clientX - rect.left - shape.x,
      offsetY: e.clientY - rect.top - shape.y,
    });

  function onMouseMove(e) {
      const rect = boardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - dragging.offsetX;
      const y = e.clientY - rect.top - dragging.offsetY;
      updateShapes((prev) =>
        prev.map((s) => (s.id === dragging.id ? { ...s, x, y } : s))
      );
    }
    if (resizing) {
      const rect = boardRef.current.getBoundingClientRect();
      const shape = shapes.find((s) => s.id === resizing.id);
      if (!shape) return;
      const w = Math.max(60, e.clientX - rect.left - shape.x);
      updateShapes((prev) =>
        prev.map((s) => (s.id === resizing.id ? { ...s, w, h } : s))
      );
    }

  function onMouseUp() {
    setDragging(null);
    setResizing(null);
  }

  /* ── Resize ── */
  function startResize(e, id) {
    e.stopPropagation();
    setResizing({ id });
  }

  /* ── Text editing ── */
  function handleDoubleClick(e, id) {
    e.stopPropagation();
    setEditingId(id);
    setSelectedId(id);
  }

  function handleTextChange(id, value) {
    updateShapes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, text: value } : s))
    );
  }

  function handleTextBlur() {
    setEditingId(null);
  }

  function handleTextKeyDown(e) {
    if (e.key === "Escape") {
      setEditingId(null);
    }
    // allow Enter for new lines (no special handling needed for textarea)
  }

  /* ── Delete ── */
  function deleteShape(id) {
    updateShapes((prev) => prev.filter((s) => s.id !== id));
    setSelectedId(null);
    setEditingId(null);
  }

  /* ── Change shape color ── */
  function changeShapeColor(id, newColor) {
    updateShapes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, color: newColor } : s))
    );
  }

  /* ── Clear all ── */
  function clearAll() {
    updateShapes([]);
    setSelectedId(null);
    setEditingId(null);
  }

  /* ── Keyboard delete ── */
  useEffect(() => {
    function handleKey(e) {
      if (editingId) return; // don't delete while typing
      if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
        deleteShape(selectedId);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedId, editingId]);

  /* ── Render a shape ── */
  function renderShape(shape) {
    const isSelected = shape.id === selectedId;
    const isEditing = shape.id === editingId;
    const shapeStyle = {
      left: shape.x,
      top: shape.y,
      width: shape.w,
      height: shape.h,
      borderColor: shape.color,
      zIndex: isSelected ? 10 : 1,
    };

    let className = `sc sc--${shape.type}`;
    if (isSelected) className += " sc--selected";

    return (
      <div
        key={shape.id}
        className={className}
        style={shapeStyle}
        onMouseDown={(e) => startDrag(e, shape.id)}
        onDoubleClick={(e) => handleDoubleClick(e, shape.id)}
        onClick={(e) => {
          e.stopPropagation();
          if (!addMode) setSelectedId(shape.id);
        }}
      >
        {/* SVG background for diamond shape */}
        {shape.type === "diamond" && (
          <svg
            className="sc__diamond-bg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon
              points="50,2 98,50 50,98 2,50"
              fill="white"
              stroke={shape.color}
              strokeWidth="2.5"
            />
          </svg>
        )}

        {/* Text content */}
        <div className="sc__text-wrap">
          {isEditing ? (
            <textarea
              className="sc__textarea"
              value={shape.text}
              onChange={(e) => handleTextChange(shape.id, e.target.value)}
              onBlur={handleTextBlur}
              onKeyDown={handleTextKeyDown}
              autoFocus
              placeholder="Type here…"
              style={{ color: shape.color }}
            />
          ) : (
            <span
              className="sc__text"
              style={{ color: shape.text ? shape.color : "#bdbdbd" }}
            >
              {shape.text || "Double-click to type"}
            </span>
          )}
        </div>

        {/* Resize handle */}
        {isSelected && (
          <div
            className="sc__resize"
            onMouseDown={(e) => startResize(e, shape.id)}
          >
            <RxCornerBottomRight />
          </div>
        )}

        {/* Delete button */}
        {isSelected && !isEditing && (
          <button
            className="sc__delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteShape(shape.id);
            }}
          >
            <FiTrash2 size={12} />
          </button>
        )}
      </div>
    );
  }

  const selectedShape = shapes.find((s) => s.id === selectedId);

  return (
    <div className="dc">
      {/* Toolbar */}
      <div className="dc__toolbar">
        <div className="dc__shapes">
          {[
            { type: "rect", icon: <FiSquare />, label: "Rectangle" },
            { type: "roundRect", icon: <FiSquare className="dc__rounded-icon" />, label: "Rounded" },
            { type: "circle", icon: <FiCircle />, label: "Circle" },
            { type: "diamond", icon: <MdOutlineDiamond />, label: "Diamond" },
          ].map((s) => (
            <button
              key={s.type}
              className={`dc__tool-btn ${addMode === s.type ? "dc__tool-btn--active" : ""}`}
              onClick={() => setAddMode(addMode === s.type ? null : s.type)}
              title={s.label}
            >
              {s.icon}
            </button>
          ))}
        </div>

        <div className="dc__separator" />

        <div className="dc__colors">
          {colors.map((c) => (
            <button
              key={c.value}
              className={`dc__color-btn ${color === c.value ? "dc__color-btn--active" : ""}`}
              style={{ background: c.value }}
              onClick={() => {
                setColor(c.value);
                if (selectedId) changeShapeColor(selectedId, c.value);
              }}
              title={c.label}
            />
          ))}
        </div>

        <div className="dc__separator" />

        <button
          className="dc__tool-btn dc__tool-btn--danger"
          onClick={clearAll}
          title="Clear all shapes"
          disabled={shapes.length === 0}
        >
          <FiTrash2 />
        </button>
      </div>

      {/* Hint */}
      {addMode && (
        <div className="dc__hint">
          Click on the canvas to place a {addMode === "roundRect" ? "rounded rectangle" : addMode}
        </div>
      )}

      {/* Board */}
      <div
        ref={boardRef}
        className={`dc__board ${addMode ? "dc__board--placing" : ""}`}
        onClick={handleBoardClick}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {shapes.length === 0 && !addMode && (
          <div className="dc__empty">
            Click a shape above, then click here to place it
          </div>
        )}
        {shapes.map(renderShape)}
      </div>
    </div>
  );
}

export default DrawingCanvas;
