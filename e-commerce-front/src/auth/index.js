const API = process.env.REACT_APP_API_URL

export const autheticate = (data, next) => {
    if(typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data))
        next()
    }
    
}

export const signout = (next) => {
    if(typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        return fetch(`${API}/signout`, {
            method: "GET"
        }).then(res => {
            //console.log('signout', res)
            next()
        }).catch(err => {
            console.log(err)
        })
    }
}

export const isAuthenticated = () => {
    if(typeof window === 'undefined') {
        return false
    }
    const jwt = localStorage.getItem("jwt")
    //console.log('JWT', jwt)
    if(jwt) {
        return JSON.parse(jwt)
    }
    else {
        return false
    }
}