import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const BotonLogin = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <div>
            <nav className="navbar navbar-expand-lg  bg-primary">
                <Link to="/" className="btn btn-primary disabled">Inicio</Link>
                <Link to="/usuarios" className="btn btn-primary disabled">Usuarios</Link>
                <Link to="/productos" className="btn btn-primary disabled">Productos</Link>
                <Link to="/ventas" className="btn btn-primary disabled">Ventas</Link>
                <button type="button" className="btn btn-success" onClick={() => loginWithRedirect()}>
                    Login
                </button>
            </nav>
        </div>
    )
};

export default BotonLogin;