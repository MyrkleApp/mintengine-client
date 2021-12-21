import React, { Fragment } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import * as Styles from './header'


function Header() {
    const { pathname } = useLocation() 

    return (
        <Fragment>
            <Styles.Root>
                <div className="container">
                    <div className="left">
                        Mint Engine
                    </div>
                    <div className="right">
                        <Link to={ pathname === '/signup' ? '/login' : '/signup' }>
                            { pathname === '/signup' ? 'LOGIN' : 'SIGNUP' }
                        </Link>
                    </div>
                </div>
            </Styles.Root>
            <Styles.WhiteStripe />
        </Fragment>
    )
}

export default Header
