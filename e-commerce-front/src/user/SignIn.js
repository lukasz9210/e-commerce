import React, {useState} from 'react'
import Layout from '../core/Layout.js'
import {Redirect} from 'react-router-dom'
import {autheticate} from '../auth'
import {isAuthenticated} from '../auth/'
const API = process.env.REACT_APP_API_URL
//require('dotenv').config();



const SignIn = () => {
    const [values, setValues] = useState({
        email: 'lukasz@test.pl',
        password: 'aaffffefewfwf',
        error: '',
        role: 0,
        success: false,
        redirectToReferer: false
    })

    const {user} = isAuthenticated()
    const {email, password, success, error, redirectToReferer, role} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signIn({email, password}).then(data => {
            console.log('data', data)
            //window.setTimeout(() => {console.log('data', data)}, 2000)
            
            if(data.err) {
                setValues({...values, error: data.err, success: false})
            } else {
                autheticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferer: true
                    })
                })
            }
        })
    }

    const signIn = (user) => {
        return fetch(`${API}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(res => {
            return res.json()
        }).catch(err => {
            setValues({
                ...values,
                error: err,
                success: false
            })
        })
    }

    const redirectUser = () => {
        if(redirectToReferer) {
            if(user.role === 1) {
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
            return <Redirect to="/" />
        }
        
    }

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
    )


    const signInForm = () => (
        <form>
            <div>
                <div className="form-group">
                    <label className="text-muted">Email:</label>
                    <input onChange={handleChange('email')} className="form-control" type="text" name="email" value={email} />
                </div>

                <div className="form-group">
                    <label className="text-muted">Password:</label>
                    <input onChange={handleChange('password')} className="form-control" type="text" value={password} name="password"/>
                </div>
                <button onClick={handleSubmit} type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>
    )
    return <Layout
                title="SignIn"
                description="Please sign in"
                className="container">
                {showError()}
                {signInForm()}
                {redirectUser()}
            </Layout>
}

export default SignIn