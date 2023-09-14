import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";//son las acciones que necesito para el formulario

import style from "../FormAddDog/FormAddDog.module.css";

const validate = (form) => {//la función validadora se crea afuera.El input es el estado local form
    let errors = {}
    if(!form.name || /\d/.test(form.name)) {
        errors.name = "Name is required, it should not contain numbers"
    }
    if(isNaN(form.min_height) || isNaN(form.max_height) || !form.min_height || !form.max_height || form.max_height<form.min_height) {
        errors.height = "Height is required, max height should be more than min height"
    }
    if(isNaN(form.min_weight) || isNaN(form.max_weight) || !form.min_weight || !form.max_weight || form.max_weight<form.min_weight) {
        errors.weight = "Weight is required, max weight should be more than min weight"
    }
    if(!form.life_span) {
        errors.life_span = "Lifespan is required, type only numbers separated by a dash (-)"
    }
    return errors
}

export default function FormAddDog() {
    
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({//se genera le estado local, que es un objeto vacío.
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    });

    const [form, setForm] = useState({//a este objeto se le pasa todo lo que necesita el post.
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
        temperaments: [],//se guarda en un arreglo, porque necesito guardar más de uno.
    })

    useEffect(() => {
        dispatch(getTemperaments());//uso el useEffect porque necesito renderizar la acción.
    }, [dispatch]);

    useEffect(()=>{
        if (form.name.length > 0 && !(/\d/.test(form.name)) && form.min_height.length > 0  && form.max_height.length > 0 && form.min_weight.length > 0 && form.max_weight.length > 0 && Number(form.min_height) < Number(form.max_height) && 
        Number(form.min_weight) < Number(form.max_weight)) setButton(false)
        else setButton(true)//se deshabilita el botón si hay algo en el estado errors.
    }, [form, setButton]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postDog(form));
        alert("The new dog was added successfully");
        setForm({
            name: "",
            min_height: "",
            max_height: "",
            min_weight: "",
            max_weight: "",
            life_span: "",
            image: "",
            temperaments: []
        });//seteo el estado en blanco una vez creado. Ver si puedo agregar la opción history.push que dice la clase en 1:05
    }
    
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value //el valor del atributo modificado del estado en el form se actualizara con lo escrito en dicho campo
        });
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }
    
    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value]//le paso muchos, ...form.temperaments es lo que ya había y le concateno el target value, voy guardando en un arreglo todo los que hay en el select.
        })
    }

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(temp => temp !== el)
        })
    }

    return(//se pone too entre div, y un solo h3, porque es el único título del formulario
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_to_home}>Go home</button>
                </Link>
                <form action="" id="form" onSubmit={handleSubmit} className={`${style.form}`}>
                    <div className={style.name_container}>
                        <input className={style.input_name} type="text" value={form.name} name="name" onChange={(e) => handleChange(e)} placeholder="Name..."/>
                    </div>
                    <div className={style.error_form}>{errors.name && <p>{errors.name}</p>}</div> {/*mesaje ed error de nombre*/}

                    <div className={style.height_container}>
                        <div className={style.min_height}>
                            <input type="text" value={form.min_height} name="min_height" placeholder="Min height..." onChange={(e) => handleChange(e)}/>
                        </div>
                        
                        <div className={style.max_height}>
                            <input type="text" value={form.max_height} name="max_height" placeholder="Max height..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.height && <p>{errors.height}</p>}</div>{/* espacio para agregar error */}{/* espacio para agregar error */}

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input type="text" value={form.min_weight} name="min_weight" placeholder="Min weight..." onChange={(e) => handleChange(e)}/>
                        </div>

                        <div className={style.max_weight}>
                            <input type="text" value={form.max_weight} name="max_weight" placeholder="Max weight..." onChange={(e) => handleChange(e)}/>
                        </div>
                    </div>
                    <div className={style.error_form}>{errors.weight && <p>{errors.weight}</p>}</div>{/* espacio para agregar error */}

                    <div className="life-span-container">
                        <input type="text" autoComplete="off" name="life_span" value={form.life_span} placeholder="lifespan exam: 10 - 12" onChange={(e) => handleChange(e)}/>
                    </div>
                    <div className={style.error_form}>{errors.life_span && <p>{errors.life_span}</p>}</div>{/* espacio para agregar error */}

                    <div className="image-container">
                        <input type="text" autoComplete="off" value={form.image} name="image" placeholder="Image URL..." onChange={(e) => handleChange(e)}/>
                    </div>

                    <div className={""}>
                        <h3>Select Temperaments</h3>
                    </div>

                    <div className={""}>
                        <select className={style.select_temperaments} onChange={handleSelect}>
                            <option disabled selected>Temperaments</option>
                            {temperaments.map(d => (                    
                                <option value={d.name} key={d.name+Math.random()} className={style.option_temperament}>{d.name}</option> //key de elementos de temperamentos, eliminar el repetido reserved
                            ))}
                        </select>
                    </div>

                    <div className={style.container_button_add_dog}>
                        <button className={style.button_add_dog} disabled={button} type="submit" form="form">Create Dog</button>
                    </div>
                </form>

            

                <div className="">
                    <div className="">
                        <h2>Temperaments</h2>
                    </div>

                    <div className={style.container_temperaments}>
                        {form.temperaments.map(el => 
                        <div className={style.element_temperament} key={el} onClick={() => handleDelete(el)}>
                            <p>{`${el}`}</p>
                        </div>    
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}//uso los distintos tipos, select para el combo, input para los cuadros, etc.El checkbox es para cuando hay pocas cosas, en este caso es mejor un select.//disabled={button}implica que el botón estará deshabilitado si es true.form="form" se indica para especificar que el botón está asociado al formulario "form"
