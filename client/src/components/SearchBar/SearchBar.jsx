import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../redux/actions/";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearchDog(e.target.value)//seteo el SearchDog en el valor del input(lo que tipea el usuario)
        console.log(searchDog)//voy guardando lo que está tipeando el usuario, en el estado local SearchDog
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getBreed(searchDog));//lo que tengo en el estado local le llega a la acción que llama al back y le pasa lo que está escribiendo el usuario
    }

    return(
        <div className={style.searchbar_container}>
            <input className={`${style.searchbar}`} type="text" onChange={handleInput} placeholder="Search..."/>
            <button className={`${style.searchbar_button}`} type="submit" onClick={handleSubmit}>
                <i className="fa-solid fa-magnifying-glass"></i>Search
            </button>
        </div>
    )
}