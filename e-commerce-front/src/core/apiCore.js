import queryString from 'query-string'
const API = process.env.REACT_APP_API_URL




export const getProducts = (sortBy) => {
    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=8`, {
        method: 'GET'
    }).then(res => {return res.json()}).catch(err => {console.log(err)})
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(res => {return res.json()}).catch(err => {console.log(err)})
}


export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {skip, limit, filters}
    return fetch(`${API}/products/by/search/`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGMwNmRlNTg4MzViMTEzOTE2NmU0MGYiLCJpYXQiOjE1NzI4OTI1MTR9._oWt3VvZJ__stYbm9aWe4QgdZb006cAAZGHTp3NJ-pU`
        },
        body: JSON.stringify(data)
    }).then(res => {
        //console.log('rrrrres3', res)
        return res.json()
    }).catch(err => {
        console.log('eeeeeerrrrres3', err)
        console.log(err)
    })
}


export const list = params => {
    const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET'
    }).then(res => {return res.json()}).catch(err => {console.log(err)})
}




export const productRead = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    }).then(res => {return res.json()}).catch(err => {console.log(err)})
}


export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }).then(res => {
        //console.log('rrrrres3', res)
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}



export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}




export const createOrder = (userId, token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({order: orderData})
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}