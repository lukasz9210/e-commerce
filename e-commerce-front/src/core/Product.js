import React, {useState, useEffect} from 'react'
import Layout from './Layout.js'
import {productRead} from './apiCore.js'
import Card from './Card.js'

const Product = (props) => {
    const [product, setProduct] = useState({})
    const [error, setError] = useState('')

    const loadProduct = productId => {
        //console.log('000')
        productRead(productId).then(data => {
                if(data.error) {
                    console.log('1111',error)
                    setError(data.error)
                } else {
                    console.log('fwefewf')
                    setProduct(data)
                }
        })
    }

    useEffect(() => {
        const id = props.match.params.productId
        console.log('id', id)
        loadProduct(id)
    }, [])


    return (
        <Layout title={product.name} description={product.description} className="container" >
            <div className="row">
                <Card product={product} showViewProductBtn={false} removeItemBtn={false} />
            </div>
         
        </Layout>
    )
}

export default Product