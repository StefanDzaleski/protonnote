import './ListPanel.css';
import Note from './Note';

function ListPanel(props) {
  const notes = props.notes.map(note => {
    return (<Note key={note.id} note={note} setActiveNote={props.setActiveNote}></Note>)
  })
    // No pointer event class is added if a note is currently being edited
    // During that time no note can not be clicked
    // This can also be restricted using a condition in the handler
  return (
    <div className={props.editMode ? "NoPointerEvents ListPanelOutline" : "ListPanelOutline"}>
      {notes}
    </div>
  );
}

export default ListPanel;
