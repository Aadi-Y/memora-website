const Notes = require("../models/notesModel.js");
const User = require("../models/userModel.js");

async function addNote(req, res) {
    try {
        const { title, content, tags } = req.body;
        const { user } = req;

        if (!title && !content) {
            return res.status(400).json({ error: true, message: "Please provide title and content" });
        }

        const note = new Notes({
            title,
            content,
            tags: tags || [],
            userId: user.id,
        });

        await note.save();

        return res.status(201).json({
            error: false,
            message: "Notes created Successfully",
            note,
        });
    } catch (err) {
        res.status(500).json(err.message);
    }
}

async function editNote(req, res) {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req;

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        const note = await Notes.findOne({ _id: noteId, userId: user.id });

        if (!note) {
            return res.status(404).json({ error: true, message: "Note not found" });
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully",
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

async function getAllNotes(req, res) {
    const { user } = req;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const totalNotes = await Notes.countDocuments({ userId: user.id, isDeleted: false });
        const notes = await Notes.find({ userId: user.id, isDeleted: false })
            .sort({ isPinned: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            error: false,
            notes,
            currentPage: page,
            totalPages: Math.ceil(totalNotes / limit),
            totalNotes,
            message: "All notes are retrieved successfully",
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

async function deleteNote(req, res) {
    const noteId = req.params.noteId;
    const { user } = req;

    try {
        const note = await Notes.findOne({ _id: noteId, userId: user.id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        note.isDeleted = true;
        note.deletedOn = new Date().getTime();
        await note.save();

        return res.status(200).json({ error: false, message: "Note deleted successfully" });
    } catch (err) {
        return res.json({ error: true, message: "Internal server error" });
    }
}

async function editPinned(req, res) {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req;

    try {
        const note = await Notes.findOne({ _id: noteId, userId: user.id });

        if (!note) {
            return res.status(400).json({ error: true, message: "Note not found" });
        }

        note.isPinned = isPinned;
        await note.save();

        return res.status(200).json({ error: false, message: "Updated successfully", note });
    } catch (err) {
        return res.status(400).json({ error: true, message: "Some Internal error occured" });
    }
}

async function searchNotes(req, res) {
    const { user } = req;
    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ error: true, message: "Search query is required" });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const filter = {
            userId: user.id,
            isDeleted: false,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
                { tags: { $regex: new RegExp(query, "i") } },
            ],
        };

        const totalNotes = await Notes.countDocuments(filter);
        const matchingNotes = await Notes.find(filter)
            .sort({ isPinned: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            error: false,
            matchingNotes,
            currentPage: page,
            totalPages: Math.ceil(totalNotes / limit),
            totalNotes,
            message: "The note that matches for the search query",
        });
    } catch (err) {
        if (err.response && err.response.data) {
            console.log(err.response.data.message);
        }
    }
}

async function getDeletedNotes(req, res) {
    const { user } = req;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const totalNotes = await Notes.countDocuments({ userId: user.id, isDeleted: true });
        const notes = await Notes.find({ userId: user.id, isDeleted: true })
            .sort({ deletedOn: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            error: false,
            notes,
            currentPage: page,
            totalPages: Math.ceil(totalNotes / limit),
            totalNotes,
            message: "Deleted notes retrieved successfully",
        });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

async function restoreNote(req, res) {
    const noteId = req.params.noteId;
    const { user } = req;

    try {
        const note = await Notes.findOne({ _id: noteId, userId: user.id, isDeleted: true });

        if (!note) {
            return res.status(404).json({ error: true, message: "Deleted note not found" });
        }

        note.isDeleted = false;
        note.deletedOn = null;
        await note.save();

        return res.status(200).json({ error: false, message: "Note restored successfully", note });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
}

async function getUser(req, res) {
    const { user } = req;

    if (!user) {
        return res.status(400).json({ error: true, message: "User not found" });
    }

    try {
        const users = await User.find({ _id: user.id });
        res.status(200).json({ error: false, users, message: "" });
    } catch (err) {
        return res.status(500).json({ error: true, message: "Internal error occur" });
    }
}

module.exports = { addNote, editNote, getAllNotes, deleteNote, editPinned, searchNotes, getDeletedNotes, restoreNote, getUser };
