import React, { useState, useEffect } from 'react';
//import { v4 as uuidv4 } from 'uuid';
import Header from './Header';
import Footer from './Footer';
import NewNote from './NewNote';
import UpdateNote from './UpdateNote'
import NoteList from './NoteList';
import SearchList from './SearchList';


function Home() {

  const [notes, setNotes] = useState([]);

  useEffect(() => { 
    fetch('https://stick-it-back.herokuapp.com/notes')
    .then((response)=>{return response.json()})
    .then((result)=>{
      setNotes(result.data)
    })
    .catch((e)=>{console.log(e)})
  }, []);

  const [editing, setEditing] = useState(false)

  const initialFormState = { id: null, title: '', text: '' }
  const [currentNote, setCurrentNote] = useState(initialFormState)

  //Toma los datos de la notita que queremos editar para pasarselo al formulario de edición

  const editRow = (note) => {
    setEditing(true) 
    setCurrentNote({ id: note.id, title: note.title, text: note.text})
  }

  const [searching, setSearching] = useState(false)
  const [searchingList, setSearchingList] = useState([])

  const searchedNote = (notesList) => {
    setSearching(true)
    if (notesList.leanght !== 0){
      setSearchingList(notesList)
    } else {
      setSearchingList(notes)
    }
  }

  return (
    <div>
      <Header searchedNote={searchedNote}/>
      <div className="container-fluid">
        {
          editing ? (
            <UpdateNote currentNote={currentNote}/>
          ) : (
            <NewNote/>
          )
        }
        {
          searching ? (
            <SearchList notes={searchingList} editRow={editRow}/>
          ) : (
            <NoteList notes={notes} editRow={editRow}/>
          )
        } 
      </div>
      <Footer/>
    </div>
  );
}

export default Home;