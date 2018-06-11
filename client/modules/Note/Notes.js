import React, { PropTypes } from 'react';
import Note from './Note';
import styles from './Note.css';
import Edit from '../../components/Edit';

const Notes = ({ notes, laneId, editNote, updateNote, deleteNote, moveWithinLane }) => (
  <ul className={styles.Notes}>{notes.map((note, id) =>
    <Note
      id={note.id}
      key={note.id || id}
      moveWithinLane={moveWithinLane}
      laneId={laneId}
    >
      <Edit
        editing={note.editing}
        value={note.task}
        onValueClick={() => editNote(note.id)}
        onUpdate={task => updateNote({
          ...note,
          task,
          editing: false,
        })}
        onDelete={() => deleteNote(note.id, laneId)}
      />
    </Note>
  )}</ul>
);

Notes.propTypes = {
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
  laneId: PropTypes.string,
  editNote: PropTypes.func,
  notes: PropTypes.array,
  moveWithinLane: PropTypes.func,
};

export default Notes;