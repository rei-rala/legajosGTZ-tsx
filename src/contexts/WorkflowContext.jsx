import React, { createContext, useEffect, useState } from 'react';


export const Workflow = createContext();

export const WorkflowContext = ({ children }) => {

  const [fullData, setFullData] = useState([]);
  const manageFullData = (data) => setFullData(data)

  const [encabezadosFull, setEncabezadosFull] = useState([]);
  const manageEncabezadosFull = (encab) => setEncabezadosFull(encab);
  const [legajosFull, setLegajosFull] = useState([]);
  const manageLegajosFull = (data) => setLegajosFull(data)

  const [encabezadosShorted, setEncabezadosShorted] = useState([]);
  const manageEncabezadosShorted = (encab) => setEncabezadosShorted(encab)

  const [ingresarListado, setIngresarListado] = useState([]);
  const manageIngresarListado = (ingListado) => setIngresarListado(ingListado)

  const [analisisListado, setAnalisisListado] = useState([]);
  const manageAnalisisListado = (anaListado) => setAnalisisListado(anaListado)

  const [t, setT] = useState({})
  const manageT = (obj) => {
    setT(obj)
    // console.table(obj)
  }

  useEffect(() => {
    if (fullData.length) {
      const TEMP = fullData.split('\n')

      const headers = TEMP.shift().split('\t')
      const legajos = TEMP.map(legajo => legajo.split('\t'))

      manageEncabezadosFull(headers);
      manageLegajosFull(legajos)
    }
  }, [fullData])


  useEffect(() => {
    if (encabezadosFull.length && legajosFull.length) {
      // Hardcodeado AF
      const indexesWorkflow = [1, 2, 4, 14, 15, 16, 17, 18, 19, 22, 23, 30, 46, 47]
      manageEncabezadosShorted(encabezadosFull.filter(e => indexesWorkflow.includes(encabezadosFull.indexOf(e))))


      const normalizeField = field => {
        return field
          .replaceAll(' ' || '(' || ')', '')
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, "")
      }

      const genByState = (estado) => {
        const colDescription = encabezadosFull.map(e => normalizeField(e))
        let rowsLegajosShort = [];
        for (let i = 0; i < legajosFull.length; i++) {
          const row = {}
          if (legajosFull[i][2] === estado) {
            for (let j = 0; j < legajosFull[i].length; j++) {
              if (indexesWorkflow.includes(j)) {
                row[colDescription[j]] = legajosFull[i][j].replace(/\s\s+/g, ' ');
              }
            }

            rowsLegajosShort.push(row)
            /* 
            // ? Hice este aproach para omitir los duplicados por CodigoSolicitud
            rowsLegajosShort.forEach(l => {
              if (l.CodigoSolicitud !== row.CodigoSolicitud)
                rowsLegajosShort.push(row)
            })
            console.table(row.CodigoSolicitud)
            */
          }
        }
        return rowsLegajosShort
      }

      const ingList = genByState('Solicitud - Documentación Pendiente de Aprobación')
      const anList = genByState('Análisis de Bastanteo/Riesgos')

      manageIngresarListado(ingList)
      manageAnalisisListado(anList)
      //console.table(genByState('Análisis de Bastanteo/Riesgos'))
    }
  }, [encabezadosFull, legajosFull])

  useEffect(() => {
    if (analisisListado.length && ingresarListado.length) {
      // validacion contra estado finalizado por riesgos pendiente por UTB.
      const base = analisisListado.filter(a => a.FinalizacionAnalisisRiesgo === " ")

      //console.info(analisisListado)
      const asignarTable = base.filter(a => (
        a.AnalistaRiesgo === ''
        || a.AsignacionAnalistaRiesgo === ' '
      ))

      const pendientesTable = base.filter(a => (
        a.FaltaInformacion === 'Si'
        && a.FechaDevolucionRiesgos === ''
      ))

      const devueltasTable = base.filter(a => (
        a.FechaDevolucionRiesgos !== ''
      ))

      const analisisTable = base.filter(a => (
        a.AnalistaRiesgo !== ''
        && a.FechaDevolucionRiesgos === ''
        && a.FaltaInformacion !== 'Si'
        && (a.FinalizacionAnalistaRiesgo) === ''
      ))

      const supervisarTable = base.filter(a => (
        a.AnalistaRiesgo !== ''
        && a.FechaDevolucionRiesgos === ''
        && a.FaltaInformacion !== 'Si'
        && (a.FinalizacionAnalistaRiesgo) !== ''
      ))

      manageT({
        base: {
          table: base,
          cantidad: base.length,
        },
        ingresar: {
          table: ingresarListado,
          cantidad: ingresarListado.length,
        },
        asignar: {
          table: asignarTable,
          cantidad: asignarTable.length,
        },
        pendientes: {
          table: pendientesTable,
          cantidad: pendientesTable.length,
        },
        devueltas: {
          table: devueltasTable,
          cantidad: devueltasTable.length,
        },
        analisis: {
          table: analisisTable,
          cantidad: analisisTable.length,
        },
        supervisar: {
          table: supervisarTable,
          cantidad: supervisarTable.length
        },
      })
    }
  }, [analisisListado, ingresarListado])

  return <Workflow.Provider value={{
    manageFullData,

    encabezadosFull, manageEncabezadosFull,
    legajosFull,

    encabezadosShorted,
    ingresarListado,
    analisisListado,
    t

  }}> {children} </Workflow.Provider>;
}