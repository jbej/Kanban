import { Router } from 'express';
import * as NoteController from '../controllers/note.controller';

const router = new Router();

// Add a new Note
router.route('/notes').post(NoteController.addNote);

// Edit a note name by noteId
router.route('/notes/:noteId').put(NoteController.editNote);

// Delete Note
router.route('/notes/:noteId').delete(NoteController.deleteNote);

export default router;