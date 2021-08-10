import React from "react"

const IngresarWF = ({ encabezadosShorted, ingresarListado }) => {

  // Si, esta no es una manera optima de logar una row con data por cada legajo.
  const fieldsByRow = (row) => {
    const properties = [];

    // extraigo las propiedades de solo la primera row de datos
    for (let prop in row[0]) {
      properties.push(prop)
    }
    return properties
  }

  return (
    <div className="tabla workflowTable less">
      <h5>Para ingresar</h5>
      <table>
        <thead>
          <tr>
            {
              !encabezadosShorted
                ? <th>Ingrese algo antes</th>
                : encabezadosShorted.map((e, index) => <th scope='col' key={index}>{e}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            !ingresarListado
              ? <tr><th>Ingrese Valor valido</th></tr>
              : ingresarListado.map((line, index) => <tr key={index}>
                {fieldsByRow(ingresarListado).map((f, index) => <td key={index}>{line[f]}</td>)}
              </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default IngresarWF;