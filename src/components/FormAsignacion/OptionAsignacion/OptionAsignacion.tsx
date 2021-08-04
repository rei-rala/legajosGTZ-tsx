import React from 'react'

interface Comparador {
  valor: any;
  validacion: boolean;
  key?: string;
  children?: string;
}

const OptionAsignacion: React.FC<Comparador> = ({ valor, validacion, children}) => (<>
  {
    validacion 
      ? <option value={valor}>{children}</option>
      : ''
  }
  </>
  
)



export default OptionAsignacion;

