import React, { useState } from 'react'
import * as Styles from './algorandAddressItem'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CopyButtonWithTooltip from '../../components/UI/MyTooltip/MyTooltip'
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useSubmit from '../../Hooks/Submit'
import { getAllAlgorandWallets, removeWallet } from '../../app/algorand/algorandSlice';
import { HTTP_STATUS } from '../../constants/httpStatus';
import Modal from '../UI/Modal/Modal';
import ModalResponse from '../ModalResponse/ModalResponse';
import useModal from '../../Hooks/Modal';


function AlgorandAddressItem({ walletAddress, walletId, handleClick }) {
    const activeWalletAddress = useSelector(state => state.algorand.activeWallet.data?.address)

    return (
        <Styles.Root active={activeWalletAddress === walletAddress}>
            <p onClick={handleClick}>{walletAddress}</p>
            <div className="iconsContainer">
                <CopyButtonWithTooltip 
                    textToCopy={walletAddress} 
                    onlyIcon
                />
                <RemoveWallet 
                    walletId={walletId} 
                />
            </div>
        </Styles.Root>
    )
}



function RemoveWallet({ walletId }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch()
    const { handleSubmit } = useSubmit()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const removeWalletSuccessCallback = () => {
        handleModalOpen()
        dispatch(getAllAlgorandWallets())
    }

    const handleRemoveWallet = () => {
        handleSubmit(removeWallet({ id: walletId }), removeWalletSuccessCallback, handleModalOpen)
    }

    const { status } = useSelector(state => state.algorand.removeWallet)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <React.Fragment>

            <DeleteIcon 
                onClick={handleClick} 
                style={{ cursor: 'pointer', marginTop: '20px' }}
            />
                
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleRemoveWallet}>
                    Remove Wallet
                </MenuItem>
            </Menu>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 'Successfully removed your wallet from Myrkle' : 'Something went wrong while trying to remove your wallet'
                    }
                />
            </Modal>
        </React.Fragment>
    );
}


export default AlgorandAddressItem
