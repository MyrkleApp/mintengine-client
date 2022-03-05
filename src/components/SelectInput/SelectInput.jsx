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
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function SelectInput({ half, exchange, name, label, value, handleChange, handleItemClick, asset }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { status, data } = useSelector(state => state.algorand.holdings)

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

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root exchange={exchange}>
                <label>{label}</label>
                <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="container">
                        <div className="select" onClick={toggleSelect}>
                            <div className="left">
                                <img src={asset?.img ? asset?.img : algorandLogo} alt="" />
                                <span>{asset?.name || 'ALGO'}</span>
                            </div>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="rightBox">
                            <input
                                name={name}
                                value={value}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </ClickAwayListener>

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
                            (data?.assets?.length > 0)
                                ?
                                data?.assets?.map(asset => (
                                    <Styles.DropdownItem key={asset.id} onClick={() => handleItemClick(asset)}>
                                        <div className="left">
                                            <div className="leftTop">
                                                <img src={asset.img || questionMarkImg} alt="" />
                                                <span>{asset.name}</span>
                                            </div>
                                            <div className="leftBottom">
                                                <span>ALGO</span>
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

export default SelectInput
