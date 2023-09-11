import axios from "axios";
//const urlMyApi = "http://localhost:3001";

export function getAllDogs() {
    return async function (dispatch) {
        var json = await axios.get(`/dogs`, { //axios.get(`${urlMyApi}/dogs`
        });
        return dispatch({//necesario para despachar la accion
            type: "GET_ALL_DOGS",
            payload: json.data
        });
    }
};

export function getTemperaments() {
  return async function (dispatch) {
      var json = await axios.get(`/temperament`); //axios.get(`${urlMyApi}/temperament`)
      return dispatch({
          type: "GET_TEMPERAMENTS",
          payload: json.data,
      });
    }  
};

export function FilterByTemperament(payload) {//el payload es lo que se manda desde el componente, puede tener cualquier nombre.Por ejemplo en los filtros son las opciones del filtro
    return{
        type: "GET_FILTER_TEMPERAMENTS",
        payload
    }
};

export function getBreed(payload) {//dogs by name //la uso para la barra de búsqueda
    return async function (dispatch) {//Dispatch que podemos usar gracias a la asincronia provista por el middleware thunk
        try {
            var json = await axios.get(`/dogs?name=${payload}`) //el payload es lo que viene en la barra de búsqueda
            return dispatch ({
                type: "GET_BREED",
                payload: json.data//es lo que devuelve la ruta una vez que se le asigna algo por name.
            })
        } catch (error) {
            console.log(error);
        }
    }
};

export function OrderByName(payload) {
    return { 
        type: "ORDER_BY_NAME",
        payload
    }
};

export function OrderByWeight(payload) {
    return { 
        type: "ORDER_BY_WEIGHT",
        payload
    }
};

export function showDogDetails(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/dogs/"+id, { //axios.get("http://localhost:3001/dogs/"+id
        });
        return dispatch({
            type: "SHOW_DOG_DETAILS",
            payload: json.data
        });
        } catch (error) {
            console.log(error);
        }
    }
};

export function postDog(payload) {
    return async function () {
        const data = await axios.post("/dog", payload); //axios.post("http://localhost:3001/dog"
        return data;//en este caso se llama a una ruta de post.
    }};

export function byCreated(payload) {
    return {
        type: "BY_CREATED",
        payload
        };
    };

