import React, { Fragment, useEffect } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import logo from '../../assets/icons/myrkle-logo-white.png'
import MobileSidebar from '../MobileSidebar/MobileSidebar.jsx'
import * as Styles from './header.js'
import { useDispatch, useSelector } from 'react-redux'
import useSubmit from '../../Hooks/Submit.js'
import { getUser, logout } from '../../app/auth/authSlice.js'
import { getActiveAlgorandWallet } from '../../app/algorand/algorandSlice.js'

function Header() {
    const { pathname } = useLocation() 
    const history = useHistory()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { handleSubmit } = useSubmit()

    const getUserSuccessCallback = () => {
        dispatch(getActiveAlgorandWallet())
    }

    const getUserErrorCallback = () => {
        dispatch(logout())
        history.push('/login')
        // window.location.replace('https://mintengine.org')
    }
 
    useEffect(() => {
        if (localStorage.getItem('mint-engine')) {
          handleSubmit(getUser(), getUserSuccessCallback, getUserErrorCallback);
        }
    }, [])


    return (
        <Fragment>
            <Styles.Root>
                <div className="container">
                    <div className="left">
                        <a href="https://mintengine.org">
                            <img src={logo} alt="" />
                            {/* <span>Myrkle</span> */}
                        </a>
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
        </Fragment>
    )
}

export default Header
