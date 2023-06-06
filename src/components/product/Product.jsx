import React, { useEffect, useState } from 'react'
import DataTable from '../dataTable/DataTable';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Product = () => {
   const [products, setProducts] = useState([])
   const [isOpen, setIsOpen] = useState(null);
   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState("");
   const [discount, setDiscount] = useState("");
   const [stock, setStock] = useState("");
   const [type, setType] = useState("");
   const [warehouse, setWarehouse] = useState("");
   const [files, setFiles] = useState([]);
   const [properties, setProperties] = useState([]);
   const [newPro, setNewPro] = useState("");
   const [subPro, setSubPro] = useState("");
   const [selectedPro, setSelectedPro] = useState(null);
   const [types, setTypes] = useState([]);
   const [warehouses, setWarehouses] = useState([]);
   const [preview, setPreview] = useState([]);

   useEffect(() => {
      getProducts();
      getTypes();
      getWarehouses();
   }, []);

   const getTypes = async () => {
      const response = await axios.get(`http://localhost:5000/admin/type`);
      setTypes(response.data);
   }

   const getWarehouses = async () => {
      const response = await axios.get(`http://localhost:5000/admin/warehouse`);
      setWarehouses(response.data);
   }

   // get products
   const getProducts = async () => {
      const response = await axios.get(`http://localhost:5000/admin/product`);
      setProducts(response.data);
   }

   const getProductByID = async (codeProduct) => {
      const response = await axios.get(`http://localhost:5000/admin/product/${codeProduct}`);
      const listFileName = [];
      const listpreviewImg = [];
      response.data.PhotoProducts.forEach((photo) => {
         listFileName.push(photo.fileName);
         listpreviewImg.push(photo.url);
      });
      setFiles(listFileName);
      setPreview(listpreviewImg);
      // config properties
      const objArray = JSON.parse(JSON.parse(response.data.properties));
      const output = objArray.reduce((acc, cur) => {
         const [name, subPros] = Object.entries(cur)[0];
         acc.push({ name, subPros });
         return acc;
      }, []);
      setName(response.data.name);
      setDescription(response.data.description);
      setPrice(response.data.price);
      setDiscount(response.data.discount);
      setProperties(output);
      setStock(response.data.stock);
      setType(response.data.Type.id);
      setWarehouse(response.data.Warehouse.id)
   }

   const deleteProduct = async (codeProduct) => {
      await axios.delete(`http://localhost:5000/admin/product/${codeProduct}`);
      getProducts();
   }

   // create 
   const addProduct = async (e) => {
      e.preventDefault();
      const proConver = properties.map(({name, subPros}) => ({[name]: subPros}));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("properties", JSON.stringify(proConver));
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("typeID", type);
      formData.append("warehouseID", warehouse);
      try {
         if(files.length === 0) {
            toast.error("Vui lòng thêm hình ảnh!", {position: toast.POSITION.BOTTOM_RIGHT,})
         } else if(name === ""){
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(description === '') {
            toast.error("Vui lòng thêm mô tả!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(price === '') {
            toast.error("Vui lòng thêm giá!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(properties === '') {
            toast.error("Vui lòng thêm phân loại!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(stock === '') {
            toast.error("Vui lòng thêm số lượng!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(type === '') {
            toast.error("Vui lòng thêm loại sản phẩm!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(warehouse === '') {
            toast.error("Vui lòng thêm mô kho!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else {
            Array.from(files).forEach((file) => {
               formData.append("images", file);
            })
            await axios.post("http://localhost:5000/admin/product", formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            toast.success("Thêm thành công!", { position: toast.POSITION.BOTTOM_RIGHT});
            getProducts();
            setIsOpen(null);
            setFiles([]);
            setName("");
            setDescription("");
            setPrice("");
            setDiscount("");
            setProperties([]);
            setStock("");
            setType("");
            setWarehouse("");
            setPreview([]);
         }
      } catch (error) {
        if (error.response) {
          toast.success(error.response.data.msg);
        }
      }
   };

    // update 
    const updateProduct = async (e) => {
      e.preventDefault();
      const proConver = properties.map(({name, subPros}) => ({[name]: subPros}));
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("properties", JSON.stringify(proConver));
      formData.append("discount", discount);
      formData.append("stock", stock);
      formData.append("typeID", type);
      formData.append("warehouseID", warehouse);
      try {
         if(files.length === 0) {
            toast.error("Vui lòng thêm hình ảnh!", {position: toast.POSITION.BOTTOM_RIGHT,})
         } else if(name === ""){
            toast.error("Vui lòng thêm tên!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(description === '') {
            toast.error("Vui lòng thêm mô tả!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(price === '') {
            toast.error("Vui lòng thêm giá!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(properties === '') {
            toast.error("Vui lòng thêm phân loại!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(stock === '') {
            toast.error("Vui lòng thêm số lượng!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(type === '') {
            toast.error("Vui lòng thêm loại sản phẩm!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else if(warehouse === '') {
            toast.error("Vui lòng thêm mô kho!", {position: toast.POSITION.BOTTOM_RIGHT});
         } else {
            Array.from(files).forEach((file) => {
               formData.append("images", file);
            })
            await axios.patch(`http://localhost:5000/admin/product/${isOpen}`, formData, {
               headers: {
                  "Content-type": "multipart/form-data",
               }
            });
            toast.success("Sửa thành công!", { position: toast.POSITION.BOTTOM_RIGHT});
            getProducts();
            setIsOpen(null);
            setFiles([]);
            setName("");
            setDescription("");
            setPrice("");
            setDiscount("");
            setProperties([]);
            setStock("");
            setType("");
            setWarehouse("");
            setPreview([]);
         }
      } catch (error) {
        if (error.response) {
          toast.success(error.response.data.msg);
        }
      }
   };

   function addPro(e) {
      e.preventDefault();
      if (newPro !== "") {
        setProperties([...properties, { name: newPro, subPros: [] }]);
        setNewPro("");
      }
   }
   
   function addSubPro(e) {
      e.preventDefault();
      if (subPro !== "") {
        const newPros = [...properties];
        const index = newPros.findIndex((pro) => pro === selectedPro);
        newPros[index].subPros.push(subPro);
        setProperties(newPros);
        setSelectedPro(null);
        setSubPro("");
      }
    }

   function openPro(e, pro) {
      e.preventDefault();
      setSelectedPro(pro);
      setSubPro("");
   }

   function onDelete(e, indexPro) {
      e.preventDefault();
      setProperties(prePros => {
         const newPros = [...prePros];
         newPros.splice(indexPro, 1);
         return newPros;
      });
   }

   function closePro(e) {
      e.preventDefault();
      setSelectedPro(null);
      setSubPro("");
   } 

   function openModal(n) {
      if(n!==1) {
         getProductByID(n);
      }
      setIsOpen(n);
   }
  
   function closeModal(e) {
      e.preventDefault(); // Ngăn chặn việc nút submit được gửi thông qua form
      setIsOpen(null);
      setFiles([]);
      setName("");
      setDescription("");
      setPrice("");
      setDiscount("");
      setProperties([]);
      setStock("");
      setType("");
      setWarehouse("");
      setPreview([]);
   }

   const handleLoadImage = (e) => {
      const newImages = [...e.target.files];
      isOpen === 1 ? 
      setFiles((prevImages) => {
         return [...prevImages, ...newImages];
      }) : setFiles(newImages);
      const previewImg = [];
      newImages.forEach((img) => {
         previewImg.push(URL.createObjectURL(img));
      })
      isOpen === 1 ? 
      setPreview((pre) => {
         return [...pre, ...previewImg]
      }) : setPreview(previewImg) 
    };
   
   const actionColumn = [
      {
         field: "action",
         headerName: "Action",
         width: 150,
         renderCell: (params) => {
            return (
               <div className='cellAction'>
                  <button className='updateButton' onClick={() => openModal(params.row.codeProduct)}>
                     Update
                  </button>
                  <button className='deleteButton' onClick={() => deleteProduct(params.row.codeProduct)}>
                     Delete
                  </button>
               </div >
            )
         }
      }
   ]

   return (
      <div className='product'>
         <div className='title'>
            Danh sách sản phẩm
            <button onClick={() => openModal(1)} className='link' > Add new</button>
         </div>
         <DataTable
               userRows={products}
               userColumns={userColumns}
               actionColumn={actionColumn}
         />
         {isOpen && (
            <div className="modal-product">
               <div className="modal-content-product">
                  <div className="product-title">
                     Thêm sản phẩm
                  </div>
                     <form onSubmit={isOpen && isOpen === 1 ? addProduct : updateProduct}>
                        <div className="column-container">
                           <div className="column">
                              <div className="form-group">
                                 <label htmlFor="name">Tên sản phẩm</label>
                                 <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="description">Mô tả</label>
                                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description" name="description" rows="4"></textarea>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="price">Giá</label>
                                 <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="price" name="price" />
                              </div>
                              
                              <div className="form-group">
                                 <label htmlFor="discount">Giảm giá</label>
                                 <input value={discount} onChange={(e) => setDiscount(e.target.value)} type="number" id="discount" name="discount" />
                              </div>
                              <div className="form-group">
                                 <select id="typeID" name="typeID" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="">Chọn loại sản phẩm</option>
                                    {types.map((t, index) => (
                                       <option key={index} value={t.id}>{t.name}</option>
                                    ))}
                                 </select>
                              </div>
                              <div className="form-group">
                                 <select id="warehouseID" value={warehouse} onChange={(e) => setWarehouse(e.target.value)} name="warehouseID">
                                    <option value="">Chọn kho</option>
                                    {warehouses.map((wh, index) => (
                                       <option key={index} value={wh.id}>{wh.name}</option>
                                    ))}
                                 </select>
                              </div>
                           </div>
                           <div className="column">
                              <div className="form-group">
                                 <label htmlFor="stock">Số lượng</label>
                                 <input value={stock} onChange={(e) => setStock(e.target.value)} type="number" id="stock" name="stock" />
                              </div>
                              <div className="form-group">
                                 <label htmlFor="properties">Phân loại</label>
                                 <input type="text" value={newPro} id="properties" name="properties" 
                                    onChange={(e) => setNewPro(e.target.value)}/>
                                 <button onClick={addPro}>Thêm</button>
                              </div>
                              <div className="form-group">
                                 <ul>
                                    {properties && properties.map((property, index) => (
                                       <li key={index}>
                                         <div key={index} className="pro-name">
                                             <div key={index} className='sub-name'>
                                                <span>- {property.name.charAt(0).toUpperCase() + property.name.slice(1)}:</span>
                                                <ul>
                                                   {property.subPros.map((subPro, i) => (
                                                      <li style={{marginRight: '6px'}} key={i}>{subPro},</li>
                                                   ))}
                                                </ul>
                                             </div>
                                             <div className='btn-add' onClick={(e) => openPro(e, property)}><EditOutlinedIcon/></div>
                                             <div className='btn-add' onClick={(e) => onDelete(e, index)}><CloseIcon/></div>
                                         </div>
                                       </li>
                                    ))}
                                 </ul>
                                 {selectedPro && (
                                    <div className="add-content">
                                       <p>Thêm phân loại cho "{selectedPro.name}"</p>
                                       <input type="text" value={subPro} onChange={(e) => setSubPro(e.target.value)} />
                                       <button className='btn-add-sub' onClick={addSubPro}><CheckOutlinedIcon/></button>
                                       <button className='btn-add-sub' onClick={closePro}><CloseIcon/></button>
                                    </div>
                                 )}
                              </div>
                              <div className="form-group">
                                 <label htmlFor="image">Hình ảnh</label>
                                 <input type="file" multiple id="image" onChange={handleLoadImage} name="image" accept="image/*" />
                              </div>
                              <div className="form-group">
                                 {files.length > 0 && preview.length > 0 &&
                                    preview.map((pre, index) => (
                                    <img key={index} className='image-upload' src={pre} alt="preview" />
                                    ))
                                 }
                              </div>
                           </div>
                        </div>
                        <button className='product-btn-add' type='submit'>{isOpen && isOpen === 1 ? "Add" : "Update"}</button>
                        <button className='product-btn-cancle' onClick={closeModal}>Cancel</button>  
                     </form>
               </div>
            </div>
            )}
          <ToastContainer />
        </div>
   )
}

export default Product

const userColumns = [
   { 
      field: "id", 
      headerName: "ID", 
      width: 30
   },
   {
    field: "codeProduct",
    headerName: "Mã SP",
    width: 70
   },
   {
      field: "typeID",
      headerName: "Loại",
      width: 60,
      renderCell: (params) => {
         return (
            <div>
               {params.row.Type.name}
            </div>
         )
      }
   },
   {
      field: "name",
      headerName: "Sản phẩm",
      width: 250,
      renderCell: (params) => {
         let images = params.row.PhotoProducts; // Danh sách các hình ảnh
         return (
            <div className='cellWithImg'>
               {params.row.name}
               {images.map((image, index) => { 
                  return (
                     <div key={index} style={{position: "relative", top: '0', left:'6px', width: "30px", height: "60px"}}>
                        <img  
                        key={index} className="cellImg"
                        src={image.url} alt="avatar"
                        style = {{
                           position: "absolute",
                           top: `${index * 0}px`, // ví dụ cách tính vị trí top
                           left: `${index * 16}px`, // ví dụ cách tính vị trí left
                         }}
                     />
                     </div>
                  )
                  }
               )}
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
      field: "properties",
      headerName: "Phân loại",
      width: 180,
      renderCell: (params) => {
         let objArray = JSON.parse(JSON.parse(params.row.properties));
         let output = "";
         objArray.forEach(obj => {
            Object.entries(obj).forEach(([key, value]) => {
                  output += `${key.charAt(0).toUpperCase() + key.slice(1)}: `
                  value.forEach(val => {
                     output += `${val}, `;
                  });
                  output += "<br>";
            })
          });
         return <div dangerouslySetInnerHTML={{ __html: output }}></div>;
      }
   },
   {
      field: "discount",
      headerName: "Giảm(%)",
      width: 80
   },
   {
      field: "description",
      headerName: 'Mô tả',
      width: 80,
   },
   {
        field: "sold",
        headerName: 'Đã bán',
        width: 60
   },
   {
      field: "stock",
      headerName: 'Stock',
      width: 60
   },
   {
        field: "warehouseID",
        headerName: "Kho",
        width: 120,
        renderCell: (params) => {
        return (
            <div>
                {params.row.Warehouse.name}
            </div>
        )
        }
   },
];
