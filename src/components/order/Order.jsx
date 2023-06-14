import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'

const Order = () => {

   const [order, setOrder] = useState([]);

   const { admin } = useSelector((state) => state.auth);

   // get category
   const getOrder = async () => {
      const response = await axios.get('http://localhost:5000/admin/order');
      setOrder(response.data);
   }

   useEffect(() => {
    getOrder();
   }, []);

   //delete
   const deleteOrder = async (orderID) => {
      await axios.delete(`http://localhost:5000/admin/order/${orderID}`);
      getOrder();
   }

   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={`./detail/${params.row.id}`}>
                     <div className='viewButton'>Detail</div>
                  </Link>
                     <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>
                        <div onClick={() => deleteOrder(params.row.id)}>
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
            Danh sách đơn đặt hàng
            <button className='link'>Add new</button>
         </div>
         <DataTable
            userRows={order}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
       </div>
   )

   
}

export default Order;

const userColumns = [
   { field: "id", headerName: "ID", width: 60 },
   {
      field: "customerID", headerName: "Khách hàng", width: 120,
      renderCell: (params)  => {
         return (
            <div>
               {params.row.Customer.name}
            </div>
         )
      }
   
   }
   ,
  {
      field: "codeBranch",
      headerName: "Chi nhánh",
      width: 100,
      renderCell: (params) => {
        return (
           <div>
              {params.row.Branch.name}
           </div>
        )
      }
   },
   {
    field: "method",
    headerName: "Phương thức",
    width: 150,
    },
    {
        field: "status",
        headerName: "Trạng thái",
        width: 70,
    },
    {
        field: "totalMoney",
        headerName: "Tổng tiền",
        width: 120,
     },
     {
      field: "costShip",
      headerName: "Phi Ship",
      width: 80,
   },
     {
       field: "note",
       headerName: "Ghi chú",
       width: 160,
    },
   {
      field: "createdAt",
      headerName: "Thời gian",
      width: 160,
   },
];
