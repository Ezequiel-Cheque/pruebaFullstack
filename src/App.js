import React, { useState } from 'react';
import './App.css';
import { Buscador } from './components/buscador/Buscador';
import { Nav } from './components/header/Nav';
import { Tabla } from './components/tabla/Tabla';

export const App = () => {

  const initialState={
  datos: {
            name: '',
            status: '',
            species: '',
            type: '',
            gender: ''
  } 
  };
  const [state, setstate] = useState(initialState);

  return (
    <>
    <Nav/>
    <div className="container-fluid">
      <div className="row">
      <Buscador setstate={ setstate }/>
      <Tabla state={ state }/>
      </div>
    </div>
    </>
  )
}

