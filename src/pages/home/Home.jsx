import React, { useEffect } from 'react'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/SideBar';
import "./home.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../features/authSlice';
import axios from 'axios';

const Home = ({main}) => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);

   // secure  if user no login & navigate login page
   useEffect(() => {
      dispatch(getMeAdmin());
   }, [dispatch]);

   useEffect(() => {
      if (isError) {
         navigate("/admin/login")
      }
   }, [isError, navigate]);


   return (
      <div className='home'>
         <Sidebar />
         <div className="homeContainer">
            <Navbar />
            {main}
         </div>
      </div>
   )
}

export default Home