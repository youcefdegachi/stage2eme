import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar , Nav , Container,Badge, NavDropdown} from 'react-bootstrap'
import { FaShoppingCart , FaUser} from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap' // => npm i react-router-bootsrap
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice';
import { useSelector, useDispatch } from 'react-redux'

import SearchBox from './SearchBox';

import logo from "../assets/Y.png"
export default function Header() {
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.auth);
    // console.log(cartItems) => cartItems is a product
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () =>{
        try{
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        }catch(err){
            console.log(err);
        }
    }
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand href="#home">
                            <img src={logo} alt="proshop" className="logo" />
                            YoucefShop
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className='ms-auto'>
                            <SearchBox id="search "/>
                            <LinkContainer to="/cart">
                                <Nav.Link ><FaShoppingCart/> Cart
                                {
                                    cartItems.length > 0 &&(
                                        <Badge pill bg="success" style={{marginLeft: '5px'}}>
                                            {cartItems.reduce((a,c)=>a+c.qty, 0) }
                                        </Badge>
                                    )
                                }
                            </Nav.Link>
                            </LinkContainer>
                            { userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    {/* <LinkContainer to="/logout"> */}
                                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                    {/* </LinkContainer> */}
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login" ><FaUser/> Sign In</Nav.Link>
                                </LinkContainer>
                            ) }
                            { userInfo && userInfo.isAdmin ? (
                                <NavDropdown title='admin' >
                                
                                    <LinkContainer to="/admin/orderlist/">
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/userlist/">
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/productlist/">
                                        <NavDropdown.Item>Product</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                                ):(<></>)
                            }
                                
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}
