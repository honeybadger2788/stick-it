import React from 'react'
import { useForm } from 'react-hook-form';

function Header(props) {
    const {register,handleSubmit} = useForm();

    const onSubmit = (data, e) => {
        console.log(data)
        
        fetch(`https://stick-it-back.herokuapp.com/notes/search/?search=${data.search}`)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                result = JSON.parse(result)
                props.searchedNote(result.data)
                e.target.reset()
            })
            .catch(error => console.log('error', error));
    }

    return (
        <header className="container-md-fluid pad">
            <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-auto mb-md-0 mb-4">
                <i className="far fa-sticky-note fa-3x"> Stick-it</i>
            </div>
            <form className="col-md-6 mb-md-0 mb-4" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" className="search" name="search" placeholder="Search.." {...register("search", { required: {value:true}})}></input>
                <button className="button search fa fa-search" type="submit"></button>
            </form>
            <div className="col-md-auto mb-md-0 mb-4">
                <label className="switch">
                <input type="checkbox"/>
                <span className="slider round"></span>
                </label>
            </div>
            </div>
        </header>
    )
}
    
export default Header;