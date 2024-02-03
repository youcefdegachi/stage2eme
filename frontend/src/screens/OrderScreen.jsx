import { useEffect } from 'react';
import { Link, useParams , useNavigate} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,

  useDeliverOrderMutation,
  usePaidOrderMutation,
  useNotDeliverOrderMutation,
  useNotPaidOrderMutation,

} from '../slices/ordersApiSlices';

import { useSelector, useDispatch } from 'react-redux';



const OrderScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const {id:orderId} = useParams()
  const { data: order,refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);




  //deliver
  const [deliverOrder , {isLoading: loadingDeliver}] = useDeliverOrderMutation();
  const [notDeliverOrder , {isLoading: loadingNotDeliver}] = useNotDeliverOrderMutation();


    const deliverHandler = async () => {
      await deliverOrder(orderId);
      refetch();
    };
    const notDeliverHandler = async () => {
      await notDeliverOrder(orderId);
      refetch();
    };





  // paid
  const [paidOrder , {isLoading: loadingPaid}] = usePaidOrderMutation();
  const [notPaidOrder , {isLoading: loadingNotPaid}] = useNotPaidOrderMutation();

  const paidHandler = async () => {
    await paidOrder(orderId);
    refetch();
  };
  const notPaidHandler = async () => {
    await notPaidOrder(orderId);
    refetch();
  };

  // console.log(order)
  return isLoading ? <Loader/> : error ? (<Message variant='danger' />) 
      :(<>
      
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h1>Order state</h1>
                </ListGroup.Item>
                <ListGroup.Item>
                <h3>Order Id: {order._id}</h3>
                </ListGroup.Item>
                {/* <br /> */}
            <ListGroup.Item>

              {order.isDelivered? (
                <>
                {/* //! I try to make button next to message
                
                <Col md={6}>
                  <ListGroup.Item>
                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                  </ListGroup.Item>
                </Col>
                
                <Col md={4}>
                  <ListGroup.Item>
                  {userInfo &&
                    userInfo.isAdmin &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type='button'
                          className='btn btn-block'
                          onClick={deliverHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                  </ListGroup.Item>
                </Col> */}


                  <Message variant='success'>
                    Delivered on {order.deliveredAt}
                  </Message>
                    </>
              ):(
                <Message variant='danger'>
                  Not Delivered
                </Message>
              )
            }
            </ListGroup.Item>

              {/* </ListGroup.Item> */}
            <ListGroup.Item>
            {order.isPaid ? (
            <Message variant='success'>
              Paid on {order.paidAt}
            </Message>
            )
            :(
              <Message variant='danger'>
                Not Paid
              </Message>
            )
            }
            </ListGroup.Item>



            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((item,index) =>(
                <ListGroup.Item key={index}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <h3>{item.name}</h3>
                    </Col>
                    <Col>
                      <h3>{item.qty} * ${item.price} = ${item.price * item.qty}</h3>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
            
            
            
            
            
            </ListGroup>
              {/* )
              
              )}
            </ListGroup.Item>


            </ListGroup> */}
          </Col>
        
        <Col md={4}>
          <ListGroup variant='flush'>
          <ListGroup.Item>
            <h1>Order Summary</h1>
          </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items Price: </Col>
                <Col>{order.itemsPrice}</Col>
              </Row>
              <Row>
                <Col>Shipping: </Col>
                <Col>{order.shippingPrice}</Col>
              </Row>
              <Row>
                <Col>Tax: </Col>
                <Col>{order.taxPrice}</Col>
              </Row>
              <Row>
                <Col>Total: </Col>
                <Col>{order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
              {error ? 
                ( <ListGroup.Item>
                    { error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>)
                : (<></>)
              }


              <ListGroup.Item>
                <h2>Payment Detail</h2>
                <strong>Payment Method: </strong>
                {order.paymentMethod}
                <p>
                <strong>Address: </strong>
                {order.shippingAddress.address},
                {order.shippingAddress.city},
                {order.shippingAddress.postalCode},
                {order.shippingAddress.country}
              </p>
              </ListGroup.Item>
              <ListGroup.Item>

                <h2>User Detail</h2>
                <p>
                  <strong>Name: </strong> {order.user.name} <br />
                  <strong>Email: </strong> {order.user.email}
                </p>


              </ListGroup.Item>


              {loadingDeliver && <Loader />}
              {loadingNotDeliver && <Loader />}

              {userInfo &&
                userInfo.isAdmin &&
                !order.isDelivered ?(
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )
                  :(
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block'
                        onClick={notDeliverHandler}
                      >
                        Mark Not Delivered
                      </Button>
                    </ListGroup.Item>
                  )
                
                }

                {loadingPaid && <Loader />}
                {loadingNotPaid && <Loader />}


                {userInfo &&
                userInfo.isAdmin &&
                !order.isPaid ? (
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={paidHandler}
                    >
                      Mark As Paid
                    </Button>
                  </ListGroup.Item>
                )
                :(
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={notPaidHandler}
                    >
                      Mark Not Paid
                    </Button>
                  </ListGroup.Item>
                )
                }
          </ListGroup>
        </Col>
        </Row>

      </>)
  
}

export default OrderScreen