
const intialState = {//declaro los estados del reducer
  dogs: [],
  temperaments: [],
  allDogs: [],
  details: [],
};

const rootReducer = (state = intialState, action) => {
  switch (action.type) {
    case "GET_ALL_DOGS":
      action.payload.forEach(element => {
        if (!element.temperaments[0]) {
          element.temperaments[0] = "no-temperaments" //eliminamos arreglos vacios de temperamentos
        }
      });
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };
    case "GET_TEMPERAMENTS":
      const filteresTemp = action.payload.filter((temp) => temp.name !== ""); //eliminar razas con strings vacios
      return {
        ...state,
        temperaments: filteresTemp,
      };

    case "GET_FILTER_TEMPERAMENTS":
      const allDogs = state.allDogs;// se usa para filtrar siempre sobre todo, y no sobre el filtro anterior.
      let filteredDogs = [];
      if (action.payload === "Todos") {
        filteredDogs = allDogs;
      } else {
        for (let i = 0; i < allDogs.length; i++) {
          let found = allDogs[i].temperaments.find((t) => t === action.payload);
          if (found) {
            filteredDogs.push(allDogs[i]);
          } //todos los perros en la posicion de ese momento
        }
      }
      return {
        //return funciona correcto
        ...state,//si no se hace la copia, se borra del estado.
        dogs: filteredDogs,
      };
    case "GET_BREED":
      return {
        ...state,
        dogs: action.payload,//es el arreglo que estoy renderizando
      };
    case "ORDER_BY_NAME":
      const sortedName =
        action.payload === "A-Z"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedName,
      };

    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "min_weight"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return 1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                return -1;
              }
              if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedWeight,
      };
    case "SHOW_DOG_DETAILS":
      let myDetails = action.payload
      if (!myDetails[0].temperaments[0]) { //agregamos "no-temperaments" a arreglos sin elementos dentro
        myDetails[0].temperaments[0] = "no-temperaments"
      }
      return {
        ...state,
        details: myDetails
      };
    case "BY_CREATED":
      const createdFilter = action.payload === 'Created' ? state.allDogs.filter(i => i.createdInDb) : state.allDogs.filter(i => !i.createdInDb)
      return {
          ...state,
          dogs: action.payload === 'All' ? state.allDogs : createdFilter
      } 
    default:
      return state;
  } 
};

export default rootReducer;
