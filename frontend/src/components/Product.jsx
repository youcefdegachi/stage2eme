import React from 'react'
import {Card} from 'react-bootstrap'

import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({product}) => {
    return (
        <Card style={ {height: '400px'}}>

            <Link to={`/product/${product._id}`}>
                <Card.Img variant="top" src={product.image} className='imgProdcut' style={{ width: '100%', height: '200px', objectFit: 'cover' }} />

            </Link>

            <Card.Body>
            
            <Link to={`/product/${product._id}`}>
                <Card.Title as="div" className='product-title'> 
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            
            <Card.Text as="div">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
            
            </Card.Body>
        </Card>
    )
}

export default Product