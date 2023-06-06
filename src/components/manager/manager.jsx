import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Manager = () => {

   const [manager, setManager] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getManager = async () => {
      const response = await axios.get('http://localhost:5000/admin/manager');
      setManager(response.data);
   }

   useEffect(() => {
    getManager();
   }, []);

   //delete
   const deleteManager = async (codeManager) => {
      await axios.delete(`http://localhost:5000/admin/manager/${codeManager}`);
      getManager();
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to='' >
                     <div className='viewButton'>View</div>
                  </Link>
                   <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>
                     
                        <div onClick={() => deleteManager(params.row.codeManager)}>
                           <div className='deleteButton'>Delete</div>
                        </div>
                     
               </div >
            )
         }
      }
   ]

   const userColumns = [
    { field: "id", headerName: "ID", width: 60 },
    {field: "codeManager", headerName: "Mã quản lý", width: 200},
    {
       field: "name",
       headerName: "Tên",
       width: 150,
    },
    {
     field: "email",
     headerName: "Email",
     width: 200,
     },
     {
         field: "role",
         headerName: "Chức vụ",
         width: 150,
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
 ];

   return (
      <div className="type">
      <div className='title'>
        Danh sách quản lý
        <button className='link'>Add new</button>
     </div>
     <DataTable
            userRows={manager}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
    </div>
   )
}

export default Manager;

