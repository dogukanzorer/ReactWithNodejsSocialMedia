import { BrowserRouter , Route , Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './Home'
import Register from './Register'
import Login from './Login'

function App(){

    console.log("deneme");
    return(
        <>
        <BrowserRouter>
        <Routes>
                <Route path='login' element = {<Login/>}/>
                <Route path='register' element = {<Register/>}/>
               
              <Route path='/' element={<Layout/>}>
              <Route index element = {<Home/>}/>
              </Route>

        </Routes>
        </BrowserRouter>
        </>
        
    )
}

export default App;