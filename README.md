## Administrador de legajos para GTZ

Recreado desde 0 con CRA, JS y TypeScript.  
(Con mock data en firebase)  
Tambien desde 0: Mi contacto con TypeScript _GL HF_

###  Changelog

##### v0.0.5 - 03/Aug/2021.  
Creacion desde 0...  
Context para Analistas y Legajos, primera version de datos en firestore.  
Version preliminar componente header(*logo+nav*).  
Version preliminar de form de asignacion  
Primeras versiones funcionales de componentes de las siguientes 'vistas': Cuadros por analistas, Tabla de analistas, Tabla de Legajos  
  
##### v0.0.6 - 04/Aug/2021.  
  
Form de asignacion operativo.  
Eliminacion de asignacion de legajo al hacer click en nombre de analista (sobre TablaLegajos)  
Asignacion y eliminacion de asignacion de legajo implica actualizacion de DB en firestore.  
Componente TableTHSort: sirve para ordernar la tabla visualmente(claro, no altera DB), segun los parametros indicados.  
Las vistas (CuadroAnalistas, TablaAnalistas, TablaLegajos) se actualizan tras asignacion/eliminacion de asignacion.  
*¿Por que se me dio por intentar aprender TypeScript con un proyecto en React?*  
  
##### v0.1.0 - 05/Aug/2021.  
Designadas paginas asignacion, analistas, legajos, test. Presentan diferentes componentes.  
Ampliadas propiedades en interfaz (en futuro brindara mucha flexibilidad en funcion a los componentes que se utilicen).  
Componente de carga redisenado.  
Preparando contextos para ampliar datos almacenados de analistas y legajos, y su cruce entre si, sin alterar DBs.  
Refactorizados componentes varios.  
Reestilizados componentes varios.