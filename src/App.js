
import './App.css';
import Registeration from './components/Registeration';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import GetListCustomer from './components/GetListCustomer';

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/register' element={<Registeration />}></Route>
          <Route path='/customerlist' element={<GetListCustomer />}></Route>


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
