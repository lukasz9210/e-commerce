import React, {useState, useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout.js'
import {read, update, updateUser} from './apiUser.js'
import {isAuthenticated} from '../auth'



const Profile = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const {name, email, password, error, success } = values
    const {token} = isAuthenticated()



    const init = (userId, token) => {
        console.log('userId', userId)
        console.log('token', token)
        read(userId, token).then(data => {
            if(data.error) {
                setValues({...values, error: true})
            } else {
                setValues({...values, name: data.name, email: data.email})
            }
        })
    }

    useEffect(() => {
        init(match.params.userId, token)
    }, [])

    const handleChange = name => e => {
        setValues({...values, error: false, [name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        update(match.params.userId, token, {name,email, password}).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    })
                })
            }
        })
    }

    const redirect = success => {
        if(success) {
            return <Redirect to="/cart" />
        }
}

    const updateUserForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">User name</label>
                <input type="text" onChange={handleChange('name')} name="name" className="form-control" value={name} />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" onChange={handleChange('email')} name="email" className="form-control" value={email} />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" onChange={handleChange('password')} name="password" className="form-control" value={password} />
            </div>
            <button className="btn btn-primary" onClick={handleSubmit}>Sumbit</button>
        </form>
    )
   
    return <Layout
                title="User profile"
                description="Please sign in"
                className="container">
                {updateUserForm(name, email, password)}
                {redirect(success)}
            </Layout>
}

export default Profile