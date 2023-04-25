import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Type from './components/category/Type';
import Category from './components/category/Category.jsx';
import Product from './components/product/Product';
import NewProduct from './components/product/newProduct';
import NewCategory from './components/category/newCategory';
import Staff from './components/staff/Staff';
import Customer from './components/customer/customer';
import Manager from './components/manager/manager';
import Order from './components/order/Order';
import OrderDetail from './components/order/OrderDetail';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path='/admin'>
              <Route index element={<Home main={ <Dashboard/>} />}/>
              <Route path='login' element={<Login/>}/>
              <Route path='category'>
                  <Route index element={<Home main={ <Category/> }/>}/>
                  <Route path='new' element={<Home main={<NewCategory/>} />}/>
              </Route>
              <Route path='type'>
                  <Route index element={<Home main={ <Type/> }/>}/>
                  {/* <Route path=':id' element={}/> */}
              </Route>
              <Route path='staff'>
                  <Route index element={<Home main={ <Staff/> }/>}/>
                  {/* <Route path=':id' element={}/> */}
              </Route>
              <Route path='customer'>
                  <Route index element={<Home main={ <Customer/> }/>}/>
                  {/* <Route path=':id' element={}/> */}
              </Route>
              <Route path='manager'>
                  <Route index element={<Home main={ <Manager/> }/>}/>
                  {/* <Route path=':id' element={}/> */}
              </Route>
              <Route path='product'>
                <Route index element={<Home main={<Product/>}/>}/>
                <Route path='new' element={ <Home main={<NewProduct/>} />} />
              </Route>
              <Route path='order'>
                  <Route index element={<Home main={ <Order/> }/>}/>
                  <Route path='detail/:id' element={ <Home main={<OrderDetail />}/>}/>
              </Route>
            </Route>
          </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
