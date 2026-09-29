const Note = require('./note.model');
const mongoose = require('mongoose');

async function create(noteData) {
    const note = new Note(noteData);
    return note.save();
}

async function findById(noteId) {
    return Note.findById(noteId);
}

async function findByIdAndUpdate(noteId, updateData) {
    return Note.findByIdAndUpdate(noteId, updateData, {
        new: true,
        runValidators: true,
    });
}

async function replaceById(noteId, newData) {
    // findOneAndReplace swaps the whole document (except _id) with newData.
    return Note.findOneAndReplace({ _id: noteId }, newData, { new: true });
}

async function findByIdAndDelete(noteId) {
    return Note.findByIdAndDelete(noteId);
}

async function updateManyTitleByUser(userId, title) {
    return Note.updateMany({ userId }, { title });
}

async function findPaginatedByUser(userId, page, limit) {
    return Note.find({ userId })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
}

async function findByUserAndContent(userId, content) {
    return Note.findOne({ userId, content });
}

async function findByUserWithUserEmail(userId) {
    return Note.find({ userId })
        .select('title userId createdAt')
        .populate('userId', 'email');
}

async function deleteAllByUser(userId) {
    return Note.deleteMany({ userId });
}

async function aggregateByUser(userId, title) {
    const matchStage = { userId: new mongoose.Types.ObjectId(userId) };
    if (title) {
        matchStage.title = title;
    }

    return Note.aggregate([
        { $match: matchStage },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
            },
        },
        { $unwind: '$user' },
        {
            $project: {
                _id: 0,
                title: 1,
                userId: 1,
                createdAt: 1,
                'user.name': 1,
                'user.email': 1,
            },
        },
    ]);
}

module.exports = {
    create,
    findById,
    findByIdAndUpdate,
    replaceById,
    findByIdAndDelete,
    updateManyTitleByUser,
    findPaginatedByUser,
    findByUserAndContent,
    findByUserWithUserEmail,
    deleteAllByUser,
    aggregateByUser,
};