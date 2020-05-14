import React, {useState, Fragment} from 'react'


const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] =useState(0)

    const handleChange = (e) => {
        handleFilters(e.target.value)
        setValue(e.target.value)
    }

    return (
        prices.map((p, i) => {
            return (
                <div key={i}>
                    <input onChange={handleChange} value={`${p.id}`} name={p} type="radio" className="" />
                    <label className="form-check-label">{p.name}</label>
                </div>
            )
        })
    )
}

export default RadioBox