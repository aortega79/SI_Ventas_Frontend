import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Inicio from "./components/pages/Inicio";
import Productos from "./components/pages/Productos";
import Usuarios from "./components/pages/Usuarios";
import Ventas from "./components/pages/Ventas";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";


function App() {
  return (
    <Router>
      <Header />
      <hr />
      <Switch>
        <Route path="/" exact> <Inicio /> </Route>
        <Route path="/usuarios"> <Usuarios /> </Route>
        <Route path="/productos"> <Productos /> </Route>
        <Route path="/ventas"> <Ventas /> </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
