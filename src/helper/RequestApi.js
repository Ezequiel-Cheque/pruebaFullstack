import { useFetch } from "../customeHooks/useFetch";

/*Tenemos una funcion que va a hacer uso del custome hook useFetch, que hace una peticion fetch a un endpoint regresando un objeto {loading, data}   
* recibe como parametro la ultima sección del endpoint de la api web que vamos a consumir
*/
export const RequestApi = (datos) => {
    const url=`https://rickandmortyapi.com/api/character/?name=${datos.name}&status=${datos.status}&gender=${datos.gender}&species=${datos.species}&type=${datos.type}`;
    const state= useFetch(url);

    return state;
}