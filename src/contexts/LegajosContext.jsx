import React, { createContext, useEffect, useState } from 'react';

import { db } from '../fbase/firebase';

export const Legajos = createContext();

export const LegajosContext = ({ children }) => {
  const [LegajosFB, setLegajosFB] = useState(null)
  const manageLegajos = arrayLegajos => setLegajosFB(arrayLegajos);

  const [toggleRefresh, setToggleRefresh] = useState(false)
  const activateRefresh = () => setToggleRefresh(!toggleRefresh)


  const asignarLegajo = (idLegajo, idAnalista) => {
    const fullDate = new Date();
    const shortDate = `${fullDate.getDate()}/${fullDate.getMonth() + 1}/${fullDate.getFullYear()}`
    const legajoAsignado = LegajosFB.find(l => l.id === idLegajo);

    db.collection('legajos').doc(idLegajo).set({
      analistaAsignadoId: idAnalista,
      asignado: true,
      codSolicitud: legajoAsignado.codSolicitud,
      estado: 'asignado',
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
        console.error("Error writing document: ", error);
      });
  }

  const quitarLegajo = (e) => {
    if (!e.target.innerText) { return console.warn('No esta asignado') }

    const idLegajo = e.target.dataset.idlegajo
    const legajoAsignado = LegajosFB.find(l => l.id === idLegajo);

    if (window.confirm(`Desea desasignar la solicitud ${legajoAsignado.codSolicitud} de ${legajoAsignado.razonSocial}`)) {

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
        });
    }
  }

  useEffect(() => {
    if (toggleRefresh || !toggleRefresh) { console.info('Fetch de analistas') }

    db.collection('legajos')
      .get().then(query => query.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }))
      .then(manageLegajos)
      .catch(console.error)
  }, [toggleRefresh])


  useEffect(() => {
    if (LegajosFB) { setLegajosFB([]); console.table(LegajosFB); setLegajosFB(LegajosFB) }
    else { console.info('Obteniendo info sobre legajos') }
  }, [LegajosFB])


  return <Legajos.Provider value={{ LegajosFB, manageLegajos, asignarLegajo, quitarLegajo }}> {children} </Legajos.Provider>;
}