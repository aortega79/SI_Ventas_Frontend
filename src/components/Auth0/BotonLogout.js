import React from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';

const BotonLogout = () => {

  const { logout } = useAuth0()

  return (
    <div>


      <nav className="navbar navbar-expand-lg  bg-primary">
        <Link to="/" className="btn btn-primary">Inicio</Link>
        <Link to="/usuarios" className="btn btn-primary">Usuarios</Link>
        <Link to="/productos" className="btn btn-primary">Productos</Link>
        <Link to="/ventas" className="btn btn-primary">Ventas</Link>
        <button type="button" className="btn btn-success" onClick={() => logout()}>
          Logout
        </button>
        
      </nav>
    </div>
  );
}

export default BotonLogout;