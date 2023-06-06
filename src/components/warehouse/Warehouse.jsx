import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Warehouse = () => {

   const [warehouse, setWarehouse] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getWarehouse = async () => {
      const response = await axios.get('http://localhost:5000/admin/warehouse');
      setWarehouse(response.data);
   }

   useEffect(() => {
    getWarehouse();
   }, []);

   //delete
   const deleteWarehouse = async (codeWarehouse) => {
      await axios.delete(`http://localhost:5000/admin/warehouse/${codeWarehouse}`);
      getWarehouse();
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
                        <div onClick={() => deleteWarehouse(params.row.codeStaff)}>
                           <div className='deleteButton'>Delete</div>
                        </div>
               </div >
            )
         }
      }
   ]

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
 

   return (
      <div className="type">
         <div className='title'>
            Danh sách kho
            <button className='link'>Add new</button>
         </div>
         <DataTable
            userRows={warehouse}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
      </div>
   )
}

export default Warehouse;
