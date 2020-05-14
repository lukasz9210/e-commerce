import React, {useState, useEffect} from 'react'
import Layout from './Layout.js'
import {getProducts} from './apiCore.js'
import Card from './Card.js'
import Search from './Search.js'
import '../style.css'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([])
    const [productsByArrival, setProductsByArrival] = useState([])
    const [error, setError] = useState('')

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsBySell(data)
            }
        })
    }

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setProductsByArrival(data)
            }
        })
    }

    useEffect(() => {
        loadProductsBySell()
        loadProductsByArrival()
    }, [])

    return (<Layout title="Home" description="Home description" className="container-fluid">
        <div className="home">
            <Search />
            <h2 className="mb-4">Best sellers</h2>
            <div className="d-flex flex-wrap">
            {productsBySell.map((product, i) => (
                <Card product={product} key={i} showViewProductBtn={true} removeItemBtn={false} />
            ))}
            </div>
        
            <h2 className="mb-4">New arrivals</h2>
            <div className="row">
                <div className="d-flex flex-wrap">
                {productsByArrival.map((product, i) => (
                    <Card product={product} key={i} showViewProductBtn={true} removeItemBtn={false} />
                ))}
                </div>
            </div>
        </div>
    </Layout>)
}


export default Home