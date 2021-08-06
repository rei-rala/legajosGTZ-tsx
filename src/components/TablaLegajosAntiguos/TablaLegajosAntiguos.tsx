import React, { useContext, useEffect, useState } from "react";
import { Analistas } from "../../contexts/AnalistasContext";
import { Legajos } from "../../contexts/LegajosContext";

import { IAnalista, ILegajo } from "../../interfaces/DB.interface";


import TableTHSort from "../TableTHSort/TableTHSort";


const TablaLegajosAntiguos: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas);
  const { LegajosFB } = useContext(Legajos);

  const [legajosAntiguos, setLegajosAntiguos] = useState([]);

  const [refreshState, setRefreshState] = useState(false);
  const toggleRefreshState = () => setRefreshState(!refreshState);

  const getDayDifference = (compare: any) => {
    const todayValue = new Date().valueOf();
    const compareValue = new Date(compare).valueOf();


    return Math.ceil((todayValue - compareValue) / (1000 * 60 * 60 * 24));
  }

  useEffect(() => {
    if (LegajosFB) {

      // si se logro el fetch a legajos, filtro los que tengan una fecha mayor a 5 dias
      const legajosAntiguos: [] = LegajosFB.filter((l: ILegajo) => getDayDifference((l.fechaIngresoFull).toDate()) > 5)

      // a cada legajo con antiguedad mayor a 5 dias, le agrego la key de diasGR con su respectivo valor
      legajosAntiguos.forEach((l: ILegajo) => l.diasGR = getDayDifference((l.fechaIngresoFull).toDate()))

      setLegajosAntiguos(legajosAntiguos)
    }
  }, [LegajosFB])

  return (
    <section>
      {
        !legajosAntiguos
          ? <h3>No hay legajos con mas de 5 dias</h3>
          : <>
            <h3>Legajos con mas de 5 dias</h3>
            <div className="tablaLegajosAntiguosContainer">
              <table>
                <thead>
                  <tr>
                    <TableTHSort source={legajosAntiguos} sortParameter={'fechaIngresoFull'} refreshUseEffect={toggleRefreshState} management={setLegajosAntiguos}>Fecha de ingreso</TableTHSort>
                    <th scope='col'>Razon Social</th>
                    <th scope='col'>Nivel Legajo</th>
                    <th scope='col'>Dias en GR</th>
                    <th scope='col'>th 5</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    legajosAntiguos.map((l: ILegajo) => <tr key={l.id}>
                      <td>
                        {l.fechaIngresoShort}
                      </td>
                      <td>
                        {l.razonSocial}
                      </td>
                      <td>
                        {l.nivelLegajo}
                      </td>
                      <td>{l.diasGR}</td>
                      <td></td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </>
      }
    </section>
  );
};

export default TablaLegajosAntiguos;
