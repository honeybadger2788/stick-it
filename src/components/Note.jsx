import React from 'react'

function Note(props) {
    return (
        <div className="col-md-4">
            <div className={props.bgrColor}>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
                <div className="edit">
                    <button onClick={()=>{props.editRow(props.note)}} className="far fa-edit"></button>
                    <button onClick={()=>{props.deleteNote(props.id)}} className="far fa-trash-alt"></button>
                </div>
            </div>
        </div>
    )
}
    
export default Note;