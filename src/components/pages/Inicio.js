import React from 'react'
import { Container } from 'reactstrap'
import Logo from '../images/tienda.jpeg'
import Profile from '../Auth0/Profile'

const Inicio = () => {
    return (
        <Container>
            <div>
                <Profile />
                <h1>TIENDA MISION TIC 2021</h1>
                <img alt ="Inicio" src={Logo} />
            </div>
        </Container>
    )
}

export default Inicio

