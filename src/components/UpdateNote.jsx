import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


function UpdateNote(props) {

    console.log(props.currentNote)

    const {register,formState: { errors },handleSubmit, setValue} = useForm({
        defaultValues: props.currentNote
    });

    //actualiza los datos de la nota que se desea editar, a medida que se va seleccionando

    setValue('title', props.currentNote.title)
    setValue('text', props.currentNote.text)

    const onSubmit = (data, e) => {
        var urlencoded = new URLSearchParams();
        urlencoded.append("title", data.title);
        urlencoded.append("text", data.text);

        var requestOptions = {
            method: 'PATCH',
            body: urlencoded,
        };

        fetch(`https://stick-it-back.herokuapp.com/notes/update/${props.currentNote.id}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                result = JSON.parse(result)
                if(result.meta.status === 200){
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Nota editada con éxito!',
                        showConfirmButton: false,
                        timer: 1500
                      })
                    .then(()=>{
                        window.location.reload()
                        e.target.reset();
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

    return (
        <section className="container-fluid m-3 pad">
        <form className="col-md-6 mx-auto d-flex flex-column new pad" action={"https://stick-it-back.herokuapp.com/notes/update/"+props.currentNote.id} method="POST" onSubmit={handleSubmit(onSubmit)}>
                <p className="error">{errors.title && errors.title.message}</p>
                <input type="text" name="title" className="new" placeholder="Título" {...register("title", { required: {value:true, message: "El titulo es obligatorio"}, maxLength: {value:20, message: "El titulo no puede tener + de 20 caracteres"} })}/>
                <p className="error">{errors.text && errors.text.message}</p>
                <textarea name="text" id="text" placeholder="Añade una nota..." {...register("text", { required: {value:true, message: "El texto es obligatorio"}, minLength: {value:2, message: "La nota debe tener al menos 2 caracteres"} })}/>
                <button className="button new" type="submit">Guardar</button>
        </form>
        </section>
    )
}
    
export default UpdateNote;