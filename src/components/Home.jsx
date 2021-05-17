import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Footer from './Footer';
import NewNote from './NewNote';
import UpdateNote from './UpdateNote'
import NoteList from './NoteList';

function Home() {
  const notesData = [
    {id: uuidv4() , title: "Hola", text: "Soy una notita", bgrColor: "m-2 note aero-blue"},
    {id: uuidv4() , title: "Holaa", text: "Soy una notitaa", bgrColor: "m-2 note mauve"},
    {id: uuidv4() , title: "Holaaa", text: "Soy una notitaaa", bgrColor: "m-2 note amaranth-pink"},
    {id: uuidv4() , title: "Holaaaa", text: "Soy una notitaaaa", bgrColor: "m-2 note medium-champagne"},
  ]

  const [notes, setNotes] = useState(notesData);

  const addNote = (note) => {
    note.id = uuidv4()
    note.bgrColor = "m-2 note aero-blue"
    console.log(note)
    setNotes([
      ...notes,
      note
    ])
  }

  const deleteNote = (id) => {
    //console.log(id)
    setNotes(notes.filter(note => note.id !== id))
  }

  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, title: '', text: '' }
  const [currentNote, setCurrentNote] = useState(initialFormState)

  //Toma los datos de la notita que queremos editar para pasarselo al formulario de edición

  const editRow = (note) => {
    setEditing(true) 
    setCurrentNote({ id: note.id, title: note.title, text: note.text, bgrColor: note.bgrColor})
  }

  const updateNote = (id, updatedNote) => {
    //console.log(id)
    setEditing(false) 
    setNotes(notes.map(note => note.id === id ? updatedNote: note))
  }

  return (
    <div>
      <Header/>
      <div className="container-fluid">
        {
          editing ? (
            <UpdateNote currentNote={currentNote}
            updateNote={updateNote}/>
          ) : (
            <NewNote addNote={addNote}/>
          )
        } 
        <NoteList notes={notes} deleteNote={deleteNote} editRow={editRow}/>
      </div>
      <Footer/>
    </div>
  );
}

export default Home;