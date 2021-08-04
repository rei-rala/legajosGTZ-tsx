import React, { useContext } from 'react'
import { Analistas } from '../../contexts/AnalistasContext'
import { Legajos } from '../../contexts/LegajosContext'

import { IAnalista, ILegajo} from '../../interfaces/DB.interface'

import './tablaLegajos.scss'





const TablaLegajos: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas)
  const { LegajosFB } = useContext(Legajos)
  

  return (
  <div className="tablaAnalistasContainer">
    <table>
      <thead>
        <tr>
          {/* Opcional de ID */}
          {/* <th scope='col'>id</th> */}
          <th scope='col'>F. Ingreso</th>
          <th scope='col'>Cod Solicitud</th>
          <th scope='col'>Razon Social</th>
          <th scope='col'>Nivel</th>
          <th scope='col'>F. Asignado</th>
          <th scope='col'>Analista</th>
          <th scope='col'>T. Analista</th>
        </tr>
      </thead>
      <tbody>
  {
    !LegajosFB
    ? <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>Cargando</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
    : <>
    {
      LegajosFB.map((l:ILegajo) => <tr key={l.id}>
          <td>{l.fechaIngresoShort}</td>
          <td>{l.codSolicitud}</td>
          <td>{l.razonSocial}</td>
          <td>{l.nivelLegajo}</td>
          <td>{l.fechaAsignadoShort}</td>
          <td>
            {
              l.asignado 
                ? AnalistasFB
                  ? AnalistasFB.find( (a:IAnalista)=> a.id === l.analistaAsignadoId ).nombre
                  : 'Cargando'
                : ''
            }
          </td>
          <td>
            {
              l.asignado 
              ? AnalistasFB
                ? AnalistasFB.find( (a:IAnalista)=> a.id === l.analistaAsignadoId ).tipoAnalista
                : 'Cargando'
              : ''
            }
          </td>

      </tr>)
    }
    </>
  }
  </tbody>
</table>
  </div>
)
}


export default TablaLegajos;