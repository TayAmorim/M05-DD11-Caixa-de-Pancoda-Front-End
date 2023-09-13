import {Route, Routes} from 'react-router-dom'
import Login from './pages/login/index'
import SignUp from './pages/signUp/index'
import Home from './pages/home/index'

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

 
