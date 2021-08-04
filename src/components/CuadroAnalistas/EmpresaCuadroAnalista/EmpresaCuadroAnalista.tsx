import React from 'react'

interface Comparador {
  idAnalista:string;
  idAsignado:string;
  razonSocial:string;
  key?: string;
  children?: JSX.Element;
}

const EmpresaCuadroAnalista: React.FC<Comparador> = ({idAnalista, idAsignado, razonSocial}) => (<>
  {
    idAnalista === idAsignado
      ? <li className='legajoAsignadoCuadro'>{razonSocial}</li>
      : ''
  }
  </>
  
)



export default EmpresaCuadroAnalista;

