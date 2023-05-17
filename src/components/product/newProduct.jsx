import React, { useEffect, useState } from 'react'
import "./product.scss";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { DriveFolderUploadOutlined } from '@mui/icons-material'
import axios from 'axios';

const NewProduct = () => {

   const navigate = useNavigate();

   const [files, setFiles] = useState([]);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [discount, setDiscount] = useState("")
   const [stock, setStock] = useState("")
   const [msg, setMessage] = useState("");
   const [warehouse, setWarehouse] = useState("");
   const [type, setType] = useState("");

   const [warehouses, setWarehouses] = useState([]);
   const [types, setTypes] = useState([]);

    const getWarehouses = async () => {
        const response = await axios.get(`http://localhost:5000/admin/warehouse`);
        setWarehouses(response.data);
    }

    const getTypes= async () => {
        const response = await axios.get(`http://localhost:5000/admin/type`);
        setTypes(response.data);
    }

    useEffect(() => {
        getWarehouses();
        getTypes();
    }, []);


   const saveProduct = async (event) => {
      // stopping reload page when submit
      event.preventDefault();
      console.log("--"+files)
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("images", files);
      formData.append("stock", stock);
      formData.append("warehouseID", warehouse);
      formData.append("typeID", type);
      try {
        if (files === '' || files === null) {
            setMessage("Vui lòng chọn ảnh");
         }else if (name === '') {
            setMessage("Vui lòng nhập tên sản phẩm!");
         } else if (description === '') {
            setMessage("Vui lòng nhập mô tả sản phẩm!");
         } else if (price === '') {
            setMessage("Vui lòng nhập giá sản phẩm!");
         } else if (stock === '') {
            setMessage("Vui lòng nhập số lượng trong kho!");
         }else if (warehouse === '' || warehouse === null) {
            setMessage("Vui lòng chọn kho sản phẩm!");
         } else if (type === '' || type === null) {
            setMessage("Vui lòng chọn loại sản phẩm!");
         }
         else {
            await axios.post(`http://localhost:5000/admin/product`, formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            navigate(`/admin/product`);
         }
      } catch (error) {
         if (error) {
            setMessage(error.response.data.msg)
         }
      }
   }


   return (
        <div>
            <div className="top-new">
               Thêm sản phẩm
            </div>
            <div className="bottom-new">
               <div className="left">
                  {/* {
                     files.map((file) => {
                        <img
                        src={file ? URL.createObjectURL(file) : "../../images/no-image.webp"}
                        alt="" />
                     })
                  } */}
               </div>
               <div className="right">
                  <form onSubmit={saveProduct}>
                     <div className="formInput">
                        <label htmlFor='file'>
                           Images: <DriveFolderUploadOutlined className='icon' />
                        </label>
                        <input type="file" id='file'
                              style={{ display: "none" }}
                              multiple
                              onChange={e => setFiles(e.target.files)} />
                     </div>
                     <div className="formInput">
                        <label>Name</label>
                        <input type='text' placeholder='Nhập tên sản phẩm'
                           value={name}
                           onChange={(e) => setName(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Description</label>
                        <input type='text' placeholder='Nhập mô tả'
                           value={description}
                           onChange={(e) => setDescription(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Price</label>
                        <input type='text' placeholder='Nhập giá'
                           value={price}
                           onChange={(e) => setPrice(e.target.value)} />
                     </div>
                     <div className="formInput">
                        <label>Discount</label>
                        <input type='text' placeholder='Nhập giảm giá(%)'
                           value={discount}
                           onChange={(e) => setDiscount(e.target.value)} />
                     </div>
                     <div className="formInput">
                     <label>Stock</label>
                        <input type='text' placeholder='Số lượng trong kho'
                           value={stock}
                           onChange={(e) => setStock(e.target.value)} />
                     </div>
        
                    <div className='form-select'>
                       <select className='select-container' value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
                            <option className='option' value=''>Chọn kho chứa sản phẩm</option>
                                {warehouses.map((wh, index) => (
                                        <option key={index} className='option' value={wh.id}>{wh.name}</option>
                                ))}
                        </select>
                        
                        <select className='select-container' value={type} onChange={(e) => setType(e.target.value)}>
                            <option className='option' value=''>Chọn loại sản phẩm</option>
                            {types.map((t, index) => (
                                    <option key={index} className='option' value={t.id}>{t.name}</option>
                            ))}
                        </select>
                    </div>

                     <p style={{ color: 'red' }}>{msg}</p>
                     <button type='submit' className='addProductButton'>
                        Create
                     </button>
                  </form>
               </div>
            </div>
        </div>
   )
}

export default NewProduct