import React from 'react'
const API = process.env.REACT_APP_API_URL

const ShowImage = ({item, url}) => {
    return (
        <div className="product-img">
            <img 
                className="mb-3"
                alt={item.name}
                src={`${API}/${url}/photo/${item._id}`}
                style={{maxWidth: "100%", maxHeight: "100%"}}
            />
        </div>
    )
}

export default ShowImage