import React from 'react'
import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutAdmin, reset } from '../../features/authSlice';

const Sidebar = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { admin } = useSelector((state) => state.auth);

   const logout = () => {
      dispatch(logOutAdmin());
      dispatch(reset());
      navigate("/admin/login");
   }

   return (
      <div className='sidebar'>
         <div className="top">
            <NavLink to="/admin" style={{ textDecoration: "none" }}>
               <span className='logo'>Bách hóa xanh</span>
            </NavLink>
         </div>
         <hr />
         <div className="center">
            <ul>
               <p className="title">MAIN</p>
               <NavLink to="/admin">
                  <li>
                     <DashboardIcon className='icon' />
                     <span>Dashboard</span>
                  </li>
               </NavLink>
               <p className="title">LIST</p>
               <NavLink to="/admin/product">
                  <li>
                     <StoreOutlinedIcon className='icon' />
                     <span>Products</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/category">
                  <li>
                     <PersonOutlineOutlinedIcon className='icon' />
                     <span>Category</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/type">
                  <li>
                     <CreditCardOutlinedIcon className='icon' />
                     <span>Type</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/staff">
                  <li>
                     <PersonOutlineOutlinedIcon className='icon' />
                     <span>Staff</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/customer">
                  <li>
                     <PersonOutlineOutlinedIcon className='icon' />
                     <span>Customer</span>
                  </li>
               </NavLink>
               {admin&&admin.role==='admin'&&<NavLink to="/admin/manager">
                  <li>
                     <PersonOutlineOutlinedIcon className='icon' />
                     <span>Manager</span>
                  </li>
               </NavLink>}
               <p className="title">USEFUL</p>
               <NavLink to="/admin/order">
                  <li>
                     <NotificationsActiveOutlinedIcon className='icon' />
                     <span>Đơn hàng</span>
                  </li>
               </NavLink>

               <p className="title">USER</p>
               <NavLink to="/admin/profile">
                  <li>
                     <NotificationsActiveOutlinedIcon className='icon' />
                     <span>Profile</span>
                  </li>
               </NavLink>
               
               <li>
                  <LocalShippingOutlinedIcon className='icon' />
                  <span onClick={logout}>Logout</span>
               </li>
            </ul>
         </div>
         <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
         </div>
      </div >
   )
}

export default Sidebar