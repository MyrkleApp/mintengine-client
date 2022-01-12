import React, { useState } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../components/FormControl/FormControl'
import { Button } from '../../components/UI/Button/button'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Styles from './settings'

function Settings() {
    const [open, setOpen] = useState(false)

    const handleShowDetails = () => {
        setOpen(true)
    }

    return (
        <DashboardWrapper>
            <Styles.Root open={open}>
                <div className="left">
                    <button className="navItems" onClick={handleShowDetails}>Change Details</button><br />
                    <button className="navItems" onClick={handleShowDetails}>My Wallet Address</button><br />
                    <button className="navItems" onClick={handleShowDetails}>Add New Wallet</button>
                </div>
                
                <div className="right">
                    <ArrowBackIcon className="arrowIcon" onClick={() => setOpen(false)} />
                    <Grid container>
                        <FormControl 
                            label="Username"
                            icon
                            type="text"
                        />
                        <FormControl 
                            label="Current Password"
                            type="password"
                        /> 
                        <FormControl 
                            label="New Password"
                            type="password"
                        /> 
                        <FormControl 
                            label="Confirm New Password"
                            type="password"
                        />  
                        <Button fullWidth disabled>save my changes</Button>
                    </Grid>
                </div>
            </Styles.Root>
        </DashboardWrapper>
    )
}

export default Settings
