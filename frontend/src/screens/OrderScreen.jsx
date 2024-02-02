// import { useEffect } from 'react';
// import { Link, useParams } from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// // import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import { useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
//   // useGetPaypalClientIdQuery,
//   usePayOrderMutation,
// } from '../slices/ordersApiSlices';

// const OrderScreen = () => {
//   const { id: orderId } = useParams();

//   const {
//     data: order,
//     refetch,
//     isLoading,
//     error,
//   } = useGetOrderDetailsQuery(orderId);

//   const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

//   const [deliverOrder, { isLoading: loadingDeliver }] =
//     useDeliverOrderMutation();

//   const { userInfo } = useSelector((state) => state.auth);

//   // const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

//   // const {
//   //   data: paypal,
//   //   isLoading: loadingPayPal,
//   //   error: errorPayPal,
//   // } = useGetPaypalClientIdQuery();

//   useEffect(() => {
//     if (!errorPayPal && !loadingPayPal && paypal.clientId) {
//       const loadPaypalScript = async () => {
//         paypalDispatch({
//           type: 'resetOptions',
//           value: {
//             'client-id': paypal.clientId,
//             currency: 'USD',
//           },
//         });
//         paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
//       };
//       if (order && !order.isPaid) {
//         if (!window.paypal) {
//           loadPaypalScript();
//         }
//       }
//     }
//   }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

//   function onApprove(data, actions) {
//     return actions.order.capture().then(async function (details) {
//       try {
//         await payOrder({ orderId, details });
//         refetch();
//         toast.success('Order is paid');
//       } catch (err) {
//         toast.error(err?.data?.message || err.error);
//       }
//     });
//   }

//   // TESTING ONLY! REMOVE BEFORE PRODUCTION
//   // async function onApproveTest() {
//   //   await payOrder({ orderId, details: { payer: {} } });
//   //   refetch();

//   //   toast.success('Order is paid');
//   // }

//   function onError(err) {
//     toast.error(err.message);
//   }

//   function createOrder(data, actions) {
//     return actions.order
//       .create({
//         purchase_units: [
//           {
//             amount: { value: order.totalPrice },
//           },
//         ],
//       })
//       .then((orderID) => {
//         return orderID;
//       });
//   }

//   const deliverHandler = async () => {
//     await deliverOrder(orderId);
//     refetch();
//   };

