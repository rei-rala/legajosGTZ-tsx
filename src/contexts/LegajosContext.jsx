import React, { createContext, useEffect, useState } from 'react';

import { db } from '../fbase/firebase';

export const Legajos = createContext();

export const LegajosContext = ({ children }) => {
  const [LegajosFB, setLegajosFB] = useState(null)
  const manageLegajosFirebase = arrayLegajos => setLegajosFB(arrayLegajos);

  useEffect(() => {
    console.info('Fetch de analistas')

    db.collection('legajos')
      .get().then(query => query.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
      }))
      .then(manageLegajosFirebase)
      .catch(console.error)
  }, [])

  //? DEBUG
  /* 
    useEffect(() => {
      if (LegajosFB) { console.table(LegajosFB) }
      else { console.info('Obteniendo info sobre legajos') }
    }, [LegajosFB])
  */

  return <Legajos.Provider value={{ LegajosFB }}> {children} </Legajos.Provider>;
}