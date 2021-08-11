import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import TableTHSort from "../../TableTHSort/TableTHSort";

const ResumeWF = ({ encabezadosShorted, tables, normalizeField }) => {


  //console.table((Object.entries(tables)))
  const [encabezadosLeast, setEncabezadosLeast] = useState();
  const manageEncabezadosLeast = (encabezados) => setEncabezadosLeast(encabezados)

  const [cantIngresosDia, setCantIngresosDia] = useState(-1);
  const manageCantIngresosDia = (cant) => setCantIngresosDia(cant);

  const [supTardios, setSupTardios] = useState(null)
  const manageSupTardios = (supervision) => setSupTardios(supervision)

  const [anaTardios, setAnaTardios] = useState(null)
  const manageAnaTardios = (analisis) => setAnaTardios(analisis)

  const [filter, setFilter] = useState({ fecha: new Date().toISOString().slice(0, 10), dias: 5 })
  const manageFilter = (date, days) => setFilter({ fecha: date, dias: days })

  const [refresh, setRefresh] = useState(0);
  const toggleRefresh = () => setRefresh(refresh + 1)

  const [sortRefresh, setSortResfresh] = useState(0)
  const refreshBySort = () => setSortResfresh(sortRefresh + 1)

  const manageMainFilter = (e) => {
    e.preventDefault();

    const dateInput = (e.target.dateCalc).value
    const filterDate = new Date(dateInput)
    const filterDays = parseInt((e.target.filterDays).value);

    if (filter.fecha !== filterDate || filter.dias !== filterDays) {
      manageFilter(filterDate, filterDays)
      toggleRefresh()
      e.target.dateCalc.value = dateInput;
    }
  }



  useEffect(() => {
    const fieldsByRow = () => {
      const properties = [];
      // extraigo las propiedades que quiero
      for (let prop in encabezadosShorted) {

        if (['Razón Social', 'Asesor Comercial', 'Analista Riesgo'].includes(encabezadosShorted[prop])) {
          properties.push(encabezadosShorted[prop])
        }
      }

      return properties
    }

    if (encabezadosShorted) manageEncabezadosLeast(fieldsByRow())
  }, [encabezadosShorted])

  useEffect(() => {
    if (tables) {

      const d = new Date(filter.fecha);
      const dateInputWF = (
        `${d.getDate() < 9 ? '0' + (d.getDate() + 1) : (d.getDate() + 1)}/${d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)}/${d.getFullYear()}`
      )
      manageCantIngresosDia(
        (tables['base'].table).filter(a => a.IngresoRiesgo === dateInputWF).length
      )


      const listaAnaTardios = [];
      (tables.analisis.table).forEach(leg => {
        const fechaIngreso = new Date(
          leg.IngresoRiesgo.substr(6, 4),
          leg.IngresoRiesgo.substr(3, 2) - 1,
          leg.IngresoRiesgo.substr(0, 2),
          0, 0, 0
        )

        let diasPendiente = 1;
        if (leg.UltimaFechaReingresoaRiesgo !== ' ') {
          const entraPendiente = new Date(leg.PrimeraFechaFaltaInformaciondeComercial.substr(6, 4), leg.PrimeraFechaFaltaInformaciondeComercial.substr(3, 2) - 1, leg.PrimeraFechaFaltaInformaciondeComercial.substr(0, 2) - 1)
          const salePendiente = new Date(leg.UltimaFechaReingresoaRiesgo.substr(6, 4), leg.UltimaFechaReingresoaRiesgo.substr(3, 2) - 1, leg.UltimaFechaReingresoaRiesgo.substr(0, 2) - 1)

          diasPendiente = Math.ceil((salePendiente - entraPendiente) / (1000 * 3600 * 24))
          console.log(leg.PrimeraFechaFaltaInformaciondeComercial)
        }


        const diff = Math.ceil(((new Date(filter.fecha) - fechaIngreso) / (1000 * 3600 * 24)) - diasPendiente);

        if (diff > filter.dias) {
          //console.info(`${ leg.RazonSocial } \n${ new Date() } \n - \n${ fechaIngreso } \n = ${ diff } `)
          listaAnaTardios.push({ ...leg, diasGR: diff })
        }
      })
      manageAnaTardios(listaAnaTardios)


      const listaSupTardios = [];
      (tables.supervisar.table).forEach(leg => {
        const fechaIngreso = new Date(
          leg.IngresoRiesgo.substr(6, 4),
          leg.IngresoRiesgo.substr(3, 2) - 1,
          leg.IngresoRiesgo.substr(0, 2),
          0, 0, 0
        )

        let diasPendiente = 1;
        if (leg.UltimaFechaReingresoaRiesgo !== ' ') {
          const entraPendiente = new Date(leg.PrimeraFechaFaltaInformaciondeComercial.substr(6, 4), leg.PrimeraFechaFaltaInformaciondeComercial.substr(3, 2) - 1, leg.PrimeraFechaFaltaInformaciondeComercial.substr(0, 2), 0, 0, 0)
          const salePendiente = new Date(leg.UltimaFechaReingresoaRiesgo.substr(6, 4), leg.UltimaFechaReingresoaRiesgo.substr(3, 2) - 1, leg.UltimaFechaReingresoaRiesgo.substr(0, 2), 0, 0, 0)

          diasPendiente = Math.ceil((salePendiente - entraPendiente) / (1000 * 3600 * 24))
        }
        const fechaFinalizado = new Date(
          leg.FinalizacionAnalistaRiesgo.substr(6, 4),
          leg.FinalizacionAnalistaRiesgo.substr(3, 2) - 1,
          leg.FinalizacionAnalistaRiesgo.substr(0, 2),
          0, 0, 0
        )

        const diff = Math.ceil(((new Date(filter.fecha) - fechaIngreso) / (1000 * 3600 * 24))) - diasPendiente;
        const diffSupervision = Math.ceil(((new Date(filter.fecha) - fechaFinalizado) / (1000 * 3600 * 24)))

        if (diff > filter.dias) {
          listaSupTardios.push({ ...leg, diasGR: diff, diasSupervision: diffSupervision })
        }
      })
      manageSupTardios(listaSupTardios)
    }
  }, [tables, filter, refresh])

  useEffect(() => {
  }, [sortRefresh])

  return (
    <>
      <div className="tabla workflowTable mini less">
        <h5>Resumen del Workflow</h5>

        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Legajos</th>
            </tr>
          </thead>
          <tbody className='resume'>
            <>
              {
                !tables
                  ? null
                  : <>
                    {
                      (Object.entries(tables)).map((t, index) => (
                        t[0] === 'devueltas' || t[0] === 'base'
                          ? null
                          :
                          <tr key={index}>
                            <th scope='row'>{t[0]}</th>
                            <td>{tables[t[0]].cantidad}</td>
                          </tr>)
                      )
                    }
                  </>
              }
            </>
          </tbody>
        </table>
      </div>

      <div className="leyendaResumenes">
        <p className='leyendaGR'>
          Contamos con
          <span className='cantidadLegajosGR'>
            {
              tables
                ? (Object.entries(tables)).reduce((total, legajos) => {
                  if (legajos[0] !== 'ingresar' && legajos[0] !== 'devueltas' && legajos[0] !== 'base') { return total + legajos[1].cantidad }
                  else return total
                }, 0)
                : 'Se produjo un error'
            }
          </span>
          legajos en riesgos.
        </p>
        <p>
          En el <span title={filter.fecha} className='diaInfo'> dia</span> hubo {tables ? cantIngresosDia : 'ERROR'} ingresos
        </p>

      </div>

      <form onSubmit={manageMainFilter} className='fullWidth'>
        <div>
          <label htmlFor="fechaCalculo">Fecha calculo</label>
          <input type="date" name="dateCalc" id="fechaCalculo" defaultValue={filter.fecha} required />
        </div>
        <div>
          <label htmlFor="diasCalculo">Legajos mayores a</label>
          <input type="number" name="filterDays" id="diasCalculo" defaultValue={filter.dias} required /> <span>dias</span>
        </div>

        <button>Filtrar</button>
        <button type='reset' onClick={() => {
          manageFilter(new Date().toISOString().slice(0, 10), 5)
          toggleRefresh()
        }}>Reset</button>
      </form>

      <div className="tabla less">
        <h6>Supervision</h6>

        <table>
          <thead>
            <tr>
              {
                !encabezadosLeast
                  ? null
                  : [/* 'Asignación Analista Riesgo', */ 'dias GR', 'dias Supervision', ...encabezadosLeast].map((l, index) => <TableTHSort
                    key={index}
                    source={supTardios}
                    sortParameter={normalizeField(l)}
                    management={manageSupTardios}
                    refreshUseEffect={refreshBySort}
                  >
                    {l}
                  </TableTHSort>

                  )
              }
            </tr>
          </thead>
          <tbody>
            {
              !supTardios
                ? null
                : supTardios.map((sup, index) => <tr key={index}>

                  {
                    [/* 'Asignación Analista Riesgo', */ 'dias GR', 'dias Supervision', ...encabezadosLeast].map((e, index) => <td key={index}>
                      {sup[normalizeField(e)]}
                    </td>)
                  }

                </tr>)
            }
          </tbody>
        </table>
      </div>


      <div className="tabla less">
        <h6>Analisis</h6>

        <table>
          <thead>
            <tr>
              {
                !encabezadosLeast
                  ? null
                  : [/* 'Asignación Analista Riesgo', */ 'dias GR', ...encabezadosLeast].map((e, index) => <TableTHSort
                    key={index}
                    source={anaTardios}
                    sortParameter={normalizeField(e)}
                    management={manageAnaTardios}
                    refreshUseEffect={refreshBySort}
                  >
                    {e}
                  </TableTHSort>
                  )
              }
            </tr>
          </thead>
          <tbody>
            {
              !anaTardios
                ? null
                : anaTardios.map((a, index) => <tr key={index}>

                  {
                    [/* 'Asignación Analista Riesgo', */ 'diasGR', ...encabezadosLeast].map((e, index) => <td key={index}>
                      {a[normalizeField(e)]}
                    </td>)
                  }

                </tr>)
            }
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ResumeWF;