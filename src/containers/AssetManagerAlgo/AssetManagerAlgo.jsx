import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { AssetItem } from '../../components/AssetItem/AssetItem'
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
import Modal from '../../components/UI/Modal/Modal'
import CloseIcon from '@mui/icons-material/Close';
import { CloseModalBox } from '../../pages/AssetManager/assetManager'
import { CLAWBACK, DESTROY, FREEZE, MODIFY, OPT_IN, OPT_OUT, UNFREEZE } from './constants'
import OptIn from './manageAssets/OptIn'
import OptOut from './manageAssets/OptOut'
import Freeze from './manageAssets/Freeze'
import Unfreeze from './manageAssets/Unfreeze'
import Clawback from './manageAssets/Clawback'
import Modify from './manageAssets/Modify'
import Destroy from './manageAssets/Destroy'


function AssetManagerAlgo() {
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const [manageAsset, setManageAsset] = useState('')

    const handleOptInModal = () => {
        setManageAsset(OPT_IN)
        handleModalOpen();
    }

    const handleOptOutModal = () => {
        setManageAsset(OPT_OUT)
        handleModalOpen();
    }

    const handleFreezeModal = () => {
        setManageAsset(FREEZE)
        handleModalOpen();
    }

    const handleUnfreezeModal = () => {
        setManageAsset(UNFREEZE)
        handleModalOpen();
    }

    const handleClawbackModal = () => {
        setManageAsset(CLAWBACK)
        handleModalOpen();
    }

    const handleModifyModal = () => {
        setManageAsset(MODIFY)
        handleModalOpen();
    }

    const handleDestroyModal = () => {
        setManageAsset(DESTROY)
        handleModalOpen();
    }

    return (
        <Fragment>
            <Modal open={modalState} handleClose={handleModalClose}>
                <CloseModalBox onClick={handleModalClose}>
                    <CloseIcon fontSize="large" />
                </CloseModalBox>
                { manageAsset === OPT_IN && <OptIn handleModalClose={handleModalClose} /> }
                { manageAsset === OPT_OUT && <OptOut handleModalClose={handleModalClose} /> }
                { manageAsset === FREEZE && <Freeze handleModalClose={handleModalClose} /> }
                { manageAsset === UNFREEZE && <Unfreeze handleModalClose={handleModalClose} /> }
                { manageAsset === CLAWBACK && <Clawback handleModalClose={handleModalClose} /> }
                { manageAsset === MODIFY && <Modify handleModalClose={handleModalClose} /> }
                { manageAsset === DESTROY && <Destroy handleModalClose={handleModalClose} /> }
                
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
                <AssetItem color="#e5f2ff" onClick={handleOptInModal}>
                    <div className="container">
                        <img src={optInIcon} alt="" />
                    </div>
                    <span>Add Token</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6" onClick={handleOptOutModal}>
                    <div className="container">
                        <img src={optOutIcon} alt="" />
                    </div>
                    <span>Remove Token</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3f2f3" onClick={handleFreezeModal}>
                    <div className="container">
                        <img src={freezeIcon} alt="" />
                    </div>
                    <span>Freeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e5e9ff" onClick={handleUnfreezeModal}>
                    <div className="container">
                        <img src={unfreezeIcon} alt="" />
                    </div>
                    <span>Unfreeze</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#f3e9fb" onClick={handleClawbackModal}>
                    <div className="container">
                        <img src={clawbackIcon} alt="" />
                    </div>
                    <span>Clawback</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#e9ecfc" onClick={handleModifyModal}>
                    <div className="container">
                        <img src={modifyIcon} alt="" />
                    </div>
                    <span>Modify</span>
                </AssetItem>
            </Grid>
            <Grid item xs={6} md={4} lg={2}>
                <AssetItem color="#ffe5e6" onClick={handleDestroyModal}>
                    <div className="container">
                        <img src={destroyIcon} alt="" />
                    </div>
                    <span>Delete Token</span>
                </AssetItem>
            </Grid>
        </Fragment>
    )
}

export default AssetManagerAlgo
