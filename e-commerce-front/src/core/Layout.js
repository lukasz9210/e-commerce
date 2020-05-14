import React from 'react'
import Menu from './Menu.js'

const Layout = ({title = 'Title', description = "description", className, children}) => (
    <div>
        <Menu />
        <div className="jumbotron">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className={`${className} children-wrapper`}>{children}</div>
    </div>
)

export default Layout