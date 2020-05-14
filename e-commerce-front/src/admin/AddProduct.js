import React, {useState, useEffect} from 'react'
import Layout from '../core/Layout.js'
import {createProduct, getCategories} from './apiAdmin.js'
import { isAuthenticated } from '../auth/index.js'



const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        lading: false,
        error: '',
        createdProduct: '',
        redirectedToProfile: false,
        formData: ''
    })

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        photo,
        loading,
        error,
        createdProduct,
        redirectedToProfile,
        formData
    } = values

    const {user, token} = isAuthenticated()

    const init = () => {
        getCategories().then(data => {
            //console.log('getcat', data)
            if(data.err) {
                console.log(data.error)
            } else {
                setValues({...values, categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        // for (var value of formData.values()) {
        //     console.log(value); 
        //  }

        setValues({...values, error: '', loading: true})
        createProduct(user._id, token, formData).then(data => {
            if(data.error) {
                console.log('1', data.error)
                setValues({...values, error: data.error, loading: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    price: '',
                    photo: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name,
                    error: ''
                })
            }

        })
    }

    const addProductForm = () => (
        <form className="mb-3">
            <h4>Product photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" value={name} onChange={handleChange('name')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea value={description} onChange={handleChange('description')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" value={price} onChange={handleChange('price')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" value={quantity} onChange={handleChange('quantity')} className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">category</label>
                <select onChange={handleChange('category')} className="form-control" >
                    <option>Select category</option>
                    {categories && categories.map((cat, i) => 
                         (<option value={cat._id} key={i}>{cat.name}</option>)
                    )}
                </select>
            </div>
            <div className="form-group">
                <label className="text-muted">shipping</label>
                <select onChange={handleChange('shipping')} className="form-control" >
                    <option value="1">YES</option>
                    <option value="0">NO</option>
                </select>
            </div>
           <button onClick={handleSubmit} type="sumbit" className="btn btn-primary">Send</button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: createdProduct ? '' : 'none'}}>
            <h2>`${createProduct.name} is creayed!`</h2>
        </div>
    )

    const showLoading = () => 
        loading && (<div className="alert alert-success">
                <h2>Loading...</h2>
            </div>)
    

    return (
        <Layout title="Add new product" description="Adding new product page" className="container-fluid">
            <div className="col-8">
                {showLoading()}
                {showError()}
                {showSuccess()}
                {addProductForm()}
            </div>
        </Layout>
    )
}



export default AddProduct