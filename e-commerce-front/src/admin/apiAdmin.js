const API = process.env.REACT_APP_API_URL




export const createCategory = (userId, token, category) => {
    // console.log(name, email, password)
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name:category})
    }).then(res => {
        //console.log('rrrrres3', res)
        return res.json()
    }).catch(err => {
        console.log('eeeeeerrrrres3', err)
        console.log(err)
    })
}


export const createProduct = (userId, token, product) => {
    // console.log(name, email, password)
    //console.log('product', product)
    return fetch(`${API}/product/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        //console.log('rrrrres3', res)
        return res.json()
    }).catch(err => {
        //console.log('eeeeeerrrrres3', err)
        console.log(err)
    })
}

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    }).then(res => {return res.json()}).catch(err => {console.log(err)})
}


export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}


export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}



export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({status, orderId})
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}


export const getProducts = () => {
    // console.log(name, email, password)
    return fetch(`${API}/products?limit=100`, {
        method: 'GET',
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const getProduct = (productId) => {
    // console.log(name, email, password)
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(res => {
        return res.json()
    }).catch(err => {
        console.log(err)
    })
}