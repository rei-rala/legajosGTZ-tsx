import React, { useContext, useEffect, useState } from 'react'
import { Analistas } from '../../contexts/AnalistasContext'
import { Legajos } from '../../contexts/LegajosContext'

import { IAnalista, ILegajo } from '../../interfaces/DB.interface'

import './tablaLegajos.scss'
import TableTHSort from '../TableTHSort/TableTHSort'

const TablaLegajos: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas)
  const { LegajosFB, manageLegajos, quitarLegajo } = useContext(Legajos)

  const [ tablaLegajos, setTablaLegajos ] = useState([])

  const [ refreshState, setRefreshState ] = useState(false);
  const toggleRefreshState = ()=> setRefreshState(!refreshState)

  useEffect(()=> {
    if (LegajosFB) {
      setTablaLegajos([])
      setTablaLegajos(LegajosFB)
    }
  }, [LegajosFB])

  return <div className="tablaAnalistasContainer">
    <table>
      <thead>
        <tr>
          {/* Opcional de ID */}
          {/* <th scope='col'>id</th> */}
          {/* Elegi los TH para usar como ordenador de la tabla, notar que para fechas muestro fecha corta y ordeno por detras por Fecha FULL */}
          <TableTHSort source={LegajosFB} management={manageLegajos} sortParameter={'fechaIngresoFull'} refreshUseEffect={toggleRefreshState}>F. Ingreso</TableTHSort>
          <TableTHSort source={LegajosFB} management={manageLegajos} sortParameter={'codSolicitud'} refreshUseEffect={toggleRefreshState}>Cod Solicitud</TableTHSort>
          <TableTHSort source={LegajosFB} management={manageLegajos} sortParameter={'razonSocial'} refreshUseEffect={toggleRefreshState}>Razon Social</TableTHSort>
          <TableTHSort source={LegajosFB} management={manageLegajos} sortParameter={'nivelLegajo'} refreshUseEffect={toggleRefreshState}>Nivel</TableTHSort>
          <TableTHSort source={LegajosFB} management={manageLegajos} sortParameter={'fechaAsignadoFull'} refreshUseEffect={toggleRefreshState}>F. Asignado</TableTHSort>
          <th scope='col'>Analista</th>
          <th scope='col'>T.A.</th>
        </tr>
      </thead>
      <tbody>
        {
          !tablaLegajos
          ? <tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>Cargando</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>
          : <>
              {
                tablaLegajos.map((l:ILegajo) => <tr key={l.id}>
                  <td>{l.fechaIngresoShort}</td>
                  <td>{l.codSolicitud}</td>
                  <td>{l.razonSocial}</td>
                  <td>{l.nivelLegajo}</td>
                  <td>{l.fechaAsignadoShort}</td>
                  <td data-idlegajo={l.id} onClick={quitarLegajo}>
                    {
                      !l.asignado 
                        ? ''
                        : AnalistasFB
                          ? AnalistasFB.find( (a:IAnalista)=> a.id === l.analistaAsignadoId ).nombre
                          : 'Cargando'
                    }
                  </td>
                  <td>
                    {
                      !l.asignado 
                        ? ''
                        : AnalistasFB
                          ? AnalistasFB.find( (a:IAnalista)=> a.id === l.analistaAsignadoId ).tipoAnalista
                          : 'Cargando'
                    }
                  </td>
                </tr>)
              }
          </>
        }
  </tbody>
  </table>
</div>
}


export default TablaLegajos;