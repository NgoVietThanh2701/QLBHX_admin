import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../type/type.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Staff = () => {

   const [staff, setStaff] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getStaff = async () => {
      const response = await axios.get('http://localhost:5000/admin/staff');
      setStaff(response.data);
   }

   useEffect(() => {
    getStaff();
   }, []);

   //delete
   const deleteStaff = async (codeStaff) => {
      await axios.delete(`http://localhost:5000/admin/staff/${codeStaff}`);
      getStaff();
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to=''>
                     <div className='viewButton'>View</div>
                  </Link>
                     <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>
                        <div onClick={() => deleteStaff(params.row.codeStaff)}>
                           <div className='deleteButton'>Delete</div>
                        </div>
               </div >
            )
         }
      }
   ]

   const userColumns = [
    { field: "id", headerName: "ID", width: 60 },
    {field: "codeStaff", headerName: "Mã nhân viên", width: 200},
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
         field: "salary",
         headerName: "Lương",
         width: 70,
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
 

   return (
      <div className="type">
          <div className='title'>
            Danh sách nhân viên
            <button className='link'>Add new</button>
         </div>
          <DataTable
            userRows={staff}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
      </div>
   )
}

export default Staff;
