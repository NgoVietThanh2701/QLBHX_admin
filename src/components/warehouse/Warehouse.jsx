import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../components/type/type.scss';

const Warehouse = () => {

   const [warehouses, setWarehouses] = useState([]);
   const [isOpen, setIsOpen] = useState(null);
   const [name, setName] = useState("");
   const [branchs, setBranchs] = useState([]);
   const [branch, setBranch] = useState("");
   const [address, setAddress] = useState("");

   // get category
   const getWarehouse = async () => {
      const response = await axios.get('http://localhost:5000/admin/warehouse');
      setWarehouses(response.data);
   }

   const getBranchByID = async (codeWarehouse) => {
      const response = await axios.get(`http://localhost:5000/admin/warehouse/${codeWarehouse}`);
      setName(response.data.name);
      setAddress(response.data.address);
      setBranch(response.data.Branch.codeBranch);
   }

   useEffect(() => {
    getWarehouse();
    getBranch();
   }, []);

   //delete
   const deleteWarehouse = async (codeWarehouse) => {
      await axios.delete(`http://localhost:5000/admin/warehouse/${codeWarehouse}`);
      toast.success("Xóa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
      getWarehouse();
   }

   // get warehouses
   const getBranch = async () => {
      const response = await axios.get(`http://localhost:5000/admin/branch`);
      setBranchs(response.data);
   }

   const createWarehouse = async (e) => {
      e.preventDefault();
      try {
         if(name === '') {
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(address === '') {
            toast.error("Vui lòng thêm địa chỉ!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(branch === '') {
            toast.error("Vui lòng chọn chi nhánh", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.post("http://localhost:5000/admin/warehouse", {
              name: name,
              address: address,
              codeBranch: branch
            });
            toast.success("Thêm thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
            getWarehouse();
            setIsOpen(null);
            setName("");
            setAddress("");
            setBranch("");
         }
      } catch(error) {
         if(error.response) {
            console.log(error.response.data.msg);
         }
      }
   }

   const updateWarehouse = async (e) => {
      e.preventDefault();
      try {
         if(name === '') {
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(address === '') {
            toast.error("Vui lòng thêm địa chỉ!", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else if(branch === '') {
            toast.error("Vui lòng chọn chi nhánh", {position: toast.POSITION.BOTTOM_RIGHT,});
         } else {
            await axios.patch(`http://localhost:5000/admin/warehouse/${isOpen}`, {
               name: name,
               address: address,
               codeBranch: branch
            });
            toast.success("Sửa thành công!", {position: toast.POSITION.BOTTOM_RIGHT,});
            getWarehouse();
            setIsOpen(null);
            setName("");
            setAddress("");
            setBranch("");
         }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
   }

   function openModal(n) {
      if(n!==1) {
         getBranchByID(n);
      }
      setIsOpen(n);
   }
  
   function closeModal(e) {
      e.preventDefault(); // Ngăn chặn việc nút submit được gửi thông qua form
      setIsOpen(null);
      setName("");
      setAddress("");
      setBranch("");
   }

   const userColumns = [
    { field: "id", headerName: "ID", width: 60 },
    {field: "codeWH", headerName: "Mã kho", width: 200},
    {
       field: "name",
       headerName: "Tên",
       width: 150,
    },
    {
     field: "address",
     headerName: "Địa chỉ",
     width: 200,
     },
     {
      field: "codeBranch",
      headerName: "Chi nhánh",
      width: 150,
      renderCell: (params) => {
         return (
            <div>
               {params.row.Branch.name}
            </div>
         )
      }
   },
    {
       field: "createdAt",
       headerName: "Thời gian",
       width: 100,
    },
 ];

 const actionColumn = [
   {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
         return (
            <div className='cellAction'>
               <button  onClick={() => openModal(params.row.codeWH)} className='updateButton'>
                  update
               </button>
               <button className='deleteButton' onClick={() => deleteWarehouse(params.row.codeWH)}>
                  Delete
               </button>
            </div >
         )
      }
   }
]
 

   return (
      <div className="type">
         <div className='title'>
            Danh sách kho
            <button onClick={() => openModal(1)} className='link'>Add new</button>
         </div>
         <DataTable
            userRows={warehouses}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
        {isOpen && (
         <div className="modal-type">
            <div className="modal-content-type">
               <div className="new-type-title">
                  Thêm Kho hàng
               </div>
               <form onSubmit={isOpen && isOpen === 1 ? createWarehouse : updateWarehouse}>
                  <div className="formInput">
                     <label>Tên loại</label>
                     <input type='text' placeholder='Nhập tên kho' value={name}
                        onChange={(e) => setName(e.target.value)} />
                  </div>  
                  <div className="formInput">
                     <label>Địa chỉ</label>
                     <input type='text' placeholder='Nhập địa chỉ kho' value={address}
                        onChange={(e) => setAddress(e.target.value)} />
                  </div>  
                  <div className="formInput">
                     <label>Chọn chi nhánh</label>
                     <select className='form-select' value={branch} onChange={(e) => setBranch(e.target.value)}>
                           <option className='option' value=''>Chọn Chi nhanh</option>
                           {branchs.map((br, index) => (
                                 <option key={index} className='option' value={br.codeBranch}>{br.name}</option>     
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

export default Warehouse;
