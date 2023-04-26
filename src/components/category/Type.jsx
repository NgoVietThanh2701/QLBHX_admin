import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Type = () => {

   const [type, setType] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get type
   const getType = async () => {
      const response = await axios.get('http://localhost:5000/admin/type');
      setType(response.data);
   }

   useEffect(() => {
    getType();
   }, []);


   //delete
   const deleteType = async (codeType) => {
      await axios.delete(`http://localhost:5000/admin/type/${codeType}`);
      getType();
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={`${params.row.uuid}`} >
                     <div className='viewButton'>View</div>
                  </Link>
                     {admin && admin.role ==='admin' && <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>}
                     {admin && admin.role ==='admin' &&
                        <div onClick={() => deleteType(params.row.codeType)}>
                           <div className='deleteButton'>Delete</div>
                        </div>
                     }
               </div >
            )
         }
      }
   ]

   return (
        <DataTable
            userRows={type}
            userColumns={userColumns}
            actionColumn={actionColumn}
            title="Loại sản phẩm"
            isAddNew={admin.role==='admin'?true:false}
        />
   )
}

export default Type;

const userColumns = [
   { field: "id", headerName: "ID", width: 60 },
   {field: "codeType", headerName: "Mã danh mục", width: 300},
   {
      field: "name",
      headerName: "Loại sản phẩm",
      width: 180,
   },
   {
    field: "categoryID",
    headerName: "Danh mục",
    width: 130
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 250,
   },
];
