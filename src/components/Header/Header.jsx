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
                        <Link to="/">
                            Mint Engine
                        </Link>
                    </div>
                    <div className={ `right ${pathname === '/' ? 'hideRight' : ''}` }>
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
