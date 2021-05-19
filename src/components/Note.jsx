import React from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

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
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Nota eliminada con éxito!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    .then(()=>{
                        window.location.reload()
                    })
                } else {
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Ups! Algo salió mal',
                        showConfirmButton: false,
                        timer: 1500
                      })
                }
            })
            .catch(error => console.log('error', error));
    }

    const color = [
        "m-2 note amaranth-pink",
        "m-2 note aero-blue",
        "m-2 note mauve",
        "m-2 note medium-champagne",
    ]

    return (
        <div className="col-md-4">
            <div className={color[props.count-1]}>
                <h3>{props.note.title}</h3>
                <p>{props.note.text}</p>
                <div className="edit">
                    <button onClick={()=>{props.editRow(props.note)}} className="far fa-edit fa-1x"></button>
                    <button onClick={()=>{deleteNote(props.note.id)}} className="far fa-trash-alt fa-1x"></button>
                </div>
            </div>
        </div>
    )
}
    
export default Note;