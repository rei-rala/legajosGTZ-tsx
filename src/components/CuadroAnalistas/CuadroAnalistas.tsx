import React, { useContext } from 'react'
import { Analistas } from '../../contexts/AnalistasContext'
import { Legajos } from '../../contexts/LegajosContext'

import { IAnalista, ILegajo } from '../../interfaces/DB.interface'

import './cuadroAnalistas.scss'
import EmpresaCuadroAnalista from './EmpresaCuadroAnalista/EmpresaCuadroAnalista'



const CuadroAnalistas: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas)
  const { LegajosFB } = useContext(Legajos)
  
  return (
  <div className="cuadroAnalistasContainer">
  {
    !AnalistasFB
    ? 'Cargando...'
    : <>
    {
      AnalistasFB.map(
        (a:IAnalista) => <div className="cuadroIndividual" key={a.id}>
        <h4>{a.nombre}</h4>
        <ul>{
          !LegajosFB
          ? 'Cargando'
          : LegajosFB.map((l:ILegajo) => <EmpresaCuadroAnalista key={l.id} idAnalista={a.id} idAsignado={l.analistaAsignadoId} razonSocial={l.razonSocial}/>)
        }</ul>
      </div>)
    }
    </>
  }

  </div>
)
}


export default CuadroAnalistas;