import React, {useState, useEffect} from 'react'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {getBraintreeClientToken, processPayment, createOrder} from './apiCore.js'
import DropIn from 'braintree-web-drop-in-react'
import {emptyCart} from './cartHelper.js'

const Checkout = ({products}) => {
    const [data, setData] = useState({
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        adress: ''
    })


    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    useEffect(() => {
        console.log('isAuthenticated',isAuthenticated())
        getToken(userId, token)
    }, [])

    const getToken = () => {
        getBraintreeClientToken(userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
                setData({error: data.error})
            } else {
                console.log(data)
                setData({clientToken: data.clientToken})
            }
        })
    }

    let deliveryAdress = data.adress

    const buy = () => {
        let nonce;
        let getNonce = data.instance.requestPaymentMethod()
        .then(data => {
            console.log('data1',data)
            nonce = data.nonce
            //console.log('nonce', nonce)
            const paymentData = {
                paymentMethodNonce: nonce,
                amountFromTheClient: 20
            }
            processPayment(userId, token, paymentData).then(response => {
                console.log('response', response)
                setData({...data, success: response.success})

                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount,
                    address: deliveryAdress
                }

                createOrder(userId, token, orderData)
                // clear card
                emptyCart(() => {
                    console.log("Transaction success, cart is empty")
                })
            }).catch(error => {
                console.log('err1',error)
            })
        })
        .catch(error => {
            console.log('err2',error)
            setData({...data, error: error.message})
        })
    }

    const handleAdress = e => {
        setData({...data, adress: e.target.value})
    }

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Thanks! Your payment was successfull.
        </div>
    )

    const showDropIn = () => (
        <div>
            {data.clientToken !== null && products.length > 0 ? (
                <div>
                    <div className="gorm-froup mb-3">
                        <label className="text-muted">Delivery adress:</label>
                        <textarea onChange={handleAdress} className="form-control" value={data.adress} placeholder="Deliery adress">
                        </textarea>
                    </div>
                    <DropIn
                        options={{ authorization: data.clientToken }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
            ) : null }
        </div>
    )
    
    const getTotal = () => {
        products.reduce(function(previousValue, currentValue, index, array) {
            return previousValue.price + currentValue.price;
          }, 0);
    }

    return (
        <div>
            <h5 onClick={() => {console.log(getTotal())}}>{`Total ${getTotal()}`}</h5>
            {showError(data.error)}
            {showSuccess(data.success)}
            {isAuthenticated() ? (
                <div>{showDropIn()}</div>
            ) : (
                <Link to="/signup"><button className="btn btn-primary">Sign up to checkout</button></Link>
            )}
        </div>
    )
}

export default Checkout