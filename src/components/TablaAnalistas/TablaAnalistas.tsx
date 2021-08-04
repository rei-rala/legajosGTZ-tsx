import React, { useContext } from 'react'
import { Analistas } from '../../contexts/AnalistasContext'
import { Legajos } from '../../contexts/LegajosContext'

import { IAnalista, ILegajo} from '../../interfaces/DB.interface'

import './tablaAnalistas.scss'




const TablaAnalistas: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas)
  const { LegajosFB } = useContext(Legajos)
  
  return (
  <div className="tablaAnalistasContainer">
    <table>
      <thead>
        <tr>
          {/* Opcional de ID */}
          {/* <th scope='col'>id</th> */}
          <th scope='col'>Nombre</th>
          <th scope='col'>Nivel</th>
          <th scope='col'>Licencia</th>
          <th scope='col'>Cant. Legajos</th>
        </tr>
      </thead>
      <tbody>
  {
    !AnalistasFB
    ? <tr><td>&nbsp;</td><td>Cargando</td><td>&nbsp;</td></tr>
    : <>
    {
      AnalistasFB.map((a:IAnalista) => <tr key={a.id}
      >
        {/* Opcional de ID */}
        {/* <td>{a.id}</td> */}
        <td>{a.nombre}</td>
        <td>{a.nivelPredefinido}</td>
        <td>{a.licencia ? <>Si</> : ''}</td>
        <td>{
          !LegajosFB
            ? 'Cargando'
            : LegajosFB.reduce( (TotalLegajos:number, Legajo:ILegajo) => {
                return TotalLegajos + (Legajo.analistaAsignadoId === a.id ? 1 : 0)
              }, 0)
        }</td>

      </tr>)
    }
    </>
  }
  </tbody>
</table>
  </div>
)
}


export default TablaAnalistas;