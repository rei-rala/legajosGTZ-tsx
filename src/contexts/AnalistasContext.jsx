import React, { createContext, useEffect, useState } from 'react';

import { db } from '../fbase/firebase';

export const Analistas = createContext();

export const AnalistasContext = ({ children }) => {

  const [AnalistasFB, setAnalistasFB] = useState()
  const manageAnalistas = (analistas) => setAnalistasFB(analistas);

  const [toggleRefresh, setToggleRefresh] = useState(0)
  const activateRefresh = () => setToggleRefresh(toggleRefresh + 1)

  const [busyLoadingAnalistas, setBusyLoadingAnalistas] = useState(false);
  const manageLoadState = (bool) => setBusyLoadingAnalistas(bool)

  useEffect(() => {
    manageLoadState(true)

    db.collection('analistas')
      .get().then(query => query.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      }))
      .then((analistasDB) => analistasDB.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      .then(manageAnalistas)
      .catch(console.error)
      .finally(() => {

        manageLoadState(false)
      })
  }, [toggleRefresh])

  const toggleLicencia = (idAnalista, actualmenteLicencia) => {
    const analista = AnalistasFB.find(a => a.id === idAnalista) || []

    if (window.confirm(`Desea ${actualmenteLicencia ? 'remover' : 'colocar'} licencia para ${analista.nombre}?`)) {

      db.collection('analistas').doc(idAnalista).set({
        nombre: analista.nombre,
        nivelPredefinido: analista.nivelPredefinido,
        licencia: !analista.licencia,
        tipoAnalista: analista.tipoAnalista
      })
        .then(() => {
          activateRefresh()
        })
        .catch((error) => {
          alert(`Hubo un error al actualizar:\n ${error}`);
        })
        .finally(() => {
          alert(`Licencia ${actualmenteLicencia ? 'removida' : 'colocada'} para ${analista.nombre}`)
        })

    }
  }


  return <Analistas.Provider value={{ busyLoadingAnalistas, AnalistasFB, manageAnalistas, toggleLicencia }}> {children} </Analistas.Provider>;
}