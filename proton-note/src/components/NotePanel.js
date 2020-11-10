import './NotePanel.css';
import { v4 as uuidv4 } from 'uuid';
import {encrypt} from '../data/encrypt';

function NotePanel(props) {
    // Right panel, where most of the actions are happening
    // A handler for saving a note and encrypting the content
    // The note that is saved is set as the current active note (the one shown in the right panel)
    const saveNote = () => {
        let note;
            encrypt(props.noteContent).then(encryptedContent => {
                if (props.activeNote.id) {
                    note = {title: props.noteTitle, content: encryptedContent, id: props.activeNote.id}
                } else {
                    note = {title: props.noteTitle, content: encryptedContent, id: uuidv4()}
                }
                props.setEditMode(false);
                props.saveNote(note);
                props.setActiveNote(note);
            });
    }
    // A handler for canceling the editing of the note
    // After this there is no active note
    const cancelEditing = () => {
        props.setEditMode(false);
        props.setActiveNote(null);
    }
    // A handler for deleting an active note
    // After this there is no active note
    const deleteNote = () => {
        if (props.activeNote.id) {
            props.deleteNote(props.activeNote);
            props.setEditMode(false);
            props.setActiveNote(null);
        }
    }
    // Handlers for chaning the title and the content of the note
    // Updated on every letter that is entered
    const onTitleChange = event => props.setNoteTitle(event.target.value);
    const onContentChange = event => props.setNoteContent(event.target.value);

    // The title element which changes between an input element and a span element 
    // based on the edit mode variable and the title of the active note
    const activeNoteTitle = props.editMode ? 
    (
    <span>
        <input type="text" id="title" name="title" value={props.noteTitle} onChange={onTitleChange} className="TitleContentArea"/>
    </span>
    ) : props.activeNote && props.activeNote.title ?
    (
        <span>{props.activeNote.title}</span>
    ) : null;
    
    // The content element which changes between a text area element and a span element
    // based on the edit mode variable and the content of the active note
    const activeNoteContent = props.editMode ? 
    (
    <span>
        <textarea id="content" name="content" value={props.noteContent} onChange={onContentChange} className="NoteContentArea"></textarea>
    </span>
    ) : props.activeNote && props.activeNote.content ?
    (
        <span>{props.activeNote.content}</span>
    ) : null;

    const editButton = (
    <div className="EditButton ActionButton" onClick={() => props.setEditMode(true)}>
        Edit
    </div>
    );
    
    const actionButtons = (
        <span>
        <div className="CancelButton ActionButton" onClick={() => cancelEditing()}>
            Cancel
        </div>
        <div className="DeleteButton ActionButton" onClick={() => deleteNote()}>
            Delete
        </div>
        <div className="SaveButton ActionButton" onClick={() => saveNote()}>
            Save
        </div>
        </span>
    );
    // The set of buttons which need to be shown
    const buttons = props.activeNote !== null ?
        props.editMode ?
        <span>
            {actionButtons}
        </span> :
        <span>
            {editButton}
        </span>
        : 
        null;

  return (
    <div className="NotePanelOutline">
        <div className="NoteTitle">
            {activeNoteTitle}
        </div>
        <div className="NoteContent">
            {activeNoteContent}      
        </div>
        <div className="NoteActions">
            {buttons}
        </div>
    </div>
  );
}

export default NotePanel;