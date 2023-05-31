import React, { useEffect, useState } from 'react'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'
import './category.scss';
import { DriveFolderUploadOutlined } from '@mui/icons-material';
import noImage from '../../images/no-image.webp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Category = () => {

   const [category, setCategory] = useState([]);
   const [isOpen, setIsOpen] = useState(null);
   const [name, setName] = useState("");
   const [file, setFile] = useState("");
   const [preview, setPreview] = useState("");

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getCategory = async () => {
      const response = await axios.get('http://localhost:5000/admin/category');
      setCategory(response.data);
   }

   // get category
   const getCategoryByID = async (codeCategory) => {
      const response = await axios.get(`http://localhost:5000/admin/category/${codeCategory}`);
      setName(response.data.name);
      setFile(response.data.fileName);
      setPreview(response.data.url);
   }

   useEffect(() => {
      getCategory();
   }, []);

   //delete
   const deleteCategory = async (codeCategory) => {
      await axios.delete(`http://localhost:5000/admin/category/${codeCategory}`);
      toast.success("Xóa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
      getCategory();
   }

   // create 
   const addCategory = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", file);
      try {
         if(file === null || file.length === 0 ){
            toast.error("Vui lòng thêm hình ảnh!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(name === '') {
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.post("http://localhost:5000/admin/category", formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            toast.success("Thêm thành công!", {
               position: toast.POSITION.BOTTOM_RIGHT,
            });
            setIsOpen(null);
            setFile("");
            setName("");
            getCategory();
         }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
    };

   // update Category
   const updateCategory = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      try {
         if(file === null || file.length === 0 ){
            toast.error("Vui lòng thêm hình ảnh!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(name === '') {
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.patch(`http://localhost:5000/admin/category/${isOpen}`, formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            toast.success("Sửa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
            getCategory();
            setIsOpen(null);
            setFile("");
            setName("");
            setPreview("");
         }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
   } 

   function openModal(n) {
      if(n!==1) {
         getCategoryByID(n);
      }
      setIsOpen(n);
   }
  
    function closeModal(e) {
      e.preventDefault(); // Ngăn chặn việc nút submit được gửi thông qua form
      setIsOpen(null);
      setFile("");
      setName("");
      setPreview("");
   }

   const loadImage = (e) => {
      const image = e.target.files[0];
      setFile(image);
      setPreview(URL.createObjectURL(image)); 
   };

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  {admin && admin.role === 'admin' && 
                  <button className='updateButton' onClick={() => openModal(params.row.codeCategory)}>
                     Update
                  </button>}
                  {admin && admin.role === 'admin' && 
                  <button className='deleteButton' onClick={() => deleteCategory(params.row.codeCategory)}>
                     Delete
                  </button>}
               </div >
            )
         }
      }
   ]

   return (
      <div className='category'>
         <div className='title'>
            Danh sách danh mục
            <button onClick={() => openModal(1)} className='link' > Add new</button>
         </div>
         <DataTable
               userRows={category}
               userColumns={userColumns}
               actionColumn={actionColumn}
         />
         {isOpen && (
         <div className="modal-category">
            <div className="modal-content-category">
               <div className="new-category-title">
                  Thêm danh mục sản phẩm
               </div>
               <div className="new-category-body">
                  <form onSubmit={isOpen && isOpen === 1 ? addCategory : updateCategory}>
                     <div className="formInput">
                       <div className="left-form">
                           <label>Name</label>
                           <input type='text' placeholder='Nhập tên sản phẩm' value={name}
                              onChange={e => setName(e.target.value)} />
                           <button className='category-btn-add' type='submit'>{isOpen && isOpen === 1 ? "Add" : "Update"}</button>
                           <button className='category-btn-cancle' onClick={closeModal}>Cancel</button>   
                        </div>
                       <div className="right-form">       
                           <div className="left">
                              <label htmlFor='file'>
                                 Images: <DriveFolderUploadOutlined className='icon' />
                              </label>
                              <input type="file" id='file'
                                    style={{ display: "none" }}
                                    onChange={loadImage}/>
                           </div>
                           <div className="right">
                              <img className='image-posted' src={file ? preview : noImage} alt="" />
                           </div>
                       </div>
                     </div>
                  </form>
               </div>
            </div>
         </div>
         )}
          <ToastContainer />
        </div>
   )
}

export default Category;

const userColumns = [
   { 
      field: "id", 
      headerName: "ID", 
      width: 60 
   },
   {
      field: "codeCategory", 
      headerName: "Mã danh mục", 
      width: 300
   },
   {
      field: "name",
      headerName: "Sản phẩm",
      width: 300,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.url} alt="avatar" width={200}/>
               {params.row.name}
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
