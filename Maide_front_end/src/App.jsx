import './App.css';
import { Route,Routes } from 'react-router-dom';

import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';




function App() {

  return (
    <>
    <Routes>
      <Route path='/Home' element={<Home/>}/>
      <Route path='/' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
    </Routes>
    </>
  );
}

export default App;
