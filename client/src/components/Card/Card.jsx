import React from "react";
import style from "../Card/Card.module.css";

export default function Card({ image, name, weight, temperaments }) {//se pasa por props, no se necesita traer ningún estado porque la lógica ya está en el home.Las props recibidas se utilizan para renderizar la información
  return (//los div contenedor principal y contenedor de imagen//se mapea temperaments en un array de encabezados h3
    <div className={style.main_container}>
      <div className={style.image_container}>
        <img className={style.img} src={`${image}`} alt={`imagen de: ${name}`}/>
      </div>
      <h2>{name}</h2>
      <h2>{`Weight: ${weight} kg`}</h2>
      <div className={`${style.temperaments_container}`}>
        {
        temperaments.map((temps) => <h3 key={temps+Math.random}>{temps}</h3>)
        }
      </div>
      
    </div>
  );//se utiliza el Math.random(número aleatorio) porque es necesario generar una key para hacer el map.
}
