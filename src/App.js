import React, { useEffect} from 'react'
import Navbar from './components/BeforeLogin';
import SignUp from './Auth/SignUp';
import Signin from './Auth/SignIn';
import { Route, Routes } from "react-router-dom";
import { useAuth } from './hooks/helper';
import RunWay from './Auth/RunWay';
import Home from './Home';
const App = () => {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  if(isLoggedIn) return <Home/>
 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<RunWay/> }/>
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="/auth/signup" element={<SignUp />} />
        <Route path="/home" element={ <Home/>}/>
      </Routes>
    </>

  )
}

export default App;