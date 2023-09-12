import {Route, Routes} from 'react-router-dom'
import Login from './pages/login/login'
import SignUp from './pages/signUp/signUp'
import Home from './pages/home/home'

export default function MyRoutes() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='sign-up' element={<SignUp/>} />
      <Route path='home' element={<Home/>} />
    </Routes>
    </>
  )
}

 
