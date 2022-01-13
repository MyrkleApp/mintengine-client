import React from 'react'
import * as Styles from './sidebar'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../app/authSlice'

function Sidebar({ mobile }) {
    const { pathname } = useLocation()
    const history = useHistory()
    const dispatch = useDispatch()
    const userToken = useSelector(state => state.auth.token)

    const activeLink = (link) => {
        return pathname === link
    }

    const handleLogout = () => {
        history.push('/')
        dispatch(logout())
    }

    const mainContent = <>
        <Link to="/wallet" style={{ textDecoration: 'none' }}>
            <Styles.NavItem mobile={mobile} active={activeLink('/wallet')}>
                <AccountBalanceWalletOutlinedIcon />
                <span>WALLET</span>
            </Styles.NavItem>
        </Link>
        <Link to="/transactions" style={{ textDecoration: 'none' }}>
            <Styles.NavItem mobile={mobile} active={activeLink('/transactions')}>
                <HistoryOutlinedIcon />
                <span>TRANSACTIONS</span>
            </Styles.NavItem>
        </Link>
        <Link to="/asset-manager" style={{ textDecoration: 'none' }}>
            <Styles.NavItem mobile={mobile} active={activeLink('/asset-manager')}>
                <WebAssetOutlinedIcon />
                <span>ASSET MANAGER</span>
            </Styles.NavItem>
        </Link>
        <Link to="#" style={{ textDecoration: 'none' }}>
            <Styles.NavItem mobile={mobile}>
                <CompareArrowsOutlinedIcon />
                <span>EXCHANGE</span>
            </Styles.NavItem>
        </Link>
        <Link to="/settings" style={{ textDecoration: 'none' }}>
            <Styles.NavItem mobile={mobile} active={activeLink('/settings')}>
                <SettingsOutlinedIcon />
                <span>SETTINGS</span>
            </Styles.NavItem>
        </Link>
        
        <Styles.Line />

        <Styles.NavItem mobile={mobile} onClick={handleLogout} style={{ cursor: 'pointer' }}>
            <LogoutOutlinedIcon style={{ color: 'red' }} />
            <span>LOGOUT</span>
        </Styles.NavItem>
    </>

    return (
        <Styles.Root>
            <div className="container">
            { 
                !mobile 
                ? mainContent
                : 
                <>
                {
                    userToken 
                    ? mainContent 
                    :
                    <>
                        <Link to="/signup" style={{ textDecoration: 'none' }}>
                            <Styles.NavItem mobile={mobile} active={activeLink('/signup')}>
                                <span>SIGN UP</span>
                            </Styles.NavItem>
                        </Link>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Styles.NavItem mobile={mobile} active={activeLink('/login')}>
                                <span>LOGIN</span>
                            </Styles.NavItem>
                        </Link>
                    </>
                }
                </>
            }
            </div>
        </Styles.Root>
    )
}

export default Sidebar