//   return isLoading ? (
//     <Loader />
//   ) : error ? (
//     <Message variant='danger'>{error.data.message}</Message>
//   ) : (
//     <>
//       <h1>Order {order._id}</h1>
//       <Row>
//         <Col md={8}>
//           <ListGroup variant='flush'>
//             <ListGroup.Item>
//               <h2>Shipping</h2>
//               <p>
//                 <strong>Name: </strong> {order.user.name}
//               </p>
//               <p>
//                 <strong>Email: </strong>{' '}
//                 <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
//               </p>
//               <p>
//                 <strong>Address:</strong>
//                 {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
//                 {order.shippingAddress.postalCode},{' '}
//                 {order.shippingAddress.country}
//               </p>
//               {order.isDelivered ? (
//                 <Message variant='success'>
//                   Delivered on {order.deliveredAt}
//                 </Message>
//               ) : (
//                 <Message variant='danger'>Not Delivered</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Payment Method</h2>
//               <p>
//                 <strong>Method: </strong>
//                 {order.paymentMethod}
//               </p>
//               {order.isPaid ? (
//                 <Message variant='success'>Paid on {order.paidAt}</Message>
//               ) : (
//                 <Message variant='danger'>Not Paid</Message>
//               )}
//             </ListGroup.Item>

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {order.orderItems.length === 0 ? (
//                 <Message>Order is empty</Message>
//               ) : (
//                 <ListGroup variant='flush'>
//                   {order.orderItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={1}>
//                           <Image
//                             src={item.image}
//                             alt={item.name}
//                             fluid
//                             rounded
//                           />
//                         </Col>
//                         <Col>
//                           <Link to={`/product/${item.product}`}>
//                             {item.name}
//                           </Link>
//                         </Col>
//                         <Col md={4}>
//                           {item.qty} x ${item.price} = ${item.qty * item.price}
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <Card>
//             <ListGroup variant='flush'>
//               <ListGroup.Item>
//                 <h2>Order Summary</h2>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Items</Col>
//                   <Col>${order.itemsPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Shipping</Col>
//                   <Col>${order.shippingPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Tax</Col>
//                   <Col>${order.taxPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               <ListGroup.Item>
//                 <Row>
//                   <Col>Total</Col>
//                   <Col>${order.totalPrice}</Col>
//                 </Row>
//               </ListGroup.Item>
//               {!order.isPaid && (
//                 <ListGroup.Item>
//                   {loadingPay && <Loader />}

//                   {/* {isPending ? (
//                     <Loader />
//                   ) : (
//                     <div> */}
//                       {/* THIS BUTTON IS FOR TESTING! REMOVE BEFORE PRODUCTION! */}
//                       {/* <Button
//                         style={{ marginBottom: '10px' }}
//                         onClick={onApproveTest}
//                       >
//                         Test Pay Order
//                       </Button> */}
// {/* 
//                       <div>
//                         <PayPalButtons
//                           createOrder={createOrder}
//                           onApprove={onApprove}
//                           onError={onError}
//                         ></PayPalButtons>
//                       </div> */}
//                     {/* </div> */}
//                   {/* )} */}
//                 {/* </ListGroup.Item> */}
//               {/* )} */}

//               {loadingDeliver && <Loader />}

//               {userInfo &&
//                 userInfo.isAdmin &&
//                 order.isPaid &&
//                 !order.isDelivered && (
//                   <ListGroup.Item>
//                     <Button
//                       type='button'
//                       className='btn btn-block'
//                       onClick={deliverHandler}
//                     >
//                       Mark As Delivered
//                     </Button>
//                   </ListGroup.Item>
//                 )}
//             </ListGroup>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };



















// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


















// import React from 'react'
// import { useEffect } from 'react';
// import { Link, useParams , useNavigate} from 'react-router-dom';
// import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// // import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
// import { toast } from 'react-toastify';
// import Message from '../components/Message';
// import Loader from '../components/Loader';
// import {
//   useDeliverOrderMutation,
//   useGetOrderDetailsQuery,
//   // useGetPaypalClientIdQuery,
//   usePayOrderMutation,
// } from '../slices/ordersApiSlices';

// import { useSelector, useDispatch } from 'react-redux';



// import { useCreateOrderMutation } from '../slices/ordersApiSlices';


// const OrderScreen = () => {
//     const cart = useSelector((state) => state.cart);
//   // const PlaceOrderScreen = () => {
//   //   const navigate = useNavigate();
//   //   const dispatch = useDispatch();
  
//   //   useEffect(()=>{
//   //     if(!cart.shippingAddress.address){
//   //       navigate('/shipping')
//   //     }else if(!cart.paymentMethod){
//   //       navigate('/payment')
//   //     }
//   //   },[cart.paymentMethod, cart.shippingAddress.address, navigate])
    
  
//     const [createOrder, {isLoading, error}] = useCreateOrderMutation();
  
  
//   // const placeOrderHandler = async () => {
//   //   try {
//   //     const res = await createOrder({
//   //       orderItems: cart.cartItems,
//   //       shippingAddress: cart.shippingAddress,
//   //       paymentMethod: cart.paymentMethod,
//   //       itemsPrice: cart.itemsPrice,
//   //       shippingPrice: cart.shippingPrice,
//   //       taxPrice: cart.taxPrice,
//   //       totalPrice: cart.totalPrice,
//   //     }).unwrap();
//   //     dispatch(clearCartItems());
//   //     alert("your order has been created")
//   //     navigate(`/`);
//   //   } catch (err) {
//   //     toast.error(err);
//   //   }
//   // }
//   // const { id:orderId } = useParams();

//   // const { data:order,isLoading,error,refetch}
//   return (
//     <>
//       <Row className="justify-content-center">
//         <Col md={8}>
          
//           <ListGroup variant='flush'>
            

//             <ListGroup.Item>
//               <h2>Order Items</h2>
//               {cart.cartItems.length === 0 ?(
//                 <p>No items in cart</p>
//               )
//               : (
//                 <ListGroup variant='flush'>
//                   {cart.cartItems.map((item, index) => (
//                     <ListGroup.Item key={index}>
//                       <Row>
//                         <Col md={2}>
//                           <Image src={item.image} alt={item.name} fluid rounded />
//                         </Col>
//                         <Col>
//                           <h3>{item.name}</h3>
//                         </Col>
//                         <Col>
//                           <h3>{item.qty} * ${item.price} = ${item.price * item.qty}</h3>
//                         </Col>
//                       </Row>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               )}
//             </ListGroup.Item>


//           </ListGroup>
//         </Col>
//         <Col md={4}>
//           <ListGroup variant='flush'>
//           <ListGroup.Item>
//             <h2>Order Summary</h2>
//           </ListGroup.Item>
//             <ListGroup.Item>
//               <Row>
//                 <Col>Items Price: </Col>
//                 <Col>
//                     {cart.itemsPrice}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>Shipping: </Col>
//                 <Col>
//                     {cart.shippingPrice}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>Tax: </Col>
//                 <Col>
//                     {cart.taxPrice}
//                 </Col>
//               </Row>
//               <Row>
//                 <Col>Total: </Col>
//                 <Col>
//                     {cart.totalPrice}
//                 </Col>
//               </Row>
//             </ListGroup.Item>
//               {error ? 
//                 ( <ListGroup.Item>
//                     { error && <Message variant='danger'>{error}</Message>}
//                 </ListGroup.Item>)
//                 : (<></>)
//               }


//               <ListGroup.Item>
//                 <h2>Payment Detail</h2>
//                 <strong>Payment Method: </strong>
//                 {cart.paymentMethod}
//                 <p>
//                 <strong>Address: </strong>
//                 {cart.shippingAddress.address},
//                 {cart.shippingAddress.city},
//                 {cart.shippingAddress.postalCode},
//                 {cart.shippingAddress.country}
//               </p>
//               </ListGroup.Item>

//             <ListGroup.Item>
//               <Button
//                 type='button'
//                 className='btn-block'
//                 disabled={cart.cartItems.length === 0}
//               >
//                 Place Order
//               </Button>
//               { isLoading && <Loader />}
//             </ListGroup.Item>
//           </ListGroup>
//         </Col>
//       </Row>
//     </>
//   )
// }

// export default OrderScreen;






// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!












import { useEffect } from 'react';
import { Link, useParams , useNavigate} from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
// import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  // useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from '../slices/ordersApiSlices';

import { useSelector, useDispatch } from 'react-redux';



const OrderScreen = () => {
  const {id:orderId} = useParams()
  
  const { data: order,refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)
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
                <Message variant='success'>
                  Delivered on {order.deliveredAt}
                  </Message>
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
          </ListGroup>
        </Col>
        </Row>

      </>)
  
}

export default OrderScreen