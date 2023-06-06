import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../type/type.scss';

const Customer = () => {

   const [customer, setCustomer] = useState([]);

   // get category
   const getCustomer = async () => {
      const response = await axios.get('http://localhost:5000/admin/customer');
      setCustomer(response.data);
   }

   useEffect(() => {
    getCustomer();
   }, []);

   //delete
   const deleteCustomer = async (codeCustomer) => {
      await axios.delete(`http://localhost:5000/admin/customer/${codeCustomer}`);
      getCustomer();
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
                     
                        <div onClick={() => deleteCustomer(params.row.codeCustomer)}>
                           <div className='deleteButton'>Delete</div>
                        </div>
                     
               </div >
            )
         }
      }
   ]

   return (
      <div className="type">
          <div className='title'>
            Danh sách khách hàng
            <button className='link'>Add new</button>
         </div>
         <DataTable
               userRows={customer}
               userColumns={userColumns}
               actionColumn={actionColumn}
         />
        </div>
   )
}

export default Customer;

const userColumns = [
   { field: "id", headerName: "ID", width: 60 },
   {field: "codeCustomer", headerName: "Mã khách hàng", width: 200},
   {
      field: "name",
      headerName: "Tên",
      width: 130,
   },
   {
    field: "email",
    headerName: "Email",
    width: 200,
    },
    {
        field: "phone",
        headerName: "Sđt",
        width: 130,
    },
   {
    field: "address",
    headerName: "Địa chỉ",
    width: 200,
    },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 100,
   },
];
