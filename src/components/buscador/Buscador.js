import React from 'react';
import { RequestApi } from '../../helper/RequestApi';

export const Buscador = ({ setstate }) => {

    const handleSubmit=(e)=>{
        e.preventDefault();
        const form = document.querySelector("#form-buscar");
        const data= new FormData(form);
        const datos={
            name: data.get('name'),
            status: data.get('status'),
            species: data.get('species'),
            type: data.get('type'),
            gender: data.get('gender')
        }    
        setstate({
            datos: datos 
        });

    }



    return (
        <div className="col-4 mt-2 mx-auto">
            <p className="title">Buscador</p>
            <hr />
            <form id="form-buscar" onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select name="status" className="form-control" defaultValue={''}>
                        <option value="">.....</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknow">unknown</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Species</label>
                    <input type="text" className="form-control" name="species"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Type</label>
                    <input type="text" className="form-control" name="type"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Gender</label>
                    <select name="gender" className="form-control" defaultValue={''}>
                        <option value="" >.....</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="genderless">Genderless</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>
                
                <button type="submit" className="btn btn-lg btn-block btn-outline-primary">Buscar</button>
            </form>

        </div>
    )
}
