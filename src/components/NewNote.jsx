import React from 'react';
import { useForm } from 'react-hook-form';

function NewNote() {
    const {register,formState: { errors }, handleSubmit} = useForm();

    const onSubmit = (data, e) => {
    console.log(data)

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", data.title);
    urlencoded.append("text", data.text);

    var requestOptions = {
        method: 'POST',
        body: urlencoded
    };

    fetch("https://stick-it-back.herokuapp.com/notes/create", requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            window.location.reload()
            e.target.reset();
        })
        .catch(error => console.log('error', error));
    }

    return (
        <section className="container-fluid m-3 pad">
        <form className="col-md-6 mx-auto d-flex flex-column new pad" onSubmit={handleSubmit(onSubmit)}>
                <p className="error">{errors.title && errors.title.message}</p>
                <input type="text" name="title" className="new" placeholder="Título" {...register("title", { required: {value:true, message: "El titulo es obligatorio"}, maxLength: {value:20, message: "El titulo no puede tener + de 20 caracteres"} })}/>
                <p className="error">{errors.text && errors.text.message}</p>
                <textarea name="text" id="text" placeholder="Añade una nota..." {...register("text", { required: {value:true, message: "El texto es obligatorio"}, minLength: {value:2, message: "La nota debe tener al menos 2 caracteres"} })}/>
                <button className="button new" type="submit">Crear</button>
        </form>
        </section>
    )
}
    
export default NewNote;