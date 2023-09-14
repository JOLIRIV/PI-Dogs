import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  byCreated,
  OrderByName,
  OrderByWeight,
} from "../../redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar"

import style from "../Home/Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs); //valores del estado global de redux que requiero//con el use selector, trae en la constante todo lo que hay en el estado de dogs.
  const allTemperaments = useSelector(state => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);//estado local con la página actual y que setea la página actual(indica cuál va a ser la futura página actual)
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage;//índice del último personaje que tengo en cada página
  const firstIndex = lastIndex - dogsPerPage;//índice del último personaje, menos los personajes por página(índice del primer personaje que tengo en cada página)
  const currentDogs = allDogs.slice(firstIndex, lastIndex);//guarda los elementos a renderizar en la pagina (personajes que están en la página actual)//el slice toma la porción del arreglo dependiendo de lo que se le pase por parámetro
  //el paginado se utiliza solamente en home, por eso se maneja con estados locales y no en el estado global.
  console.log(currentDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };//es una constante a la que se le pasa el número de página y se setea en ese número de página

  // eslint-disable-next-line
  const [orden, setOrden] = useState("");//es un estado local vacío que lo utilizo que para que cuando setee la página modifique el estado local y se renderice.

  useEffect(() => {
    //acciones a depachar luego de montar el componente//el useEffect trae del estado los personajes cuando el componente se monta (va llenando el estado cuando se monta el componente).
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);//montate y ejecutalo siempre y cuando suceda el dispatch.Suele usarse cuando se tienen dependencias entre una y otra cosa(un componente tiene que montarse si pasa algo antes)

  const handleFilterByTemperament = (e) => {//e es el evento.Esta función despacha la acción
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));//con el e.target.value toma el valor dependiendo de las opciones según clickee el usuario
  };

  const handleFilterByCreated = (e) => {
    e.preventDefault();    
    dispatch(byCreated(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <>
      <header className={`${style.header}`}>
        <div className={`${style.header_container_left}`}>

          <Link to="/">
            <div className={`${style.logo}`}>Dogpedia</div> {/* logo del home */}
          </Link>
          
          <div className={`${style.header_left}`}>

            <SearchBar />

            <div className={`${style.container_filters}`}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                  Alphabetical order
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Filter by weight
                </option>
                <option value="max_weight">Max</option>
                <option value="min_weight">Min</option>
              </select>

              <select onChange={handleFilterByTemperament}>
                  <option disabled selected defaultValue>Temperaments</option>
                  <option value="Todos">All</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))
                  }
              </select>

              <select onChange={handleFilterByCreated}>
                  <option disabled selected defaultValue>Created</option>
                  <option value="All">All</option>
                  <option value="Created">CreatedDb</option>
                  <option value="Createdapi">CreatedApi</option>
              </select>


            </div>
            
          </div>
        </div>
        {/* boton para agregar nuevos perros */}
        <div className={`${style.header_right}`}>
          <Link to="/dog">
            <button className={`${style.button_add_dog}`}>CREATE DOG</button>
          </Link>
        </div>
      </header>

      <hr />

    <div className={style.main_container}>
      <div className={style.container_cards}>
        {currentDogs?.map((el) => {//validacion que existan los datos//dog-detail es la ruta indicada en App//estoy mapeando el estado global y pasando las cosas que necesito en la tarjeta
          return(
            <div className={`${style.container_card}`} key={el.id}>
              <Link to={"/dog-detail/"+el.id}>
                {
                  <Card key={el.id} image={el.image} name={el.name} weight={el.weight} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments}/>
                  //le paso las props a card, id es la clave para poder identificar la card. si temperaments viene en un formato distinto desde la BD. Con el map, se le están pasando las props a Card. El home ya trae el estado global, por eso mapeo del estado global y le paso las props a Card.
                }
              </Link>
            </div>      
          )
        })}
      </div>
      <div className={`${style.pagination}`}>
        <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> {/*elvalor de la funcion de paginado aumenta segun el bucle for en el componente Paginate//le paso las props al componente paginate*/}
      </div>
    </div>
    </>
  );
}

export default Home;
