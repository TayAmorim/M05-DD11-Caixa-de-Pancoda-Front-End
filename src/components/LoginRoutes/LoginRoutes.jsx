import { Navigate, Outlet} from 'react-router-dom';


export default function LoginRoutes({redirectTo}) {
    const authenticated = localStorage.getItem('token');

    return authenticated ? <Navigate to={redirectTo}/> : <Outlet />
}