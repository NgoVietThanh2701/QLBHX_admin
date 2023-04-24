import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Category from './components/category/Category';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path='/admin'>
              <Route index element={<Home main={"text"} />}/>
              <Route path='login' element={<Login/>}/>
              <Route path='category'>
                  <Route index element={<Home main={ <Category/> }/>}/>
              </Route>
            </Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
