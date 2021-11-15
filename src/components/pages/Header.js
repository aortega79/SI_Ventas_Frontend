import React from 'react'
import BotonLogin from '../Auth0/BotonLogin';
import BotonLogout from '../Auth0/BotonLogout';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { isAuthenticated, isLoading } = useAuth0();
    if (isLoading) return <h6>Loading...</h6>
        return (
            <div>
                {isAuthenticated ? <BotonLogout /> : <BotonLogin />}
            </div>
        )
}
export default Header
