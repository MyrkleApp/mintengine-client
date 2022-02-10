import React, { useState } from 'react'
import { Grid } from '@mui/material'
import FormControl from '../../components/FormControl/FormControl'
import { Button } from '../../components/UI/Button/button'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import * as Styles from './settings'
import { useHistory } from 'react-router'
import { ALGORAND_ADDRESS, CHANGE_DETAILS, MY_WALLET_ADDRESS, RIPPLE_ADDRESS } from './constants'
import useTabs from '../../Hooks/Tabs'
import MyTabs from '../../components/MyTabs/MyTabs'
import AlgorandAddressItem from '../../components/AlgorandAddressItem/AlgorandAddressItem'
import useFormControl from '../../Hooks/FormControl'

const tabs = [ALGORAND_ADDRESS, RIPPLE_ADDRESS]

function Settings() {
    const history = useHistory()
    const [detailsToShow, setDetailsToShow] = useState(CHANGE_DETAILS)
    const [openDetailsForMobile, setOpenDetailsForMobile] = useState(false)
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const {
        value: currentPasswordValue,
        handleChange: handleCurrentPasswordChange,
        toggleVisibile: toggleCurrentPasswordVisibile,
        typeForPasswordInput: typeForCurrentPasswordInput
    } = useFormControl()

    const {
        value: newPasswordValue,
        handleChange: handleNewPasswordChange,
        toggleVisibile: toggleNewPasswordVisibile,
        typeForPasswordInput: typeForNewPasswordInput
    } = useFormControl()

    const {
        value: confirmPasswordValue,
        handleChange: handleConfirmPasswordChange,
        toggleVisibile: toggleConfirmPasswordVisibile,
        typeForPasswordInput: typeForConfirmPasswordInput
    } = useFormControl()

    const handleChangeDetails = () => {
        setDetailsToShow(CHANGE_DETAILS)
        setOpenDetailsForMobile(true)
    }

    const handleMyWalletAddress = () => {
        setDetailsToShow(MY_WALLET_ADDRESS)
        setOpenDetailsForMobile(true)
    }

    const handleAddNewWallet = () => {
        history.push('/wallet-setup')
    }

    return (
        <DashboardWrapper>
            <Styles.Root open={openDetailsForMobile}>
                <div className="left">
                    <button className="navItems" onClick={handleChangeDetails}>Change Details</button><br />
                    <button className="navItems" onClick={handleMyWalletAddress}>My Wallet Address</button><br />
                    <button className="navItems" onClick={handleAddNewWallet}>Add New Wallet</button>
                </div>

                <div className="right">
                    <ArrowBackIcon className="arrowIcon" onClick={() => setOpenDetailsForMobile(false)} />
                    {
                        detailsToShow === CHANGE_DETAILS && (
                            <Grid container className="changeDetails">
                                <FormControl
                                    icon
                                    label="Current Password"
                                    value={currentPasswordValue}
                                    handleChange={handleCurrentPasswordChange}
                                    type={typeForCurrentPasswordInput}
                                    toggleShowPassword={toggleCurrentPasswordVisibile}
                                />
                                <FormControl
                                    icon
                                    label="New Password"
                                    value={newPasswordValue}
                                    handleChange={handleNewPasswordChange}
                                    type={typeForNewPasswordInput}
                                    toggleShowPassword={toggleNewPasswordVisibile}
                                />
                                <FormControl
                                    icon
                                    label="Confirm New Password"
                                    value={confirmPasswordValue}
                                    handleChange={handleConfirmPasswordChange}
                                    type={typeForConfirmPasswordInput}
                                    toggleShowPassword={toggleConfirmPasswordVisibile}
                                />
                                <Button fullWidth disabled>save my changes</Button>
                            </Grid>
                        )
                    }

                    {
                        detailsToShow === MY_WALLET_ADDRESS && (
                            <Grid container>
                                <MyTabs 
                                    tabs={tabs}
                                    tabValue={tabValue}
                                    handleTabChange={handleTabChange}
                                />
                                <AlgorandAddressItem />
                                <AlgorandAddressItem />
                            </Grid>
                        )
                    }
                </div>
            </Styles.Root>
        </DashboardWrapper>
    )
}

export default Settings
