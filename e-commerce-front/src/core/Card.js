import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './ShowImage.js'
import moment from 'moment'
import {addToCart, countUpdate, removeItem} from './cartHelper.js'



const Card = ({product, showCount = false, showViewProductBtn = true, showAddToCartBtn = true, updateCount = false, removeItemBtn=true}) => {
    const [redirect, setRedirect] = useState(false)
    const [count, setCount] = useState(product.count)
    const handleAddToCart = () => {
        addToCart(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if(redirect) {
            return <Redirect to="/cart" />
        }
    }

    const handleCountChange = productId => event => {
        const val = event.target.value
        setCount(val < 1 ? 1 : val)
        if(val > 1) {
            countUpdate(productId, val)
        }
    }

    return (
        <div className="card">
            <div className="card-header">
                <p>{product.name}</p>
            </div>
            <div className="card-body">
                {shouldRedirect(redirect)}
                <ShowImage item={product} url="product" />
                <p className="black-9">{product.description}</p>
                <p className="card-data d-flex align-items-center"><span className="text-muted">Price: </span><span className="font-weight-bold">{product.price}</span></p>
                <p className="card-data d-flex align-items-center"><span className="text-muted">Sold: </span><span className="font-weight-bold">{product.sold}</span></p>
                
                <p className="card-data d-flex align-items-center"><span className="text-muted">Quantity: </span><span className="font-weight-bold">{product.quantity}</span></p>
                {showCount && (
                    <p>COUNT: {product.count}</p>
                )}
                {/* <p>Category: {product.category} </p> */}
                <p className="black-8 created-date">Created: {moment(product.createdAt).fromNow()}</p>
                <div className="card-buttons">
                    {showViewProductBtn && (
                        <Link to={`/product/${product._id}`}>
                            <button className="btn btn-outline-primary">View product</button>
                        </Link>
                    )}
                    {showAddToCartBtn && (
                        <button onClick={handleAddToCart} className="btn btn-outline-primary">Add to card</button>
                    )}
                </div>
                    {updateCount && (
                        <div className="quantity-input d-flex">
                            <label>Wybierz ilość:</label>
                            <input type="number" className="form-control" onChange={handleCountChange(product._id)} />
                        </div>
                    )}

                {removeItemBtn && (
                    <div>
                        <button onClick={() => {removeItem(product._id)}}>Remove item</button>
                    </div>
                )}
                
            </div>
        </div>
    )
}


export default Card