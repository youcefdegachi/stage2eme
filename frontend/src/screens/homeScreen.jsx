import React from 'react'
import { Row, Col } from "react-bootstrap"
import Product from '../components/Product'

import Loading from '../components/Loader';
import Message from '../components/Message';
// import products from "../products" //=> chagne it to api



// import { useEffect, useState } from 'react';
// import axios from 'axios';


import { useGetProductsQuery } from '../slices/productsApiSlice'









function HomeScreen() {


    // const [products,setProducts] = useState([]);
    // useEffect(()=>{
    //     const fetchProducts = async () =>{
    //         const { data } = await axios.get("/api/products")
    //         setProducts(data)
    //     }
    //     fetchProducts();
    // },[])

    const { data: products, isLoading,error} = useGetProductsQuery();

    return (
        <>
        
        { isLoading ?(
            <Loading></Loading>
        ) 
        :error? (
            <div>
                <Message variant="danger" message={error?.data?.message}></Message>
            </div>
        ) 
        :(
            <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((product)=>(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                        {/* <img src={product.image} alt="dsfsdf"/> */}
                        {/* <h3>{product.name }</h3> */}
                        <Product product={product} /> 
                    </Col>
                ))}
            </Row>
            </>
        )}
    </>
    )
}

export default HomeScreen