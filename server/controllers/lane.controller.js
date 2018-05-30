import Lane from '../models/lane';
import Note from '../models/note';
import uuid from 'uuid';

export function getSomething(req, res) {
  return res.status(200).end();
} 

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ lanes });
  });
}

export function deleteNote(req, res) {
  const noteId = req.params.noteId;
  Note.findOne({ id: noteId }).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }

    Lane.findOne({id: req.body.laneId}).exec((err, lane) => {
      const updatedNotes = lane.notes.filter(note => note.id !== noteId);
        lane.notes = updatedNotes;
        lane.save(()=> {
          note.remove(() => {
            res.status(200).end();
          });
        });
      });
    });
}

export function editNote (req, res){
  const noteId = req.params.noteId;
  const newTask = req.body.task;
  Note.findOne({id: noteId}).exec((err, note) => {
    if (err) {
      res.status(500).send(err);
    }
    note.task = newTask;
    note.save((err, noteSaved) => {
      if (err) {
        res.status(500).end();
      }

      res.json(noteSaved);
    })
  });
}