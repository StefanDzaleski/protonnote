import './App.css';
import React, {useState} from 'react';
import ListPanel from './components/ListPanel';
import NotePanel from './components/NotePanel';
import NoteHeader from './components/NoteHeader';
import { decrypt } from './data/encrypt';

function App() {
  // Initing the state variables
  // List of notes: [{title, content, id}...]
  const [notes, setNotes] = useState([]);
  // Active note - note that is currently displayed in the right panel
  const [activeNote, makeNoteActive] = useState(null);
  // Edit mode (boolean) - whether there is a note being created/edited currently, used for restricting access to actions
  const [editMode, changeMode] = useState(false);
  // Content of the current note in order to manipulate it
  const [noteContent, setNoteContent] = useState('');
  // Title of the current note in order to manipulate it
  const [noteTitle, setNoteTitle] = useState('');

  // Handler for saving a note (both create and edit)
  const addNote = (note) => {
    const index = notes.findIndex(n => n.id === note.id);
    let newNotes;
    if (index === -1) {
      newNotes = notes.concat(note);
    } else {
      notes[index] = note;
      newNotes = [...notes];
    }
    setNotes(newNotes);
  }

  // Handler for deleting a note
  const deleteNote = (note) => {
    const index = notes.findIndex(n => n.id === note.id);
    notes.splice(index, 1);
    setNotes(notes);
  }

  // Handler for setting an active note and decrypting the content of the note
  // If a note is deleted or a new note is being created, the 'active' note is null or an empty note
  const setActiveNote = (note) => {
      if (!note || !note.title || !note.content) {
        setNoteContent('');
        setNoteTitle('');
        makeNoteActive(note);
      } else {
        decrypt(note.content).then(decryptedContent => {
          setNoteContent(decryptedContent);
          setNoteTitle(note.title);
          makeNoteActive(note);
        });
      }
  }

  // Handler for setting the edit mode variable
  const setEditMode = (value) => {
    changeMode(value);
  }

  return (
    <div className="Wrapper">
      <NoteHeader setActiveNote={setActiveNote} setEditMode={setEditMode} editMode={editMode}></NoteHeader>
      <div className="PanelsWrapper">
      <ListPanel notes={notes} setActiveNote={setActiveNote} editMode={editMode}></ListPanel>
      <NotePanel 
      activeNote={activeNote} 
      setActiveNote={setActiveNote} 
      noteTitle={noteTitle}
      setNoteTitle={setNoteTitle} 
      noteContent={noteContent}
      setNoteContent={setNoteContent} 
      saveNote={addNote} 
      deleteNote={deleteNote} 
      editMode={editMode} 
      setEditMode={setEditMode}>
      </NotePanel>
      </div>
    </div>
  );
}

export default App;
