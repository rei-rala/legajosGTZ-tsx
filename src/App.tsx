import React from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  //Redirect,
  //RouteComponentProps
} from "react-router-dom";

import { AnalistasContext } from "./contexts/AnalistasContext";
import { LegajosContext } from "./contexts/LegajosContext";
import { WorkflowContext } from "./contexts/WorkflowContext";

import Header from "./components/Header/Header";

import FormAsignacion from "./components/FormAsignacion/FormAsignacion";

import TablaAnalistas from "./components/TablaAnalistas/TablaAnalistas";
import CuadroAnalistas from "./components/CuadroAnalistas/CuadroAnalistas";

import TablaLegajos from "./components/TablaLegajos/TablaLegajos";
import TablaLegajosAntiguos from "./components/TablaLegajosAntiguos/TablaLegajosAntiguos";

import WorkflowModule from "./components/Workflow/WorkflowModule";

import LoadingGTZ from "./components/LoadingGTZ/LoadingGTZ";

function App() {
  return (
    <Router>
      <Header />

      <AnalistasContext>
        <LegajosContext>
          <LoadingGTZ />

          <Switch>
            <Route exact path="/">
              {/* <Redirect to="/test" /> */}
              <h2>Home</h2>
              <p>
                Acceso rapido a paneles en desarrollo
              </p>
              <hr />
              <Link to="/test">
                <button>Test</button>
              </Link>

              <Link to="/workflow">
                <button>Workflow</button>
              </Link>
            </Route>

            <Route exact path="/asignacion">
              <h2>Panel de asignacion</h2>
              <p>
                Asigne mediante las opciones desplegables. Puede desasignar clickeando el nombre del analista en la tabla.
              </p>
              <hr />
              <FormAsignacion />
              <CuadroAnalistas />
              <TablaLegajos />
            </Route>

            <Route exact path="/analistas">
              <h2>Panel de analistas</h2>
              <p>
                Puede ponerse en licencia a un analista haciendo click en su
                nombre de la tabla
              </p>
              <hr />
              <CuadroAnalistas />
              <TablaAnalistas />
            </Route>

            <Route exact path="/legajos">
              <h2>Panel de legajos</h2>
              <p>
                Puede eliminar una asignacion clickeando en el nombre del
                analista en la tabla
              </p>
              <hr />

              <TablaLegajosAntiguos />
              <TablaLegajos />
            </Route>

            <Route exact path="/test">
              <h2>Panel de testeo</h2>
              <p>
                En esta seccion salen todos los componentes para ponerlos a prueba.
              </p>
              <hr />
              <FormAsignacion />
              <TablaLegajosAntiguos />
              <CuadroAnalistas />
              <TablaAnalistas />
              <TablaLegajos />
            </Route>

            <Route exact path="/workflow">
              <h2>Workflow</h2>
              <p>
                Test de formulador de informacion resumida sobre workflow.
              </p>
              <hr />
              
              <WorkflowContext>
                <WorkflowModule />
              </WorkflowContext>

            </Route>
          </Switch>
        </LegajosContext>
      </AnalistasContext>
    </Router>
  );
}

export default App;
