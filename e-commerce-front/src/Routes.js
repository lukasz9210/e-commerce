import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import SignUp from './user/SignUp.js'
import SignIn from './user/SignIn.js'
import Home from './core/Home.js'
import PrivateRoute from './auth/PrivateRoute.js'
import UserDashboard from './user/UserDashboard.js'
import AdminRoute from './auth/AdminRoute.js'
import AdminDashboard from './user/AdminDashboard.js'
import AddCategory from './admin/AddCategory.js'
import AddProduct from './admin/AddProduct.js'
import Shop from './core/Shop.js'
import Product from './core/Product.js'
import Cart from './core/Cart.js'
import Orders from './admin/Orders.js'
import Profile from './user/Profile.js'
import ManageProducts from './admin/ManageProducts.js'
import UpdateProduct from './admin/UpdateProduct.js'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/cart" exact component={Cart} />
                <AdminRoute path="/product/create" exact component={AddProduct} />
                <Route path="/product/:productId" exact component={Product} />
                <PrivateRoute path="/user/dashboard" component={UserDashboard} />
                <PrivateRoute path="/user/:userId" component={Profile} />
                <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
                <AdminRoute path="/category/create" component={AddCategory} />
                <AdminRoute path="/admin/orders" component={Orders} />
                <AdminRoute path="/admin/products" component={ManageProducts} />
                <AdminRoute path="/admin/product/update/:productId" component={UpdateProduct} />
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes