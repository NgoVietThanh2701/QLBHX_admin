import React from 'react'
import "./sidebar.scss"
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
                  <ion-icon name="home-outline"></ion-icon>
                     <span>Dashboard</span>
                  </li>
               </NavLink>
               <p className="title">LIST</p>
               <NavLink to="/admin/product">
                  <li>
                  <ion-icon name="file-tray-outline"></ion-icon>
                     <span>Products</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/category">
                  <li>
                  <ion-icon name="bag-handle-outline"></ion-icon>
                     <span>Category</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/type">
                  <li>
                  <ion-icon name="copy-outline"></ion-icon>
                     <span>Type</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/staff">
                  <li>
                  <ion-icon name="person-outline"></ion-icon>
                     <span>Staff</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/customer">
                  <li>
                  <ion-icon name="person-add-outline"></ion-icon>
                     <span>Customer</span>
                  </li>
               </NavLink>
               {admin&&admin.role==='admin'&&<NavLink to="/admin/manager">
                  <li>
                  <ion-icon name="person-add-outline"></ion-icon>
                     <span>Manager</span>
                  </li>
               </NavLink>}
               <p className="title">USEFUL</p>
               <NavLink to="/admin/order">
                  <li>
                  <ion-icon name="notifications-outline"></ion-icon>
                     <span>Đơn hàng</span>
                  </li>
               </NavLink>
               <NavLink to="/admin/warehouse">
                  <li>
                  <ion-icon name="server-outline"></ion-icon>
                     <span>Kho</span>
                  </li>
               </NavLink>
               <p className="title">USER</p>
               <NavLink to="/admin/profile">
                  <li>
                  <ion-icon name="person-circle-outline"></ion-icon>
                     <span>Profile</span>
                  </li>
               </NavLink>
               <li>
               <ion-icon name="trending-up-outline"></ion-icon>
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