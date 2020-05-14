import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout.js'
import {getProducts, deleteProduct} from './apiAdmin.js'
import { isAuthenticated } from '../auth/index.js'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const token = isAuthenticated().token
    const userId = isAuthenticated().user._id

    const loadProducts = () => {
        getProducts().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, userId, token).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
        console.log('prodfucts', products)
    }, [])

    return (
        <Layout title="Manage products" description="Perform CRUD on products" className="container-fluid">
            <h2 className="">Total products: {products.length}</h2>
            <div className="row">
               <div className="col-12">
                    <ul className="list-group">
                        {products.map((p,i) => (
                            <li key={i} className="list-group-item d-flex justify-content-between align-content-center">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`}>
                                    <span className="badge badge-warning badge-pill">Update</span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge badge-warning badge-pill">Delete</span>
                            </li>
                        ))}
                    </ul>
               </div>
            </div>
        </Layout>
    )
}

export default ManageProducts