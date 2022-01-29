import React, { useState } from 'react'
import { Fragment } from 'react'
import { AssetItem } from '../AssetItem/AssetItem'
import newAssetIcon from '../../assets/assetIcons/newAsset.png'
import optInIcon from  '../../assets/assetIcons/optIn.png'
import optOutIcon from  '../../assets/assetIcons/optOut.png'
import freezeIcon from  '../../assets/assetIcons/freeze.png'
import unfreezeIcon from  '../../assets/assetIcons/unfreeze.png'
import clawbackIcon from  '../../assets/assetIcons/clawback.png'
import modifyIcon from  '../../assets/assetIcons/modify.png'
import destroyIcon from  '../../assets/assetIcons/destroy.png'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import useModal from '../../Hooks/Modal'
import Modal from '../UI/Modal/Modal'
import FormControl from '../FormControl/FormControl'
import CloseIcon from '@mui/icons-material/Close';
import { ButtonContainer, CloseModalBox, ModalTitle } from '../../pages/AssetManager/assetManager'
import { Button } from '../UI/Button/button'
import { OPT_IN } from './constants'
import OptIn from './manageAssets/OptIn'

function AssetManagerAlgo() {
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const [manageAsset, setManageAsset] = useState('')

    const handleOptInModal = () => {
        setManageAsset(OPT_IN)
        handleModalOpen();
    }

    return (

        <Fragment>
            <Modal open={modalState} handleClose={handleModalClose}>
                <CloseModalBox onClick={handleModalClose}>
                    <CloseIcon fontSize="large" />
                </CloseModalBox>
                { manageAsset === OPT_IN && <OptIn /> }
                
            </Modal>
            <Grid item xs={6} md={4} lg={2}>
                <Link to="/new-assets" style={{ textDecoration: 'none' }}>
                    <AssetItem color="#e7fdf3">
                        <div className="container">
                            <img src={newAssetIcon} alt="" />
                        </div>
                        <span>New Asset</span>
                    </AssetItem>
                </Link>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5f2ff">
                    <div className="container">
                        <img src={optInIcon} alt="" />
                    </div>
                    <span>Opt-In</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6">
                    <div className="container">
                        <img src={optOutIcon} alt="" />
                    </div>
                    <span>Opt-Out</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3f2f3">
                    <div className="container">
                        <img src={freezeIcon} alt="" />
                    </div>
                    <span>Freeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5e9ff">
                    <div className="container">
                        <img src={unfreezeIcon} alt="" />
                    </div>
                    <span>Unfreeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3e9fb">
                    <div className="container">
                        <img src={clawbackIcon} alt="" />
                    </div>
                    <span>Clawback</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e9ecfc">
                    <div className="container">
                        <img src={modifyIcon} alt="" />
                    </div>
                    <span>Modify</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6">
                    <div className="container">
                        <img src={destroyIcon} alt="" />
                    </div>
                    <span>Destroy</span>
                </AssetItem>
            </Grid>
        </Fragment>
    )
}

export default AssetManagerAlgo
