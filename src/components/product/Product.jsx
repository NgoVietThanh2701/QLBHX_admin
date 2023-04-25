import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { getMeAdmin } from '../../features/authSlice';
import DataTable from '../dataTable/DataTable';
import axios from 'axios';

const Product = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { isError } = useSelector((state) => state.auth);
   const [products, setProducts] = useState([])

   // get products
   const getProducts = async () => {
      const response = await axios.get(`http://localhost:5000/admin/product`);
      setProducts(response.data);
   }

   useEffect(() => {
      getProducts();
   }, []);

   const deleteProduct = async (codeProduct) => {
      await axios.delete(`http://localhost:5000/admin/product/${codeProduct}`);
      getProducts();
   }

   //
   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 220,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <Link style={{ textDecoration: "none" }}>
                     <div className='viewButton'>View</div>
                  </Link>
                  <div className='updateButton'>
                          update
                    </div>
                  <div onClick={() => deleteProduct(params.row.codeProduct)}>
                     <div className='deleteButton'>Delete</div>
                  </div>
               </div >
            )
         }
      }
   ]

   return (
        <DataTable
            userRows={products}
            userColumns={userColumns}
            actionColumn={actionColumn}
            title="sản phẩm" 
            link_new = "./new"
            isAddNew = {true}
        />
   )
}

export default Product

const userColumns = [
   { field: "id", headerName: "ID", width: 70 },
   {
    field: "codeProduct",
    headerName: "Mã SP",
   },
   {
      field: "typeID",
      headerName: "Loại",
      width: 100,
    //   renderCell: (params) => {
    //      return (
    //         <div>
    //            {params.row.Type.name}
    //         </div>
    //      )
    //   }
   },
   {
      field: "name",
      headerName: "Sản phẩm",
      width: 200,
      renderCell: (params) => {
         return (
            <div className='cellWithImg'>
               <img className="cellImg" src={params.row.url} alt="avatar" width={200}/>
               {params.row.name}
            </div>
         )
      }
   },
   {
      field: "price",
      headerName: "Giá",
      width: 70,
   },
   {
      field: "discount",
      headerName: "Giảm(%)",
      width: 80
   },
   {
      field: "description",
      headerName: 'Mô tả',
      width: 200,
   },
   {
        field: "stock",
        headerName: 'Stock',
        width: 70
   },
   {
        field: "warehouseID",
        headerName: "Kho",
        width: 120,
        // renderCell: (params) => {
        // return (
        //     <div>
        //         {params.row.Warehouse.name}
        //     </div>
        // )
        // }
   },
];
