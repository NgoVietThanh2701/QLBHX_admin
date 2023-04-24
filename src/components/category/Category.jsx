import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Category = () => {

   const [category, setCategory] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getCategory = async () => {
      const response = await axios.get('http://localhost:5000/admin/category');
      setCategory(response.data);
   }

   useEffect(() => {
      getCategory();
   }, []);

   console.log(category)

   //delete
   const deleteCategory = async (codeCategory) => {
      await axios.delete(`http://localhost:5000/admin/category/${codeCategory}`);
      getCategory();
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
                     {admin && admin.role==='admin' && <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>}
                     {admin && admin.role==='admin' &&
                        <div onClick={() => deleteCategory(params.row.codeCategory)}>
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
            userRows={category}
            userColumns={userColumns}
            actionColumn={actionColumn}
            title="Danh mục"
        />
   )
}

export default Category;

const userColumns = [
   { field: "id", headerName: "ID", width: 60 },
   {field: "codeCategory", headerName: "Mã danh mục", width: 300},
   {
      field: "name",
      headerName: "Danh mục",
      width: 250,
   },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 250,
   },
];
