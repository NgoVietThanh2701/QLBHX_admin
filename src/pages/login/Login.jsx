import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom'
import './login.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdmin, reset  } from '../../features/authSlice';
import login from '../../images/background.jpg';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [port_cn, setPort] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { admin, isError, isSuccess, isLoading, message } = useSelector(
       (state) => state.auth
    );

    useEffect(() => {
        if (admin || isSuccess) {
           navigate("/admin");
        }
        dispatch(reset());
     }, [admin, isSuccess, dispatch, navigate]);

     const Auth = (e) => {
        e.preventDefault();
        dispatch(loginAdmin({ email, password, port_cn }));
     }

   return (
      <>
         <section className="auth">
            <div className="title-auth">
               <Link to='/'>
                  <div>
                     <i class="fa-solid fa-bag-shopping"></i>
                     <span>Đăng nhập để tiếp tục</span>
                  </div>
               </Link>
               <span className='support'>Bạn cần giúp đỡ?</span>
            </div>
            <div className="body">
               <div className="left">
                  <img src={login} alt='' />
               </div>
               <div className="right">
                     <form onSubmit={Auth}>
                        <div className='title'>Đăng nhập</div>
                        <input type="text" className='field'placeholder="Email" value={email} 
                            onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" className='field' placeholder="Mật khẩu" value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                        <select class='form-control' value={port_cn} onChange={(e) => setPort(e.target.value)}>
                            <option hidden >--- Chi nhánh</option>
                            <option value='3435'>Đà nẵng</option>
                            <option value='3436'>Hồ chí Mình</option>
                            <option value='3437'>Hà Nội</option>
                        </select>
                        {isError && <span class='error'>{message}</span>}
                        {isLoading ?
                       <img className='image-loading' src="../images/loading.gif" alt='' />:
                             <input type="submit" value='Đăng nhập' />
                        }
                        <div className='forgot'>
                           <span>Quên mật khẩu</span>
                           <span>Đăng nhập với SMS</span>
                        </div>
                        <div class="strike">
                           <span>HOẶC</span>
                        </div>
                        <div className='advise'>
                           <span>Bạn mới biết đến DeftShop?</span>
                           <Link to='/sign-up'>
                              <span>Đăng ký</span>
                           </Link>
                        </div>
                     </form>
               </div>
            </div>
         </section>
      </>
   )
}

export default Login