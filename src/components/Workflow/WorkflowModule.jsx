import React, { useState } from "react";

import './workflow.scss'

import FullTableWF from "./FullTableWF/FullTableWF";
import IngresarWF from "./IngresarWF/IngresarWF";
import AnalisisFullWF from "./AnalisisFullWF/AnalisisFullWF";

import { Workflow } from "../../contexts/WorkflowContext";
import { useContext } from "react";
import ResumeWF from "./ResumeWF/ResumeWF";
import { useEffect } from "react";

const WorkflowModule = () => {

  const {
    t,
    manageFullData,

    legajosFull,
    encabezadosFull,
    ingresarListado,
    encabezadosShorted,
    analisisListado

  } = useContext(Workflow)


  const [displayTableWF, setDisplayTableWF] = useState('full');
  const manageDisplayTableWF = e => setDisplayTableWF(e.target.innerText.toLowerCase());


  const normalizeField = field => {
    return field
      .replaceAll(' ' || '(' || ')', '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "")
  }


  const formAct = (e) => {
    e.preventDefault()
    const ingresoUsuarioWF = (e.target).testeo.value;
    localStorage.setItem('workflowSave', JSON.stringify(ingresoUsuarioWF))
    manageFullData(ingresoUsuarioWF)
  }

  useEffect(() => {
    const localWF = JSON.parse(localStorage.getItem('workflowSave')) || ''
    if (localWF !== '') {
      manageFullData(localWF)
    }
  }, [manageFullData])



  return (<section className='resumeSection'>

    <h4 className='subTitleWF'>Copie debajo las celdas del Workflow <u>sin duplicados por solicitud</u><br />Luego genere la tabla con el boton</h4>
    <form className='ingresoWF' onSubmit={formAct}>
      <textarea name="testeo" placeholder='Ingrese' defaultValue={JSON.parse(localStorage.getItem('workflowSave')) || ''} />
      <button>Generar tabla</button>
      {/*       <button type='reset' onClick={e => {
        localStorage.setItem('workflowSave', JSON.stringify(' '))
        manageFullData(JSON.parse(localStorage.getItem('workflowSave')))
      }}>Borrar datos</button> */}
    </form>

    {
      encabezadosFull.length === 0 && legajosFull.length === 0
        ? <> <br /> <p>Por favor, copie los datos del workflow</p></>
        :
        <div className="buttonWF">
          <button onClick={manageDisplayTableWF}> Full   </button>
          <button onClick={manageDisplayTableWF}> Ingresar   </button>
          <button onClick={manageDisplayTableWF}> Asignar   </button>
          <button onClick={manageDisplayTableWF}> Pendientes   </button>
          <button onClick={manageDisplayTableWF}> Devueltas   </button>
          <button onClick={manageDisplayTableWF}> Analisis   </button>
          <button onClick={manageDisplayTableWF}> Supervisar   </button>
          <br />
          <button onClick={manageDisplayTableWF} className='resumenBtn'> Resumen   </button>
        </div>
    }

    {

      encabezadosFull.length === 0 && legajosFull.length === 0
        ? <> <br /> <p>Por favor, copie los datos del workflow</p></>
        : displayTableWF === 'full'
          ? <FullTableWF encabezadosFull={encabezadosFull} legajosFull={legajosFull} />
          : displayTableWF === 'resumen'
            ? <ResumeWF tables={t} encabezadosShorted={encabezadosShorted} normalizeField={normalizeField} />
            : displayTableWF === 'ingresar'
              ? <IngresarWF encabezadosShorted={encabezadosShorted} ingresarListado={ingresarListado} />
              : displayTableWF !== 'full' && displayTableWF !== 'ingresarListado' && displayTableWF !== 'resumen'
                ? <AnalisisFullWF encabezadosShorted={encabezadosShorted} analisisListado={analisisListado} customSection={displayTableWF} />
                : 'ingrese seccion valida'

    }



  </section>)
}

export default WorkflowModule