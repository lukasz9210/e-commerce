import React, {Fragment} from 'react'
import Layout from '../core/Layout.js'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'

const AdminDashboard = () => {

    const {user: {name, email, role}} = isAuthenticated()

    const adminLinks = () => (
        <div className="card">
            <h4 className="card-header">Admin Links</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/category/create">Create category</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/product/create">Create product</Link>
                </li>
                <li className="list-group-item">
                    <Link to="/admin/products">Manage products</Link>
                </li>
                
            </ul>
        </div>
    )

    const adminInfo = () => (
        <div className="card mb-5">
            <h3 className="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item">{name}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">{role == 1 ? "Admin" : "Regular User"}</li>
            </ul>
        </div>
    )


    return (
        <Fragment>
        <Layout
        title="Admin dashboard"
        description={`Hello ${name}`}
        />
        
        

        <div className="">
            {adminLinks()}
        </div>

        <div className="">
            {adminInfo()}
        </div>

        </Fragment>
    )
}

export default AdminDashboard