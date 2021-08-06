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

import Header from "./components/Header/Header";

import FormAsignacion from "./components/FormAsignacion/FormAsignacion";

import TablaAnalistas from "./components/TablaAnalistas/TablaAnalistas";
import CuadroAnalistas from "./components/CuadroAnalistas/CuadroAnalistas";

import TablaLegajos from "./components/TablaLegajos/TablaLegajos";
import TablaLegajosAntiguos from "./components/TablaLegajosAntiguos/TablaLegajosAntiguos";

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
              <Link to="/test">
                <button>IR A PANEL DE TEST</button>
              </Link>
            </Route>

            <Route exact path="/asignacion">
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
              <FormAsignacion />
              <TablaLegajosAntiguos />
              <CuadroAnalistas />
              <TablaAnalistas />
              <TablaLegajos />
            </Route>
          </Switch>
        </LegajosContext>
      </AnalistasContext>
    </Router>
  );
}

export default App;
