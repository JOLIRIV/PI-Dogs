import React from "react";
import style from "../Card/Card.module.css";

export default function Card({ image, name, weight, temperaments }) {//se pasa por props, no se necesita traer ningún estado porque la lógica ya está en el home.
  return (
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
  );
}
