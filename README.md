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
  
  
##### v0.1.5 - 06/Aug/2021.  
Mejorado navbar mobile.  
Interfaces IAnalista e ILegajo ampliadas (pendiente limpieza de propiedades sin utilizar).  
Quitados SCSS de componentes de tablas para unificar y controlar el estilo general de tablas desde App.scss  
Refactorizado TablaLegajosAntiguos: Utiliza ahora TableTHSort para ordenar el contenido de la tabla.  
Animacion de 'Carga' se inicia al hacer diferentes operaciones con firestore y se desmonta tras completarse.  
Contexto de legajos ahora provee un contenido mas amplio, apoyandose en informacion de analistas.  
Toggle de mostrar analistas de licencia en CuadroAnalistas ahora guarda y recupera su estado en localStorage.  
  
  
##### v0.4.0 - 10/Aug/2021.  
Seccion Workflow: Automatizacion del reporte: El reporte de WF recopila y brinda informacion sobre los legajos, desglosa y totaliza por estados, resalta legajos antiguos y sumariza en un pequeño cuadrito, todo al alcance de un click.  
Workflow se guarda en localStorage al realizar consulta.  
Fixed animacion de carga.  
Pequeña descripcion en cada panel.  
TODO: Mejorar codigo y estilo en Workflow (y en general... bue).  
*Perdon TypeScript y todo aquel que vea mi codigo*