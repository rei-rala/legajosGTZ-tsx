import React, { createContext, useEffect, useState } from 'react';

import { db } from '../fbase/firebase';

export const Analistas = createContext();

export const AnalistasContext = ({ children }) => {
  const [AnalistasFB, setAnalistasFB] = useState(null)
  const manageAnalistas = arrayAnalistas => setAnalistasFB(arrayAnalistas);

  useEffect(() => {
    db.collection('analistas')
      .get().then(query => query.docs.map(doc => {
        return { id: doc.id, ...doc.data() }
      }))
      .then(analistasDB => analistasDB.sort((a, b) => a.nombre.localeCompare(b.nombre)))
      .then(manageAnalistas)
      .catch(console.error)
  }, [])

  /*   useEffect(() => {
      if (AnalistasFB) { console.table(AnalistasFB) }
      else { console.info('Obteniendo info sobre analistas') }
    }, [AnalistasFB]) */


  return <Analistas.Provider value={{ AnalistasFB, manageAnalistas }}> {children} </Analistas.Provider>;
}