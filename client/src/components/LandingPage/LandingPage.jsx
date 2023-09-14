import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >A DOGPEDIA</h1>
        <h3>Aplication about dogs</h3>
        <div className={`${style.left_paragraph}`}>
          <p>Here, you can access a wealth of information on a variety of dog breeds, detailing aspects such as size, life span, and temperament. Additionally, it provides you the ability to contribute by adding new breeds to our database.</p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
