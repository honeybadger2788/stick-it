import React from 'react'
import Note from './Note'

function NoteList(props) {
    return (
        <section className="container-fluid">
            <div className="row">
                {props.notes.map(note=>(
                    <Note key={note.id} 
                    id={note.id} 
                    title={note.title} 
                    text={note.text} 
                    bgrColor={note.bgrColor} 
                    deleteNote={props.deleteNote} 
                    editRow={props.editRow} 
                    note={note}/>
                ))}
            </div>
        </section>
    )
}
    
export default NoteList;