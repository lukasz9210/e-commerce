import React, {useState, useEffect} from 'react'
import {getCategories} from './apiCore.js'
import {list} from './apiCore.js'
import Card from './Card.js'

const Search = () => {
    const [data, setData] = useState({
        categories: [],
        category: '',
        search: '',
        results: []
    })

    const {categories, category, search, results} = data

    const searchData = () => {
        //console.log('SD', category, search)
        list({search: search || undefined, category: category}).then(res => {
            if(res.error) {
                console.log(res.error)
            } else {
                setData({...data, results: res})
            }
        })
    }

    const searchSubmit = e => {
        e.preventDefault()
        searchData()
    }

    const handleChange = name => e => {
        setData({...data, [name]: e.target.value})
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
            <div className="input-group input-group-log">
                {/* <div className="input-group-prepend">
                    <select className="btn mb-2" onChange={handleChange('category')}>
                        <option value="all">All</option>
                        {categories.map((c, i) => (
                            <option key={i} value={c._id}>{c.name}</option>
                        ))}
                    </select>
                </div> */}
                <input type="search" onChange={handleChange('search')} className="form-control" placeholder="Search by name"/>
            </div>
            <div className="btn input-group-append">
                <button type="submit" className="input-group-text">Search</button>
            </div>
            </span>
        </form>
    )

    const loadCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setData({...data, categories: data})
            }
        })
    }

    useEffect(() => {
        loadCategories()
    }, [])

    return (
        <div>
            <div className="row">
                <div className="container">
                    <h2>Search bar</h2>
                    {searchForm()}
                </div>
            </div>
            <div>
                {results  && (<h2 class="mb-4">Search results</h2>)}
                <div className="d-flex flex-wrap">
                    {results && results.map((r,i) => {
                        return <Card product={r} key={i} removeItemBtn={false} />
                    })}
               
                </div>
            </div>
        </div>
        
    )
}

export default Search