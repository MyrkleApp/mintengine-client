import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickAwayListener from 'react-click-away-listener';
import { HTTP_STATUS } from '../../constants/httpStatus';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAlgorandHoldings } from '../../app/algorand/algorandSlice';
import noAssetImage from '../../assets/icons/noAssetImage.jpeg'
import useCheckImageExists from '../../Hooks/checkImageExists';
import { availableNetworks } from './SelectWithoutDropdown';

function SelectInput({ half, exchange, name, label, value, handleChange, handleItemClick, asset, readOnly, hideInput, handleFocus, placeholder }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { status, data } = useSelector(state => state.algorand.holdings)
    const network = useSelector(state => state.network.network)

    useEffect(() => {
        if (open && !data) {
            dispatch(getAlgorandHoldings())
        }
    }, [open])

    const toggleSelect = () => {
        setOpen(prevState => !prevState)
    }

    const handleClickAway = () => {
        setOpen(false)
    }

    const handleDropdownClick = () => {
        handleItemClick({ id: 0, amount: 0, image: algorandLogo })
        setTimeout(() => setOpen(false), 100)
    }

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root exchange={exchange} hideInput={hideInput}>
                <label>{label}</label>
                    <div className="container">
                        <div className="select" onClick={toggleSelect}>
                            <div className="left">
                                <img 
                                    src={(asset?.id === 0 ? availableNetworks[network].image : asset?.image) || noAssetImage} 
                                    alt="" 
                                />
                                <span>{asset?.id === 0 ? availableNetworks[network].unit : asset?.unit}</span>
                            </div>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="rightBox">
                            <input
                                name={name}
                                value={value}
                                onChange={handleChange}
                                readOnly={readOnly}
                                onFocus={handleFocus}
                                placeholder={placeholder}
                            />
                        </div>
                    </div>

                <Styles.DropdownContainer show={open}>
                    {
                        status === HTTP_STATUS.PENDING ? (
                            <Styles.LoaderContainer>
                                <ThreeDots
                                    height="15"
                                    width="100"
                                    color='gray'
                                    ariaLabel='loading'
                                />
                            </Styles.LoaderContainer>
                        ) : (
                            (data?.length > 0)
                                ?
                                data?.map(asset => (
                                    <DropdownItem
                                        key={asset.id}
                                        asset={asset}
                                        handleItemClick={handleItemClick}
                                        setOpen={setOpen}
                                    />
                                ))
                                :
                                <Styles.LoaderContainer>
                                    <span>No assets found</span>
                                </Styles.LoaderContainer>
                        )
                    }
                </Styles.DropdownContainer>
            </Styles.Root>
        </Grid>
    )
}

function DropdownItem({ asset, handleItemClick, setOpen }) {
    const { tinyManAssetImage } = useCheckImageExists(asset.id)

    const handleClick = () => {
        handleItemClick(asset)
        setTimeout(() => setOpen(false), 100)
    }

    return (
        <Styles.DropdownItem onClick={handleClick}>
            <div className="left">
                <div className="leftTop">
                    <img src={ tinyManAssetImage || (asset.image || noAssetImage) } alt="" />
                    <span>{asset.name}</span>
                </div>
                <div className="leftBottom">
                    <span>{asset.unit}</span>
                </div>
            </div>
            <div className="right">
                <div className="rightTop">
                    <span>{asset.amount}</span>
                </div>
                <div className="rightBottom">
                    <span>Asset ID:</span>
                    <span>{asset.id}</span>
                </div>
            </div>
        </Styles.DropdownItem>
    )
}

export default SelectInput
