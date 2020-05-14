import React, {useState} from 'react'


const Checkbox = ({categories, handleFilters}) => {
    const [checked, setChecked] = useState([])
    
    const handleChange = id => () => {
        const isCategoryInState = checked.indexOf(id)
        const currentstateCat = [...checked]
        if(isCategoryInState === -1) {
            currentstateCat.push(id)
        } else {
            currentstateCat.splice(isCategoryInState, 1)
        }
        //console.log('categories', currentstateCat)
        handleFilters(currentstateCat)
        setChecked(currentstateCat)
    }

    return (
        categories.map((c, i) => {
            return (
                <li key={i} className="list-unstyled">
                    <input onChange={handleChange(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            )
        })
    )
}

export default Checkbox