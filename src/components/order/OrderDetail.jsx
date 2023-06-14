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
     headerName: "ID đơn hàng",
     width: 100,
     renderCell: (params) => {
      return (
         <div>
            {params.row.Order.id}
         </div>
      )
     }
     },
     {
         field: "productID",
         headerName: "Sản phẩm",
         width: 140,
         renderCell: (params) => {
            return (
               <div className='cellWithImg'>
                  <img className="cellImg" src={params.row.Product.PhotoProducts[0].url} alt="avatar" width={200}/>
                  {params.row.Product.name}
               </div>
            )
         }
     },
     {
         field: "quantity",
         headerName: "Số lượng",
         width: 150,
      },
      {
         field: "price",
         headerName: "Đơn giá",
         width: 160,
         renderCell: (params) => {
            return (
               <div>
                  {params.row.Product.price}
               </div>
            )
         }
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

      <div className="type">
      <div className='title'>
         Chi tiết đơn đặt hàng
         <button className='link'>Add new</button>
      </div>
      <DataTable
            userRows={orderDetail}
            userColumns={userColumns}
            actionColumn={actionColumn}
        />
    </div>

   )

   
}

export default OrderDetail;
