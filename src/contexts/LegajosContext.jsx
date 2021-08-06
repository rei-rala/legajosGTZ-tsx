import React, { createContext, useEffect, useState, useContext } from 'react';

import { db } from '../fbase/firebase';
import { Analistas } from './AnalistasContext';


export const Legajos = createContext();

export const LegajosContext = ({ children }) => {
  const { AnalistasFB } = useContext(Analistas)

  const [LegajosFB, setLegajosFB] = useState(null)
  const manageLegajos = arrayLegajos => setLegajosFB(arrayLegajos);

  const [toggleRefresh, setToggleRefresh] = useState(0)
  const activateRefresh = () => setToggleRefresh(toggleRefresh + 1)

  const [legajosUpgrade, setAnalistasUpgrade] = useState(null)

  const [busyLoadingLegajos, setBusyLoadingLegajos] = useState(false);
  const manageLoadState = (boolean) => setBusyLoadingLegajos(boolean)

  const asignarLegajo = (idLegajo, idAnalista) => {

    const fullDate = new Date();
    const shortDate = `${fullDate.getDate()}/${fullDate.getMonth() + 1}/${fullDate.getFullYear()}`
    const legajoAsignado = LegajosFB.find(l => l.id === idLegajo);


    manageLoadState(true)

    // La documentacion de firestore dice que si existe el documento apuntado en un set, que podriamos enviar solo los campos a modificar, pero no fue asi segun mis pruebas, por ello es que envio el objeto completo.
    db.collection('legajos').doc(idLegajo).set({
      analistaAsignadoId: idAnalista,
      asignado: true,
      codSolicitud: legajoAsignado.codSolicitud,
      estado: 'Asignado',
      fechaAsignadoFull: fullDate,
      fechaAsignadoShort: shortDate,
      fechaIngresoFull: legajoAsignado.fechaIngresoFull,
      fechaIngresoShort: legajoAsignado.fechaIngresoShort,
      nivelLegajo: legajoAsignado.nivelLegajo,
      razonSocial: legajoAsignado.razonSocial
    })
      .then(() => {
        console.log("Document successfully written!");
        activateRefresh()
      })
      .catch((error) => {
        alert("Hubo un error al actualizar:\n", error);
      })
      .finally(() => {
        manageLoadState(false)
      })
  }

  const quitarLegajo = (e) => {
    if (!e.target.innerText) { return console.warn('No esta asignado') }

    const idLegajo = e.target.dataset.idlegajo
    const legajoAsignado = LegajosFB.find(l => l.id === idLegajo);

    if (window.confirm(`Desea desasignar la solicitud ${legajoAsignado.codSolicitud} de ${legajoAsignado.razonSocial}`)) {

      manageLoadState(true)
      db.collection('legajos').doc(idLegajo).set({
        analistaAsignadoId: '',
        asignado: false,
        codSolicitud: legajoAsignado.codSolicitud,
        estado: 'Sin asignar',
        fechaAsignadoFull: null,
        fechaAsignadoShort: null,
        fechaIngresoFull: legajoAsignado.fechaIngresoFull,
        fechaIngresoShort: legajoAsignado.fechaIngresoShort,
        nivelLegajo: legajoAsignado.nivelLegajo,
        razonSocial: legajoAsignado.razonSocial
      })
        .then(() => {
          console.log("Document successfully written!");
          activateRefresh()
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        })
        .finally(() => {
          manageLoadState(false)
        })
    }
  }

  useEffect(() => {
    if (toggleRefresh) { console.info('Fetch de analistas') }

    db.collection('legajos')
      .get().then(query => query.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }))
      .then(manageLegajos)
      .catch(console.error)
  }, [toggleRefresh])


  useEffect(() => {
    if (LegajosFB && legajosUpgrade) {
      setLegajosFB([]);
      /* console.table(LegajosFB); */
      setLegajosFB(LegajosFB)
    }
    else { console.info('Obteniendo info sobre legajos') }
  }, [LegajosFB, legajosUpgrade])


  useEffect(() => {
    //console.info(LegajosFB, AnalistasFB)
    const getDayDifference = (compare) => {
      const todayValue = new Date().valueOf();
      const compareValue = new Date(compare).valueOf();

      return Math.ceil((todayValue - compareValue) / (1000 * 60 * 60 * 24));
    }

    if (LegajosFB && AnalistasFB) {
      const upgradedLegajos = LegajosFB;
      upgradedLegajos.forEach(l => {
        if (l.asignado) {
          l.analistaNombre = (AnalistasFB.find(a => a.id === l.analistaAsignadoId).nombre);
          l.analistaTipo = (AnalistasFB.find(a => a.id === l.analistaAsignadoId).tipoAnalista);
        }
        l.diasAsignado = (l.fechaAsignadoFull ? getDayDifference((l.fechaAsignadoFull).toDate()) : -999);
        l.diasGR = getDayDifference((l.fechaIngresoFull).toDate())
      })
      setAnalistasUpgrade(upgradedLegajos)
    }
  }, [LegajosFB, AnalistasFB])


  return <Legajos.Provider value={{ busyLoadingLegajos, LegajosFB, manageLegajos, asignarLegajo, quitarLegajo }}>
    {children}
  </Legajos.Provider>;
}