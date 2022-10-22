import logo from './logo.svg';
import './App.css';
import Header from './Pages/Common/Header';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
