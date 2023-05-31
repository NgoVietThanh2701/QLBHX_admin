import React, { useEffect, useState } from 'react'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './type.scss';

const Type = () => {
   const { admin } = useSelector((state) => state.auth);
   const [isOpen, setIsOpen] = useState(null);
   const [name, setName] = useState("");
   const [categoryID, setCategoryID] = useState("");
   const [categories, setCategories] = useState([]);
   const [types, setTypes] = useState([]);

   useEffect(() => {
      getTypes();
      getCategories();
   }, []);

   // get type
   const getTypes = async () => {
      const response = await axios.get('http://localhost:5000/admin/type');
      setTypes(response.data);
   }

   // get type by codeType
   const getType = async (codeType) => {
      const response = await axios.get(`http://localhost:5000/admin/type/${codeType}`);
      setName(response.data.name);
      setCategoryID(response.data.Category.id);
   }
   
   //get categories
   const getCategories = async () => {
      const response = await axios.get(`http://localhost:5000/admin/category`);
      setCategories(response.data);
   }

   // create type
   const addType = async (e) => {
      e.preventDefault();
      try {
         if(name === ''){
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(categoryID === '') {
            toast.error("Vui lòng thêm danh mục!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.post("http://localhost:5000/admin/type", {
              name: name,
              categoryID: categoryID
            });
            toast.success("Thêm thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
            getTypes();
            setIsOpen(null);
            setName("");
            setCategoryID("");
         }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
   };

   // update Type
   const updateType = async (e) => {
      e.preventDefault();
      try {
         if(name === ''){
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(categoryID === '') {
            toast.error("Vui lòng thêm danh mục!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.patch(`http://localhost:5000/admin/type/${isOpen}`, {
              name: name,
              categoryID: categoryID
            });
            toast.success("Sửa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
            getTypes();
            setIsOpen(null);
            setName("");
            setCategoryID("");
         }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
   }

   //delete type
   const deleteType = async (codeType) => {
      await axios.delete(`http://localhost:5000/admin/type/${codeType}`);
      toast.success("Xóa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
      getTypes();
   }
   
   function openModal(n) {
      if(n!==1) {
         getType(n);
      }
      setIsOpen(n);
   }
  
   function closeModal(e) {
      e.preventDefault(); // Ngăn chặn việc nút submit được gửi thông qua form
      setIsOpen(null);
      setName("");
      setCategoryID("");
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                     {admin && admin.role ==='admin' && 
                     <button className='updateButton' onClick={() => openModal(params.row.codeType)}>Update</button>}
                     {admin && admin.role ==='admin' &&
                     <button className='deleteButton' onClick={() => deleteType(params.row.codeType)}> Delete</button>}
               </div>
            )
         }
      }
   ]

   return (
      <div className='type'>
         <div className='title'>
            Danh sách loại sản phẩm
            <button onClick={() => openModal(1)} className='link'>Add new</button>
         </div>
        <DataTable
            userRows={types}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
         {isOpen && (
         <div className="modal-type">
            <div className="modal-content-type">
               <div className="new-type-title">
                  Thêm loại sản phẩm
               </div>
               <form onSubmit={isOpen && isOpen === 1 ? addType : updateType}>
                  <div className="formInput">
                     <label>Tên loại</label>
                     <input type='text' placeholder='Nhập tên loại sản phẩm' value={name}
                        onChange={(e) => setName(e.target.value)} />
                  </div>  
                  <div className="formInput">
                     <label>Tên danh mục</label>
                     <select className='form-select' value={categoryID} onChange={(e) => setCategoryID(e.target.value)}>
                           <option className='option' value=''>Chọn danh mục sản phẩm</option>
                           {categories.map((category, index) => (
                                 <option key={index} className='option' value={category.id}>{category.name}</option>     
                           ))}
                     </select>
                  </div>    
                  <div className="form-btn">
                     <button className='category-btn-add' type='submit'>{isOpen && isOpen === 1 ? "Add" : "Update"}</button>
                     <button className='category-btn-cancle' onClick={closeModal}>Cancel</button>   
                  </div>
               </form>
            </div>
         </div>
         )}
          <ToastContainer />
        </div>
   )
}

export default Type;

const userColumns = [
   { 
      field: "id", 
      headerName: "ID", 
      width: 60 
   },
   {
      field: "codeType", 
      headerName: "Mã danh mục", 
      width: 300
   },
   {
      field: "name",
      headerName: "Tên",
      width: 140,
   },
   {
   field: "categoryID",
   headerName: "Danh mục",
   width: 200,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
                  <img className="cellImg" src={params.row.Category.url} alt="avatar" width={200}/>
                  {params.row.Category.name}
            </div>
         )
      }
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 250,
   },
];
