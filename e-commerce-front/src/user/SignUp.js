import React, {useState} from 'react'
import Layout from '../core/Layout.js'
const API = process.env.REACT_APP_API_URL
//require('dotenv').config();


const SignUp = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        signUp({name, email, hashed_password: password}).then(data => {
            console.log('data', data)
            //window.setTimeout(() => {console.log('data', data)}, 2000)
            
            if(data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    success: true
                })
            }
        })
    }

    const signUp = (user) => {
        // console.log(name, email, password)
        return fetch(`${API}/signup`, {
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

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div className="alert alert-info" style={{display: success ? "" : "none"}}>
            Account created!
        </div>
    )

    const signUpForm = () => (
        <form>
            <div>
                <div className="form-group">
                    <label className="text-muted">Name:</label>
                    <input onChange={handleChange('name')} className="form-control" type="text" value={name} name="name"/>
                </div>

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
                title="SignUp"
                description="Pleas signup"
                className="container">
                {showSuccess()}
                {showError()}
                {signUpForm()}
                {JSON.stringify(values)}
            </Layout>
}

export default SignUp