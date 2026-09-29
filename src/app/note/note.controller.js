const noteService = require('./note.service');

// The logged-in user's id always comes from the query string: ?userId=...

async function createNote(req, res) {
    try {
        const { userId } = req.query;
        const result = await noteService.createNote(userId, req.body);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function updateNote(req, res) {
    try {
        const { userId } = req.query;
        const { noteId } = req.params;
        const result = await noteService.updateNote(userId, noteId, req.body);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function replaceNote(req, res) {
    try {
        const { userId } = req.query;
        const { noteId } = req.params;
        const result = await noteService.replaceNote(userId, noteId, req.body);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function updateAllTitles(req, res) {
    try {
        const { userId } = req.query;
        const { title } = req.body;
        const result = await noteService.updateAllTitles(userId, title);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteNote(req, res) {
    try {
        const { userId } = req.query;
        const { noteId } = req.params;
        const result = await noteService.deleteNote(userId, noteId);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getPaginatedSorted(req, res) {
    try {
        const { userId, page, limit } = req.query;
        const result = await noteService.getPaginatedSorted(userId, page, limit);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getNoteById(req, res) {
    try {
        const { userId } = req.query;
        const { id } = req.params;
        const result = await noteService.getNoteById(userId, id);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getNoteByContent(req, res) {
    try {
        const { userId, content } = req.query;
        const result = await noteService.getNoteByContent(userId, content);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function getNotesWithUser(req, res) {
    try {
        const { userId } = req.query;
        const result = await noteService.getNotesWithUser(userId);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function aggregateNotes(req, res) {
    try {
        const { userId, title } = req.query;
        const result = await noteService.aggregateNotes(userId, title);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function deleteAllNotes(req, res) {
    try {
        const { userId } = req.query;
        const result = await noteService.deleteAllNotes(userId);
        return res.status(result.status).json(result.body);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createNote,
    updateNote,
    replaceNote,
    updateAllTitles,
    deleteNote,
    getPaginatedSorted,
    getNoteById,
    getNoteByContent,
    getNotesWithUser,
    aggregateNotes,
    deleteAllNotes,
};