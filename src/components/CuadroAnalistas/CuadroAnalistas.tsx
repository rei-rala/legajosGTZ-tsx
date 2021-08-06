import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Analistas } from "../../contexts/AnalistasContext";
import { Legajos } from "../../contexts/LegajosContext";

import { IAnalista, ILegajo } from "../../interfaces/DB.interface";

import "./cuadroAnalistas.scss";
import EmpresaCuadroAnalista from "./EmpresaCuadroAnalista/EmpresaCuadroAnalista";

const CuadroAnalistas: React.FC = () => {
  const { AnalistasFB } = useContext(Analistas);
  const { LegajosFB } = useContext(Legajos);

  const [mostrarAusencias, setMostrarAusencias] = useState(false);
  const manageAusencias = () => {
    setMostrarAusencias(!mostrarAusencias)
    localStorage.setItem('gtzOctultarAusencias', JSON.stringify(!mostrarAusencias))
  };

  useEffect(() => {
    const ls = (localStorage.getItem('gtzOctultarAusencias') || 'nada')

    if (ls !== 'nada') {
      const boolLs: boolean = JSON.parse(ls)

      if (mostrarAusencias !== boolLs) {
        setMostrarAusencias(boolLs)
      }
    }

  }, [mostrarAusencias])

  return (
    <section className="vistaCuadroAnalista">
      <div className="titleContainer">
        <h3>Vista de analistas por cuadros</h3>
        {
          !AnalistasFB
            ? "Aguarde"
            : (
              AnalistasFB.find((a: IAnalista) => a.licencia === true)
                ? <button onClick={manageAusencias}>{mostrarAusencias ? "Mostrar" : "Ocultar"} ausentes </button>
                : null
            )
        }
      </div>

      <hr />

      <div className="cuadroAnalistasContainer">
        {!AnalistasFB ? (
          "Cargando..."
        ) : (
          <>
            {AnalistasFB.map((a: IAnalista) => (
              <div
                className={`cuadroIndividual ${mostrarAusencias && a.licencia
                  ? "cuadroOcultar"
                  : a.licencia
                    ? "conLicencia"
                    : ""
                  }`}
                key={a.id}
              >
                <h4>{a.nombre}</h4>
                <ul>
                  {!LegajosFB
                    ? "Cargando"
                    : LegajosFB.map((l: ILegajo) => (
                      <EmpresaCuadroAnalista
                        key={l.id}
                        idAnalista={a.id}
                        idAsignado={l.analistaAsignadoId}
                        razonSocial={l.razonSocial}
                      />
                    ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default CuadroAnalistas;
