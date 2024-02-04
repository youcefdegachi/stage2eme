import React from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
// import axios from "axios";
import { useState } from 'react';
import Rating from '../components/Rating'
import Loading from '../components/Loader';
import Message from '../components/Message'
import { useGetProductsDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice'
import {useDispatch } from 'react-redux'

// import product from '../product' //=> change get all product from the api


const ProductScreen = () => {
    const { id:  productId } = useParams()
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    // const [product, setProduct] = useState({})
    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         const { data } = await axios.get(`/api/product/${productsId}`)
    //         setProduct(data)
    //     }
    //     fetchProduct()
    // }, [productsId])
    const { data: product, isLoading,error } = useGetProductsDetailsQuery(productId);



    const addToCartHandler = () => {
        dispatch(addToCart({...product ,qty}));
        navigate('/cart');
    }

    
    return (
        <>
        <Link className="btn btn-light my-3" to="/">go back</Link>

        {isLoading ? (
            <Loading></Loading>

            
        ): error ? ( 
            <div>
                <Message variant="danger" message={error?.data?.message}></Message>
            </div>
        ):(
            <>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} className='imageProduct' fluid />
                </Col>
                <Col md={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{ product.name }</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item >Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item >Description: ${product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price</Col>
                                    <Col>${product.price}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status</Col>
                                    <Col>
                                        <strong>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of' }

                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            
                                            <Col>QTY</Col>
                                            <Col>
                                                <Form.Control  as="select" value = {qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                    
                                                    {[...Array(product.countInStock).keys()].map(
                                                        (x)=>( 
                                                            <option key={x+1} value={x+1}>
                                                                {x+1}
                                                            </option>
                                                        )
                                                    )}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>)
                                }
                            <ListGroup.Item>
                                <Button
                                    className='btn-block'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            </>

        )}

            
        </>
    )
}



export default ProductScreen