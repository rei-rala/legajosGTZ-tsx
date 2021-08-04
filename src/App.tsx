import React from 'react';
import './App.css';

import { 
  BrowserRouter as Router,
  //Route,
  //Link,
  //RouteComponentProps
} from 'react-router-dom'

import { AnalistasContext } from './contexts/AnalistasContext'
import { LegajosContext } from './contexts/LegajosContext'

import Header from './components/Header/Header';

import FormAsignacion from './components/FormAsignacion/FormAsignacion';

import TablaAnalistas from './components/TablaAnalistas/TablaAnalistas';
import TablaLegajos from './components/TablaLegajos/TablaLegajos';
import CuadroAnalistas from './components/CuadroAnalistas/CuadroAnalistas';

function App() {
  return (
    <>
    <Router>
      <Header/>
      <AnalistasContext>
        <LegajosContext>
          
        <FormAsignacion/>


        <CuadroAnalistas />
        <TablaAnalistas />
        
        <TablaLegajos/>
        </LegajosContext>
      </AnalistasContext>
    </Router>
  </>
  );
}

export default App;
