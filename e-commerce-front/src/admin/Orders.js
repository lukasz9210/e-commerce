import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout.js'
import {listOrders, getStatusValues, updateOrderStatus} from './apiAdmin.js'
import { isAuthenticated } from '../auth/index.js'
import moment from 'moment'



const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    useEffect(() => {
        console.log()
        loadOrders()
        loadStatusValues()
    }, [])

    const {user, token} = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    const handleStatusChange = (e, orderId) => {
        console.log('update order status')
        updateOrderStatus(user._id, token, orderId, e.target.value)
        .then(data => {
            if(data.error) {
                console.log('Status update failed', data.error)
            } else {
                loadOrders()
            }
        })
    }

    const showStatuses = o => (
        <div className="form-group">
            <h3 className="mark mb-4">Status: {o.status}</h3>
            <select className="form-control" onChange={e => handleStatusChange(e, o._id)}>
                <option>Update Status</option>
                {statusValues.map((status,i) => {
                    return (
                        <option key={i} value={status}>{status}</option>
                    )
                })}
            </select>
        </div>
    )

    const showOrdersLength = orders => {
        if(orders.length > 0) {
            return (
                <h3 className="text-danger display-2">
                    {`Total orders: ${orders.length}`}
                </h3>
            )
        } else {
            return (
                <h3 className="text-danger">No orders!</h3>
            )
        }
    }

    const showInput = (key, value) => (
        <div className="input group mb-2 mr-sm-2">
            <div className="input-group-prepend">
                <div className="input-group-text">{key}</div>
                <input type="text" value={value} className="form-control" readOnly/>
            </div>
        </div>
    )


    return (
        <Layout title="Orders" description="You can manage all the orders here" className="container-fluid">
            <div className="">
                {showOrdersLength(orders)}
                {orders.map((o, OIndex) => {
                    return (
                        <div className="mb-2" key={OIndex} style={{borderBottom: "5px solid indigio"}}>
                            <h2 className="mb-2">
                                <span className="bg-primary">Order ID: {o._id}</span>
                            </h2>
                            <ul className="list-group mb2">
                                <li className="list-group-item">{showStatuses(o)}</li>
                                <li className="list-group-item">Transaction ID: {o.transaction_id}</li>
                                <li className="list-group-item">Amount: {o.amount}</li>
                                <li className="list-group-item">Ordered by: {o.user.name}</li>
                                <li className="list-group-item">Ordered on: {moment(o.createdAt).fromNow()}</li>
                                <li className="list-group-item">Delivered address:: {o.address}</li>
                            </ul>

                            <h3 className="mt-4 mb-4 font-italic">
                                Total products in the order: {o.products.length}
                            </h3>
                            {o.products.map((p,pIndex) => {
                                return (
                                    <div className="mb-4" key={pIndex} style={{padding: "20px", border: "1px solid indigo"}}>
                                        {showInput('Product name', p.name)}
                                        {showInput('Product price', p.price)}
                                        {showInput('Product total', p.count)}
                                        {showInput('Product id', p._id)}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </Layout>
    )
}



export default Orders