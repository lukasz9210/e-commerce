import React, {useState, useEffect} from 'react'
import Layout from './Layout.js'
import Card from './Card.js'
import {getCategories} from './apiCore.js'
import Checkbox from './Checkbox.js'
import {prices} from './fixedPrices.js'
import RadioBox from './RadioBox.js'
import {getFilteredProducts} from './apiCore.js'

const Shop = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState('')
    const [allFilters, setAllFilters] = useState({
        filters: {category: [], price: []}
    })
    const [limit, setLimit] = useState(50)
    const [skip, setSkip] = useState(0)
    const [filterResoults, setFilterResoults] = useState([])

    const init = () => {
        getCategories().then(data => {
            //console.log('getcat', data)
            if(data.err) {
                console.log(data.error)
                setError(data.error)
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init()
        handleFilterResoults(skip, limit, allFilters.filters)
        // getFilteredProducts(skip, limit, allFilters.filters).then(data => {
        //     if(data.error) {
        //         setError(data.error)
        //     } else {
        //         setFilterResoults(data.data)
        //     }
        // })
    }, [])

    const handlePrice = value => {
        let array = []
        for (let key in prices) {
            if (prices[key].id === parseInt(value)) {
                array = prices[key].array
            }
        }
        return array
    }

    const handleFilters = (filters, filterBy) => {
        const currentFilters = {...allFilters}
        currentFilters.filters[filterBy] = filters
        
        if(filterBy === 'price') {
            let procesValues = handlePrice(filters)
            currentFilters.filters[filterBy] = procesValues
        }
        setAllFilters(currentFilters)
        handleFilterResoults(allFilters.filters)
        //console.log('SHOP', filters, filterBy)
        //console.log('currentFilters', currentFilters)
    }

    const handleFilterResoults = newFilters => {
        //console.log('nf',newFilters)
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if(data.error) {
                setError(data.error)
            } else {
                setFilterResoults(data.data)
            }
        })
    }

    return (
        <Layout title="Shop page" description="Shop page description" className="container-fluid">
            <div className="d-flex">
                <div className="sidebar">
                    <div>
                        <h4>Search by category</h4>
                        <Checkbox handleFilters={filters => handleFilters(filters, 'category')} categories={categories} />
                    </div>
                    <div>
                        <h4>Search by proce</h4>
                        <RadioBox handleFilters={filters => handleFilters(filters, 'price')} prices={prices} />
                    </div>
                </div>
                <div className="shop-products">
                    <h2>Products</h2>
                    
                        <div className="mb-3 d-flex flex-wrap">
                       {filterResoults.map((p, i) => (
                            <Card key={i} product={p} showViewProductBtn={true} removeItemBtn={false} />
                       ))}
                       </div>
                    </div>
            </div>
        </Layout>
    )
}

export default Shop