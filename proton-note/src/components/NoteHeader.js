import './NoteHeader.css';

function NoteHeader(props) {

    const initNote = () => {
        props.setEditMode(true);
        props.setActiveNote({});
    }
    // No pointer event class is added if a note is currently being edited
    // During that time the "New Note" button can not be clicked
    // This can also be restricted using a condition in the handler
  return (
    <div className={props.editMode ? "NoPointerEvents HeaderOutline" : "HeaderOutline"}>
      <button className="NewNoteButton" onClick={() => initNote()}>New Note</button>
    </div>
  );
}

export default NoteHeader;
