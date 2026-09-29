const noteRepository = require('./note.repository');

async function createNote(userId, { title, content }) {
    await noteRepository.create({ title, content, userId });
    return { status: 201, body: { message: 'Note created' } };
}

async function updateNote(userId, noteId, updateData) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
        return { status: 404, body: { message: 'Note not found' } };
    }
    if (String(note.userId) !== String(userId)) {
        return { status: 403, body: { message: 'You are not the owner' } };
    }

    const updated = await noteRepository.findByIdAndUpdate(noteId, updateData);
    return { status: 200, body: { message: 'updated', note: updated } };
}

async function replaceNote(userId, noteId, newData) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
        return { status: 404, body: { message: 'Note not found' } };
    }
    if (String(note.userId) !== String(userId)) {
        return { status: 403, body: { message: 'You are not the owner' } };
    }

    const replaced = await noteRepository.replaceById(noteId, {
        ...newData,
        userId,
    });
    return { status: 200, body: replaced };
}

async function updateAllTitles(userId, title) {
    const result = await noteRepository.updateManyTitleByUser(userId, title);
    if (result.matchedCount === 0) {
        return { status: 404, body: { message: 'No note found' } };
    }
    return { status: 200, body: { message: 'All notes updated' } };
}

async function deleteNote(userId, noteId) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
        return { status: 404, body: { message: 'Note not found' } };
    }
    if (String(note.userId) !== String(userId)) {
        return { status: 403, body: { message: 'You are not the owner' } };
    }

    const deleted = await noteRepository.findByIdAndDelete(noteId);
    return { status: 200, body: { message: 'deleted', note: deleted } };
}

async function getPaginatedSorted(userId, page = 1, limit = 10) {
    const notes = await noteRepository.findPaginatedByUser(
        userId,
        Number(page),
        Number(limit)
    );
    return { status: 200, body: notes };
}

async function getNoteById(userId, noteId) {
    const note = await noteRepository.findById(noteId);
    if (!note) {
        return { status: 404, body: { message: 'Note not found' } };
    }
    if (String(note.userId) !== String(userId)) {
        return { status: 403, body: { message: 'You are not the owner' } };
    }
    return { status: 200, body: note };
}

async function getNoteByContent(userId, content) {
    const note = await noteRepository.findByUserAndContent(userId, content);
    if (!note) {
        return { status: 404, body: { message: 'No note found' } };
    }
    return { status: 200, body: note };
}

async function getNotesWithUser(userId) {
    const notes = await noteRepository.findByUserWithUserEmail(userId);
    return { status: 200, body: notes };
}

async function aggregateNotes(userId, title) {
    const notes = await noteRepository.aggregateByUser(userId, title);
    return { status: 200, body: notes };
}

async function deleteAllNotes(userId) {
    await noteRepository.deleteAllByUser(userId);
    return { status: 200, body: { message: 'Deleted' } };
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