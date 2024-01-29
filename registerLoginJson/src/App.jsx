import './App.css'
import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';  
import Navbar from './pages/Navbar';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <>
    
    <ToastContainer theme='colored'></ToastContainer>
      <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        
      </Routes>
      </AuthProvider>
     
    </>
  )
}

export default App
