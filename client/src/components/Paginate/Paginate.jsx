import React from "react";
import style from "../Paginate/Paginate.module.css"

export default function Paginate({ dogsPerPage, allDogs, paginado }) {
    const pageNumbers =[];//array que contendrá la cantidad de páginas a renderizar

    for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) { //math ceil redondea para arriba//cantidad de elementos totales, dividido limite de elementos por pagina
        pageNumbers.push(i);
    }

    return(//este map renderiza el número de páginas por separado
        <nav className={`${style.nav_container}`}>
            <ul className={`${style.ul_container}`}>
                { pageNumbers && pageNumbers.map(number => (
                    <li className={`${style.li_container}`} onClick={() => paginado(number)} key={number}>
                         <button type="button">{number}</button> 
                    </li>
                ))}
            </ul>
        </nav>
    )
}// sobre la cantidad de filtros que haya, devuelve las páginas correspondientes. Al paginado se le pasa una variable con lo que hay que paginar, y lo divide. Dependiendo de si trabaja sobre la cantidad total, o lo que está filtrando se va acomodando.