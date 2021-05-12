import React from 'react'

function Header(props) {
    return (
        <header className="container-md-fluid pad">
            <div className="row d-flex justify-content-between align-items-center">
            <div className="col-md-auto mb-md-0 mb-4">
                <i className="far fa-sticky-note fa-3x"> Stick-it</i>
            </div>
            <form className="col-md-6 mb-md-0 mb-4">
                <input type="text" className="search" name="search" placeholder="Search.."></input>
                <button className="button search" type="submit"><i className="fa fa-search"></i></button>
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