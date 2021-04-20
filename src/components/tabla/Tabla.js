import React, { useEffect, useState } from 'react';
import { RequestApi } from '../../helper/RequestApi';
import { FormularioModal } from '../modal/FormularioModal';

export const Tabla = ({state}) => {

    const response = RequestApi(state.datos);

    const initialState={
        personajes: []
    };
    const [seleccionados, setSeleccionados] = useState(initialState);

    useEffect(() => {
        setSeleccionados(initialState);
    }, [state])
    
    const handleSelected=(event)=>{
        const fila=event.nativeEvent.path[2];
        const boton = event.target;
        const index=event.target.name;

        fila.classList.add("selected");
        boton.classList.add("d-none");
        document.querySelector(`#deselect-${index}`).classList.remove("d-none");;

        const personaje=response.data.results[index];
        const agregados = seleccionados.personajes; 
        if(!agregados.includes(personaje)){
            agregados.push(personaje);
            setSeleccionados({
                personajes: agregados
            });
        }
        

    }
    
    const handleDeselect=(event)=>{
        const fila=event.nativeEvent.path[2];
        const boton = event.target;
        const index=event.target.name;

        fila.classList.remove("selected");
        boton.classList.add("d-none");
        document.querySelector(`#select-${index}`).classList.remove("d-none");;

        const personaje=response.data.results[index];
        const agregados = seleccionados.personajes; 
        const indexBorrar = agregados.indexOf(personaje);
        agregados.splice(indexBorrar, 1);
        setSeleccionados({
            personajes: agregados
        });

    }

    return (
        <div className="col-7 mt-2 mx-auto">
            <p className="title">Resultados:</p>
            <div className="d-flex">
                <div className="mx-3" style={{display: 'flex', alignItems:'center', fontSize: '20px', fontWeight:'700' }}>Seleccionados: {seleccionados.personajes.length}</div>
                <div>
                    <FormularioModal 
                        personajes={seleccionados.personajes}
                     />
                </div>
            </div>
            <hr />
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">select</th>
                    <th scope="col">image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Species</th>
                    <th scope="col">Type</th>
                    <th scope="col">Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (!response.loading)?
                            (response.data.results)?
                            response.data.results.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                         <th scope="row">
                                        <button className="btn btn-primary" onClick={handleSelected} name={`${index}`} id={`select-${index}`}>Select</button>
                                        <button className="btn btn-danger d-none" onClick={handleDeselect} name={`${index}`} id={`deselect-${index}`}>Deselect</button>
                                         </th>
                                         <th scope="row"><img className="img-personaje" src={item.image} alt={item.name}/></th>
                                         <th scope="row">{item.name}</th>
                                         <th scope="row">{item.status}</th>
                                         <th scope="row">{item.species}</th>
                                         <th scope="row">{item.type}</th>
                                         <th scope="row">{item.gender}</th>
                                    </tr>
                                )
                            })
                            :
                            <div class="alert alert-danger" role="alert">
                            No hay Resultados de la busqueda
                            </div>
                        
                        :
                        <tr>

                        </tr>    
                            
                    }
                    
                </tbody>
            </table>
        </div>
    )
}
