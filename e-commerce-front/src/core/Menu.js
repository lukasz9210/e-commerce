import React from 'react'
import {Link, withRouter, Redirect} from 'react-router-dom'
import {signout, isAuthenticated} from '../auth'
import {itemTotal} from './cartHelper.js'

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#f3ce12'}
    }
    else {
        return {color: '#fff'}
    }
}

const Menu = ({history}) => {
    return (
        <div className="bg-primary">
            <div className="container">
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/")} to="/">Home</Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/user/dashboard")} to="/user/dashboard">User Dashboard</Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/admin/dashboard")} to="/admin/dashboard">Admin Dashboard</Link>
                    </li>
                )}
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/shop")} to="/shop">Shop</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, "/cart")} to="/cart">
                    Cart
                        <sup><small className="cart-total">{itemTotal()}</small></sup>
                    </Link>
                </li>

                {!isAuthenticated() && (
                    <div>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signup")} to="/signup">SignUp</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/signin")} to="/signin">SignIn</Link>
                    </li>
                    </div>
                )
                }

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                     <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, "/admin/orders")} to="/admin/orders">Orders</Link>
                    </li>
                )}

                {isAuthenticated() && (
                    <div>
                    <li className="nav-item">
                        <span className="nav-link" onClick={() => {signout(() => {
                        history.push('/')
                        })}}>Sign OUT</span>
                    </li>
                   
                    </div>
                )
                }
                
               
            </ul>
            </div>
        </div>
    )
}

export default withRouter(Menu)