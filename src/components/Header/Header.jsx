import React, { Fragment, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import logo from '../../assets/icons/logo.svg'
import MobileSidebar from '../MobileSidebar/MobileSidebar'
import * as Styles from './header'
import { useSelector } from 'react-redux'
import useSubmit from '../../Hooks/Submit'
import { getUser } from '../../app/auth/authSlice'


function Header() {
    const { pathname } = useLocation() 
    const history = useHistory()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { handleSubmit } = useSubmit()
 
    useEffect(() => {
        if (localStorage.getItem('mint-engine')) {
          handleSubmit(getUser(), () => history.push('/wallet'), (err) => console.log(err));
        }
    }, [])

    return (
        <Fragment>
            <Styles.Root>
                <div className="container">
                    <div className="left">
                        <Link to="/">
                            <img src={logo} alt="" />
                            <span>Mint Engine</span>
                        </Link>
                    </div>
                    <div className={ `right ${pathname === '/' ? 'hideRight' : ''}` }>
                        {
                            !isLoggedIn && (
                                <Link to={ pathname === '/signup' ? '/login' : '/signup' }>
                                    { pathname === '/signup' ? 'LOGIN' : 'SIGN UP' }
                                </Link>
                            )
                        }
                        <MobileSidebar />   
                    </div>
                </div>
            </Styles.Root>
            {/* <Styles.WhiteStripe /> */}
        </Fragment>
    )
}

export default Header
