import {Navigate, Outlet} from 'react-router-dom';


export default function ProtectedRoutes({redirectTo}) {
    const authenticated = localStorage.getItem('token');

    return authenticated ? <Outlet /> : <Navigate to={redirectTo}/>
}