import React, {useState} from 'react'
import Layout from '../core/Layout.js'
import {createCategory} from './apiAdmin.js'
import { isAuthenticated } from '../auth/index.js'



const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const handleSubmit = e => {
        e.preventDefault()
        createCategory(user._id, token, name).then(data => {
            if(data.err) {
                setSuccess(false)
                setError(data.error)
            } else {
                setError('')
                setName('')
                setSuccess(true)
            }
        })
    }

    const handleChange = e => {
        setName(e.target.value)
    }

    const showSuccess = () => {
        if(success) {
            return (
                    <h3 className="text-success">Category created!</h3>
            )
        }
    }

    const showError = () => {
        if(error) {
            return (
                <h3 className="text-danger">Something went wrong :(</h3>
            )
        }
    }

    const addCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name:</label>
                <input className="form-control" type='text' value={name} onChange={handleChange} autofocus />
            </div>
            <input type="submit" className="btn btn-primary" />
        </form>
    )

   
        return (
            <Layout title="Add new category" description="Adding new category page" className="container-fluid">
                <div className="col-8">
                    {showSuccess()}
                    {showError()}
                    {addCategoryForm()}
                </div>
            </Layout>
            
        )
    
}


export default AddCategory