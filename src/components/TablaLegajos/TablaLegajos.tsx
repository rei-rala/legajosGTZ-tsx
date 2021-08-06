import React, { useContext, useEffect, useState } from "react";
import { Legajos } from "../../contexts/LegajosContext";

import { ILegajo } from "../../interfaces/DB.interface";

import TableTHSort from "../TableTHSort/TableTHSort";

const TablaLegajos: React.FC = () => {
  const { LegajosFB, manageLegajos, quitarLegajo } = useContext(Legajos);

  const [tablaLegajos, setTablaLegajos] = useState([]);

  const [refreshState, setRefreshState] = useState(false);
  const toggleRefreshState = () => setRefreshState(!refreshState);

  useEffect(() => {
    if (LegajosFB) {
      setTablaLegajos([]);

      console.table(LegajosFB)
      setTablaLegajos(LegajosFB);
    }
  }, [LegajosFB]);

  return (
    <section>
      <div className="tablaLegajosContainer tabla">
        <table>
          <thead>
            <tr>
              {/* Opcional de ID */}
              {/* <th scope='col'>id</th> */}
              {/* Elegi los TH para usar como ordenador de la tabla, notar que para fechas muestro fecha corta y ordeno por detras por Fecha FULL */}
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"fechaIngresoFull"}
                refreshUseEffect={toggleRefreshState}
              >
                F. Ingreso
              </TableTHSort>
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"codSolicitud"}
                refreshUseEffect={toggleRefreshState}
              >
                Cod Solicitud
              </TableTHSort>
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"razonSocial"}
                refreshUseEffect={toggleRefreshState}
              >
                Razon Social
              </TableTHSort>
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"nivelLegajo"}
                refreshUseEffect={toggleRefreshState}
              >
                Nivel
              </TableTHSort>
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"fechaAsignadoFull"}
                refreshUseEffect={toggleRefreshState}
              >
                F. Asignado
              </TableTHSort>

              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"analistaAsignadoNombre"}
                refreshUseEffect={toggleRefreshState}
              >
                Analista
              </TableTHSort>
              <TableTHSort
                source={tablaLegajos}
                management={manageLegajos}
                sortParameter={"tipoAnalista"}
                refreshUseEffect={toggleRefreshState}
              >
                T.A.
              </TableTHSort>
            </tr>
          </thead>
          <tbody>
            {
              !tablaLegajos
                ? <>
                  <tr>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>Cargando</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                </>
                : <>
                  {
                    tablaLegajos.map((l: ILegajo) => (
                      <tr key={l.id}>
                        <td>{l.fechaIngresoShort}</td>
                        <td>{l.codSolicitud}</td>
                        <td>{l.razonSocial}</td>
                        <td>{l.nivelLegajo}</td>
                        <td>{l.fechaAsignadoShort}</td>
                        {
                          l.asignado ?
                            <>
                              <td>
                                <span className="nombreAnalista" title={`Click para desasignar ${l.razonSocial}`} data-idlegajo={l.id} onClick={quitarLegajo}>
                                  {l.analistaNombre}
                                </span>
                              </td>
                              <td>
                                {l.analistaTipo}
                              </td>
                            </>
                            : <>
                              <td></td>
                              <td></td>
                            </>
                        }
                      </tr>
                    ))
                  }
                </>
            }
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaLegajos;
