import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Auth from './pages/Auth'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Dashboard from './pages/account/Dashboard'
import Transfer from './pages/account/Transfer'
import { RecoilRoot } from "recoil";

function App() {

  return (
    <div>
       <RecoilRoot>
        <BrowserRouter>

          <Routes>
            <Route path='/auth' element={<Auth/>}>
              <Route path='register' element={<Register/>}/>
              <Route path='login' element={<Login/>}/>
            </Route>

            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/transfer' element={<Transfer/>} />
          </Routes>
        </BrowserRouter>
        </RecoilRoot>
    </div>
  )
}

export default App
