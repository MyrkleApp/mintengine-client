import React from 'react'
import * as Styles from './sidebar'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import WebAssetOutlinedIcon from '@mui/icons-material/WebAssetOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const { pathname } = useLocation()

    const activeLink = (link) => {
        return pathname === link
    }

    return (
        <Styles.Root>
            <div className="container">
                <Link to="/wallet" style={{ textDecoration: 'none' }}>
                    <Styles.NavItem active={activeLink('/wallet')}>
                        <AccountBalanceWalletOutlinedIcon />
                        <span>WALLET</span>
                    </Styles.NavItem>
                </Link>
                <Link to="/transactions" style={{ textDecoration: 'none' }}>
                    <Styles.NavItem active={activeLink('/transactions')}>
                        <HistoryOutlinedIcon />
                        <span>TRANSACTIONS</span>
                    </Styles.NavItem>
                </Link>
                <Link to="/asset-manager" style={{ textDecoration: 'none' }}>
                    <Styles.NavItem active={activeLink('/asset-manager')}>
                        <WebAssetOutlinedIcon />
                        <span>ASSET MANAGER</span>
                    </Styles.NavItem>
                </Link>
                <Link to="#" style={{ textDecoration: 'none' }}>
                    <Styles.NavItem>
                        <CompareArrowsOutlinedIcon />
                        <span>EXCHANGE</span>
                    </Styles.NavItem>
                </Link>
                <Link to="#" style={{ textDecoration: 'none' }}>
                    <Styles.NavItem>
                        <SettingsOutlinedIcon />
                        <span>SETTINGS</span>
                    </Styles.NavItem>
                </Link>
                
                <Styles.Line />

                <Styles.NavItem style={{ cursor: 'pointer' }}>
                    <LogoutOutlinedIcon style={{ color: 'red' }} />
                    <span>LOGOUT</span>
                </Styles.NavItem>

            </div>
        </Styles.Root>
    )
}

export default Sidebar
