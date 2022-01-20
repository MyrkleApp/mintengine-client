import React from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
    return (
        <div className="notFound">
            <div className="notFound__content">
                <div className="notFound__oops">
                    Oops!
                </div>
                <div className="notFound__header">
                    404 - PAGE NOT FOUND
                </div>
                <div className="notFound__text">
                    The page you are looking for might have been removed or had its name changed or is temporarily unavailable.
                </div>
                <div>
                    <Link to ="/" style={{textDecoration: 'none'}}>
                        <buttton className="notFound__btn">GO BACK TO HOME PAGE</buttton>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound
