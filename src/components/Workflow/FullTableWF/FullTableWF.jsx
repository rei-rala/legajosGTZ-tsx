import React from "react";


const FullTableWF = ({ encabezadosFull, legajosFull }) => {

  return (
    <div className="tabla workflowTable">
      <h5>Workflow completo</h5>
      <table>
        <thead>
          <tr>
            {
              !encabezadosFull
                ? <th>Ingrese algo antes</th>
                : encabezadosFull.map((e, index) => <th scope='col' key={index}>{e}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            !legajosFull
              ? <tr><th>Ingrese Valor valido</th></tr>
              : legajosFull.map((line, index) => <tr key={index}
              >
                {
                  line
                    .map((x, index) => <td key={index}>{x}</td>)
                }
              </tr>)
          }
        </tbody>
      </table>
    </div>)
}

export default FullTableWF;