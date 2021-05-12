import React from 'react';
import { useForm } from 'react-hook-form';

function UpdateNote(props) {

    console.log(props.currentNote)

    const {register,formState: { errors },handleSubmit, setValue} = useForm({
        defaultValues: props.currentNote
    });

    //actualiza los datos de la nota que se desea editar, a medida que se va seleccionando

    setValue('title', props.currentNote.title)
    setValue('text', props.currentNote.text)

    const onSubmit = (data, e) => {
        //console.log(data)
        data.id = props.currentNote.id
        props.updateNote(props.currentNote.id,data)
        e.target.reset();
    }

    return (
        <section className="container-fluid m-3 pad">
        <form className="col-md-6 mx-auto d-flex flex-column new pad" onSubmit={handleSubmit(onSubmit)}>
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