const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../utilities.js");
const {
    addNote,
    editNote,
    getAllNotes,
    deleteNote,
    editPinned,
    searchNotes,
    getDeletedNotes,
    restoreNote,
    getUser,
} = require("../controllers/notesController.js");

router.post("/add-notes", authenticateToken, addNote);
router.put("/edit-note/:noteId", authenticateToken, editNote);
router.get("/get-all-notes", authenticateToken, getAllNotes);
router.delete("/delete-note/:noteId", authenticateToken, deleteNote);
router.put("/edit-pinned/:noteId", authenticateToken, editPinned);
router.get("/search-notes", authenticateToken, searchNotes);
router.get("/get-deleted-notes", authenticateToken, getDeletedNotes);
router.put("/restore-note/:noteId", authenticateToken, restoreNote);
router.get("/get-user", authenticateToken, getUser);

module.exports = router;
