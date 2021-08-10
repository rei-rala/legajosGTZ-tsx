import React, { useState, useEffect } from "react"
import { useContext } from "react"
import { Workflow } from "../../../contexts/WorkflowContext"


/* 
  // creo esta interface, algun dia hare todo esto dinamico o utilizando la db o vista, pero por ahora, el nro de columna estara hardcodeado
  interface IWholeWorkflow {
    // expediente columna 0
    CodigoSolicitud: number,                 //  COLUMNA 1
    EstadoExpediente: string,                 //  COLUMNA 2
    RazonSocial: string,                 //  COLUMNA 4
    IngresoRiesgo: string,                 //  COLUMNA 14
    AsignacionAnalistaRiesgo: string,                 //  COLUMNA 15
    FaltaInformacion: string,                 //  COLUMNA 16
    PrimeraFechaFaltaInformacióndeComercial: string,                 //  COLUMNA  17
    UltimaFechaReingresoaRiesgo: string,                 //  COLUMNA 18
    FinalizaciónAnálisisRiesgo: string,                 //  COLUMNA 19
    AsesorComercial: string,                 //  COLUMNA 22
    SucursalGarantizar: string,                 //  COLUMNA 23
    AnalistaRiesgo: string,                 //  COLUMNA 30
    FechaDevoluciónRiesgos: string,                 //  COLUMNA 46
    FinalizaciónAnalistaRiesgo: string,                 //  COLUMNA 47 "

    resto?: any,                 //  todas las otras columnas, dan igual por ahora
  } */


const AnalisisFullWF = ({ customSection, encabezadosShorted }) => {

  const { t } = useContext(Workflow)

  const [section, setSection] = useState(null)
  const [countByState, setCountByState] = useState(null)

  const manageSection = (secc) => {
    setSection(secc.table)
    setCountByState(secc.cantidad)
  }


  useEffect(() => {
    manageSection(t[customSection])
  }, [customSection, t])

  return (
    <div className="tabla workflowTable less">
      <h4>Cantidad {countByState}</h4>
      <h5>{customSection}</h5>
      <table>
        <thead>
          <tr>
            {
              encabezadosShorted.map(e => <th key={e}>{e}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            !section
              ? 'Esperando orden'
              : section.map((l, index) => <tr key={index}>
                {
                  Object.values(l).map((d, index) => <td key={index} > {d}</td>)
                }
              </tr>)
          }
        </tbody>
      </table>
    </div >
  )
}

export default AnalisisFullWF;