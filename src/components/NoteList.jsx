import React from 'react'
import Note from './Note'
var suma = 0

function NoteList(props) {

    const count = (array) => {
        for (let i = 0; i < array.length; i++) {
            if(suma < 4) {
                suma++
                return suma
            } else {
                suma = 0
            }
        }
    }

    return (
        <section className="container-fluid">
            <div className="row">
                {props.notes.map((note)=>(
                    <Note key={note.id}
                    count={count(props.notes)} 
                    editRow={props.editRow} 
                    note={note}/>
                ))}
            </div>
        </section>
    )
}
    
export default NoteList;