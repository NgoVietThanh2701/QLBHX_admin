import React, { useState } from 'react'
import './category.scss'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const NewCategory = () => {

   const navigate = useNavigate();

   const [name, setName] = useState("");
   const [msg, setMessage] = useState("");

   const addCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/admin/category", {
        name: name
      });
      navigate("/admin/category");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.msg);
      }
    }
  };


   return (
        <div>
            <div className="top-new">
               Thêm danh mục sản phẩm
            </div>
            <div className="bottom-new">
                  <form onSubmit={addCategory}>
                     <div className="formInput">
                        <label>Name</label>
                        <input type='text' placeholder='Nhập tên sản phẩm'
                           value={name}
                           onChange={(e) => setName(e.target.value)} />
                     </div>
                     <p style={{ color: 'red' }}>{msg}</p>
                     <button type='submit' className='addProductButton'>
                        Create
                     </button>
                  </form>
               </div>
        </div>
   )
}

export default NewCategory