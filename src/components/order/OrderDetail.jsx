import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const OrderDetail = () => {

   const [orderDetail, setOrderDetail] = useState([]);

   const { id } = useParams();

   // get category
   const getOrderDetail = async () => {
      const response = await axios.get(`http://localhost:5000/admin/order/${id}`);
      setOrderDetail(response.data);
   }

   useEffect(() => {
    getOrderDetail();
   }, []);


   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link to={``}>
                     <div className='viewButton'>View</div>
                  </Link>
                     <div>
                        <div className='updateButton'>
                          update
                        </div>
                     </div>
                        <div >
                           <div className='deleteButton'>Delete</div>
                        </div>
               </div >
            )
         }
      }
   ]

   const userColumns = [
    { field: "id", headerName: "ID", width: 60 },
    {
     field: "orderID",
     headerName: "Phương thức",
     width: 100,
     },
     {
         field: "productID",
         headerName: "Sản phẩm",
         width: 140,
     },
     {
         field: "quantity",
         headerName: "Số lượng",
         width: 150,
      },
      {
        field: "total_price",
        headerName: "Tổng tiền",
        width: 160,
     },
    {
       field: "createdAt",
       headerName: "Thời gian",
       width: 160,
    },
 ];
 

   return (
        <DataTable
            userRows={orderDetail}
            userColumns={userColumns}
            actionColumn={actionColumn}
            title="Chi tiết đơn hàng"
            link_new="."
            isAddNew={false}
        />
   )

   
}

export default OrderDetail;
