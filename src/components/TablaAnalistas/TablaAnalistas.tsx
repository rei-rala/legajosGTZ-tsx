import React, { useContext, useEffect, useState } from "react";
import { Analistas } from "../../contexts/AnalistasContext";
import { Legajos } from "../../contexts/LegajosContext";

import { IAnalista, ILegajo } from "../../interfaces/DB.interface";
import TableTHSort from "../TableTHSort/TableTHSort";

import "./tablaAnalistas.scss";

const TablaAnalistas: React.FC = () => {
  const { AnalistasFB, toggleLicencia } = useContext(Analistas);
  const { LegajosFB } = useContext(Legajos);

  const [tablaAnalistas, setTablaAnalistas] = useState([]);
  const manageTablaAnalistas = setTablaAnalistas;

  const [refreshState, setRefreshState] = useState(false);
  const toggleRefreshState = () => setRefreshState(!refreshState);

  useEffect(() => {
    if (AnalistasFB) {
      setTablaAnalistas([]);
      setTablaAnalistas(AnalistasFB);
    }
  }, [AnalistasFB]);

  return (
    <section>
      <div className="tablaAnalistasContainer">
        <table>
          <thead>
            <tr>
              {/* Opcional de ID */}
              {/* <th scope='col'>id</th> */}
              <TableTHSort
                source={AnalistasFB}
                sortParameter={"nombre"}
                management={manageTablaAnalistas}
                refreshUseEffect={toggleRefreshState}
              >
                Nombre
              </TableTHSort>
              <TableTHSort
                source={AnalistasFB}
                sortParameter={"nivelPredefinido"}
                management={manageTablaAnalistas}
                refreshUseEffect={toggleRefreshState}
              >
                Nivel
              </TableTHSort>
              <TableTHSort
                source={AnalistasFB}
                sortParameter={"licencia"}
                management={manageTablaAnalistas}
                refreshUseEffect={toggleRefreshState}
              >
                Licencia
              </TableTHSort>
              <th scope="col">Cant. Legajos</th>
            </tr>
          </thead>
          <tbody>
            {!tablaAnalistas ? (
              <tr>
                <td>&nbsp;</td>
                <td>Cargando</td>
                <td>&nbsp;</td>
              </tr>
            ) : (
              <>
                {tablaAnalistas.map((a: IAnalista) => (
                  <tr key={a.id}>
                    {/* Opcional de ID */}
                    {/* <td>{a.id}</td> */}
                    <td
                      onClick={() => toggleLicencia(a.id, a.licencia)}
                      className="toggleLicencia"
                      title={`Click para cambiar licencia para ${a.nombre}`}
                    >
                      {a.nombre}
                    </td>
                    <td>{a.nivelPredefinido}</td>
                    <td>{a.licencia ? "Si" : ""}</td>
                    <td>
                      {!LegajosFB
                        ? "Cargando"
                        : LegajosFB.reduce(
                            (TotalLegajos: number, Legajo: ILegajo) => {
                              return (
                                TotalLegajos +
                                (Legajo.analistaAsignadoId === a.id ? 1 : 0)
                              );
                            },
                            0
                          )}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TablaAnalistas;
