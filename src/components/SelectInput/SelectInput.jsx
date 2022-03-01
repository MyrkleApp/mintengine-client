import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ClickAwayListener from 'react-click-away-listener';
import SelectItem from './SelectItem';
import { HTTP_STATUS } from '../../constants/httpStatus';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getAlgorandHoldings } from '../../app/algorand/algorandSlice';
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function SelectInput({ half, exchange, label, value, handleChange, handleItemClick }) {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const { status, data } = useSelector(state => state.algorand.holdings)
    const [selectedItem, setSelectedItem] = useState(null)

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
            <ClickAwayListener onClickAway={handleClickAway}>
                <Styles.Root exchange={exchange}>
                    <label>{label}</label>
                    <div className="container">
                        <div className="select" onClick={toggleSelect}> 
                            <div className="left">
                                <img src={ selectedItem ? (selectedItem.img || questionMarkImg) : algorandLogo } alt="" />
                                <span>{ selectedItem?.name || 'ALGO' }</span>
                            </div>
                            <KeyboardArrowDownIcon />
                        </div>
                        <div className="rightBox">
                            <input 
                                value={value}
                                onChange={handleChange}
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
                                (data?.assets?.length > 0)
                                ?
                                data?.assets?.map(asset => (
                                    <SelectItem
                                        key={asset.id}
                                        asset={asset}
                                        handleItemClick={handleItemClick}
                                        selected={selectedItem === asset}
                                        setSelectedItem={setSelectedItem}
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
            </ClickAwayListener>
        </Grid>
    )
}

export default SelectInput
