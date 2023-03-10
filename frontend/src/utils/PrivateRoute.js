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
import AuthContext from '../context/AuthContext';

const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    // const auth = null; // determine if authorized, from context or however you're doing it
    // console.log("PRIVATE ROUTE!")
    // return user ? <Outlet /> : <Navigate to="/login" />;

    if (!user) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login"/>
    }

    // authorized so return child components
    return children;
}

export default PrivateRoute