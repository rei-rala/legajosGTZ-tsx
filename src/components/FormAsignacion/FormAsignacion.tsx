import React, { useContext } from 'react'
import { Analistas } from '../../contexts/AnalistasContext'
import { Legajos } from '../../contexts/LegajosContext'

import { IAnalista, ILegajo} from '../../interfaces/DB.interface'
import OptionAsignacion from './OptionAsignacion/OptionAsignacion'

import './formAsignacion.scss'

const FormAsignacion: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas)
  const { LegajosFB } = useContext(Legajos)
  
  return (<div className="asignacionContainer">
    
    <h3>Asignacion de legajo</h3>
    <hr />

    <form onSubmit={e => e.preventDefault()}>
      <div className="group">
        <label htmlFor="legajoSelect"></label>
        <select name="legajo" id="legajoSelect" required>
          <option value=""> Seleccione legajo</option>
          <optgroup label="Empresa">
            {
              !LegajosFB
                ? <option>Cargando</option>
                : LegajosFB
                    .sort((x:ILegajo, y:ILegajo)=> x.razonSocial.localeCompare(y.razonSocial))
                    .map((l:ILegajo) => {
                      return <OptionAsignacion
                        key={l.id}
                        valor={l.codSolicitud}
                        validacion={!l.asignado}
                      >
                        {l.razonSocial}
                      </OptionAsignacion>
                    })
            }
            </optgroup>
        </select>
      </div>

      <div className="group">
        <label htmlFor="analistaSelect"></label>
        <select name="analista" id="analistaSelect" required>
        <option value=""> Seleccione analista</option>
          <optgroup label="Disponibles">
            {
              !AnalistasFB
                ? <option value=''>Cargando</option>
                : AnalistasFB
                  .sort((x:IAnalista, y:IAnalista)=> x.nombre.localeCompare(y.nombre))
                  .map((a:IAnalista) => {
                    return <OptionAsignacion
                      key={a.id}
                      valor={a.id}
                      validacion={!a.licencia}
                    >
                      {a.nombre}
                    </OptionAsignacion>
                  })
            }
          </optgroup>
          <optgroup label="De licencia">
            {
              !AnalistasFB
              ? <option value=''>Cargando</option>
              : AnalistasFB.map((a:IAnalista) => {
                return <OptionAsignacion
                  key={a.id}
                  valor={a.id}
                  validacion={a.licencia}
                >
                  {a.nombre}
                </OptionAsignacion>
              })
            }
          </optgroup>
        </select>
      </div>

      <button>Asignar</button> 
    </form>
  </div> )
}


export default FormAsignacion;