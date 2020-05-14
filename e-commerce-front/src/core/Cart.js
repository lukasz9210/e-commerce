import React, {useState, useEffect} from 'react'
import {getCart} from './cartHelper.js'
import Layout from './Layout.js'
import Card from './Card.js'
import Checkout from './Checkout.js'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        setCartItems(getCart())
    }, [])

    const showItems = () => {
        return (
            <div>
                <h2>{`Your cart has ${cartItems.length} items`}</h2>
                <hr />
                <div>
                    {cartItems.map((item, index) => <Card product={item} key={index} showCount={true} updateCount={true} showAddToCartBtn={false} removeItemBtn={true} />)}
                </div>
            </div>
        )
    }

    const noItemsMessage = () => (
        <div>
            <h3>You dont have items in your cart</h3>
        </div>
    )

    return (
        <Layout title="Cart" description="Manage your cart items" className="container" >
            <div className="row">
                <div className="col-6">
                    {cartItems.length > 0 ? showItems() : noItemsMessage()}
                </div>
                <div className="col-6">
                    <h3>Checkout</h3>
                    <Checkout products={cartItems}/>
                </div>
            </div>
         
        </Layout>
    )
}

export default Cart