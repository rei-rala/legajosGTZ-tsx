import React, { useContext, useEffect, useState } from "react";
import { Legajos } from "../../contexts/LegajosContext";

import { ILegajo } from "../../interfaces/DB.interface";


import TableTHSort from "../TableTHSort/TableTHSort";


const TablaLegajosAntiguos: React.FC = () => {
  const { LegajosFB } = useContext(Legajos);

  const [legajosAntiguos, setLegajosAntiguos] = useState([]);
  const manageLegajosAntiguos = (legAntiguos: any) => setLegajosAntiguos(legAntiguos)

  const [refreshState, setRefreshState] = useState(0);
  const toggleRefreshState = () => setRefreshState(refreshState + 1);

  useEffect(() => {
    if (LegajosFB) {
      const antiguos = LegajosFB.filter((l: ILegajo) => (l.diasGR ? l.diasGR >= 5 : false))

      if (antiguos.length !== legajosAntiguos.length) {
        setLegajosAntiguos([])
        setLegajosAntiguos(antiguos)
      }
    }
  }, [LegajosFB, setLegajosAntiguos, refreshState, legajosAntiguos.length])


  return (
    <section>
      <div>
        {
          !legajosAntiguos
            ? <h3>No hay legajos con mas de 5 dias</h3>
            : <>
              <h3>Legajos con mas de 5 dias</h3>
              <div className="tablaLegajosAntiguosContainer tabla">
                <table>
                  <thead>
                    <tr>
                      <TableTHSort source={legajosAntiguos} sortParameter={'fechaIngresoFull'} refreshUseEffect={toggleRefreshState} management={manageLegajosAntiguos}>Ingreso</TableTHSort>
                      <TableTHSort source={legajosAntiguos} sortParameter={'razonSocial'} refreshUseEffect={toggleRefreshState} management={manageLegajosAntiguos}>Razon Social</TableTHSort>
                      <TableTHSort source={legajosAntiguos} sortParameter={'nivelLegajo'} refreshUseEffect={toggleRefreshState} management={manageLegajosAntiguos}>Nivel</TableTHSort>
                      <TableTHSort source={legajosAntiguos} sortParameter={'diasGR'} refreshUseEffect={toggleRefreshState} management={manageLegajosAntiguos}>Dias GR</TableTHSort>
                      <TableTHSort source={legajosAntiguos} sortParameter={'diasAsignado'} refreshUseEffect={toggleRefreshState} management={manageLegajosAntiguos}>D. Asignado</TableTHSort>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      legajosAntiguos.map((l: ILegajo) => <tr key={l.id}>
                        <td>{l.fechaIngresoShort}</td>
                        <td>{l.razonSocial}</td>
                        <td>{l.nivelLegajo}</td>
                        <td>{l.diasGR}</td>
                        <td>{l.diasAsignado === -999 ? 'No asignado' : l.diasAsignado}</td>
                      </tr>)
                    }
                  </tbody>
                </table>
              </div>
            </>
        }
      </div>
    </section>
  );
};

export default TablaLegajosAntiguos;
