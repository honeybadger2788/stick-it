import React from 'react'

function Note(props) {

    const deleteNote = (id) => {
        var requestOptions = {
            method: 'GET',
        };

        fetch(`https://stick-it-back.herokuapp.com/notes/delete/${id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                result = JSON.parse(result)
                if(result.meta.status === 200){
                    alert('Nota eliminada con éxito')
                    window.location.reload()
                } else {
                    alert('Algo salió mal')
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="col-md-4">
            <div className="m-2 note amaranth-pink"/*{props.bgrColor}*/>
                <h3>{props.title}</h3>
                <p>{props.text}</p>
                <div className="edit">
                    <button onClick={()=>{props.editRow(props.note)}} className="far fa-edit fa-1x"></button>
                    <button onClick={()=>{deleteNote(props.id)}} className="far fa-trash-alt fa-1x"></button>
                </div>
            </div>
        </div>
    )
}
    
export default Note;