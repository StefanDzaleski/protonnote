import './Note.css';

function Note(props) {
  return (
    <div className="NoteOutline" onClick={() => props.setActiveNote(props.note)}>
            {props.note.title}
    </div>
  );
}

export default Note;