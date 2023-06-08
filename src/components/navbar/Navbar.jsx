import React from 'react'
import "./navbar.scss"
import { useSelector } from 'react-redux';

const Navbar = () => {

   const { admin } = useSelector((state) => state.auth);
 
    return (
       <div className='navbar'>
          <div className="wrapper">
             <div className="search">
                <input type="text" placeholder='Search...' />
                <ion-icon name="search-outline"></ion-icon>
             </div>
             <div className="items">
                <div className="item">
                  <ion-icon name="earth-outline"></ion-icon>
                   English
                </div>
                <div className="item">
                  <ion-icon name="moon-outline"></ion-icon>
                </div>
                <div className="item">
                  <ion-icon name="scan-outline"></ion-icon>
                </div>
                <div className="item">
                  <ion-icon name="notifications-outline"></ion-icon>
                   <div className="counter">1</div>
                </div>
                <div className="item">
                  <ion-icon name="chatbox-outline"></ion-icon>
                   <div className="counter">1</div>
                </div>
                <div className="item">
                <ion-icon name="settings-outline"></ion-icon>
                </div>
                <div className="item">
                  {admin && admin.name}
                  <img
                     src='../images/logo.jpg'
                     alt=''
                     className='avatar' />
               </div>
             </div>
          </div>
       </div>
    )
 }

export default Navbar