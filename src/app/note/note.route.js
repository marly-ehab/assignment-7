const express = require('express');
const noteController = require('./note.controller');

const router = express.Router();

// Specific paths must be declared before the generic "/:id" route,
// otherwise Express would treat words like "aggregate" as an :id value.
router.get('/paginate-sort', noteController.getPaginatedSorted);
router.get('/note-by-content', noteController.getNoteByContent);
router.get('/note-with-user', noteController.getNotesWithUser);
router.get('/aggregate', noteController.aggregateNotes);
router.get('/:id', noteController.getNoteById);

router.patch('/all', noteController.updateAllTitles);
router.patch('/:noteId', noteController.updateNote);

router.put('/replace/:noteId', noteController.replaceNote);

router.delete('/:noteId', noteController.deleteNote);
router.delete('/', noteController.deleteAllNotes);

router.post('/', noteController.createNote);

module.exports = router;