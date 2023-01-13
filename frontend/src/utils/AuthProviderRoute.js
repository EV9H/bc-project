// import {Route, Redirect} from 'react-router-dom'

// const PrivateRoute = ({children, ...rest}) => {
//     console.log("Private route => !")
//     return ( 
//         <Route {...rest}> {children}</Route>
//     )
// }

// export default PrivateRoute

import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext, {AuthProvider} from '../context/AuthContext';
import {DataProvider} from '../context/DataContext'
const AuthProviderRoute = () => {
    // const auth = null; // determine if authorized, from context or however you're doing it
    // console.log("PRIVATE ROUTE!")
    return <AuthProvider>
                <DataProvider>
                    <Outlet />
                </DataProvider>
            </AuthProvider>

}

export default AuthProviderRoute