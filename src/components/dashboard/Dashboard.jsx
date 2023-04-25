import { useEffect, useState } from "react";
import Widget from "../widget/Widget";
import axios from "axios";

const Dashboard = () => {

    const [product, setProducts] = useState([]);
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);

    const getProducts = async () => {
        const response = await axios.get(`http://localhost:5000/admin/product`);
        setProducts(response.data);
     }

     const getOrder = async () => {
        const response = await axios.get('http://localhost:5000/admin/order');
        setOrder(response.data);
     }

     const getCustomer = async () => {
        const response = await axios.get('http://localhost:5000/admin/customer');
        setCustomer(response.data);
     }
     let total_order=0;
     for(const value of order) {
        total_order +=value.total
        console.log(value.total);
     }

  
     useEffect(() => {
      getCustomer();
      getOrder();
      getProducts();
     }, []);


    return (
        <div>
            <div className="widgets">
                <Widget type="revenue" quantity={total_order}/>
                <Widget type="product" quantity={product.length}/>
                <Widget type="order" quantity={order.length}/>
                <Widget type="customer" quantity={customer.length}/>
            </div>
        </div>
    )
} 

export default Dashboard