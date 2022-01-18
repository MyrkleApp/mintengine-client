import React, { useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function SelectInput({ half }) {
    const [open, setOpen] = useState(false)

    const toggleSelect = () => {
        setOpen(prevState => !prevState)
    }

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root>
                <label>Amount</label>
                <div className="container">
                    <div className="select" onClick={toggleSelect}> 
                        <div className="left">
                            <img src={algorandLogo} alt="" />
                            <span>ALGO</span>
                        </div>
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                <Styles.DropdownContainer show={open}>
                    <Styles.DropdownItem>
                        <div className="left">
                            <div className="leftTop">
                                <img src={algorandLogo} alt="" />
                                <span>ALGORAND</span>
                            </div>
                            <div className="leftBottom">
                                <span>ALGO</span>
                            </div>
                        </div>
                        <div className="right">
                            <div className="rightTop">
                                <span>0.00</span>
                            </div>
                            <div className="rightBottom">
                                <span>Asset ID:</span> 
                                <span>384303832</span>
                            </div>
                        </div>
                    </Styles.DropdownItem>
                    <Styles.DropdownItem>
                        <div className="left">
                            <div className="leftTop">
                                <img src={algorandLogo} alt="" />
                                <span>ALGORAND</span>
                            </div>
                            <div className="leftBottom">
                                <span>ALGO</span>
                            </div>
                        </div>
                        <div className="right">
                            <div className="rightTop">
                                <span>0.00</span>
                            </div>
                            <div className="rightBottom">
                                <span>Asset ID:</span> 
                                <span>384303832</span>
                            </div>
                        </div>
                    </Styles.DropdownItem>
                    <Styles.DropdownItem>
                        <div className="left">
                            <div className="leftTop">
                                <img src={algorandLogo} alt="" />
                                <span>ALGORAND</span>
                            </div>
                            <div className="leftBottom">
                                <span>ALGO</span>
                            </div>
                        </div>
                        <div className="right">
                            <div className="rightTop">
                                <span>0.00</span>
                            </div>
                            <div className="rightBottom">
                                <span>Asset ID:</span> 
                                <span>384303832</span>
                            </div>
                        </div>
                    </Styles.DropdownItem>
                
                </Styles.DropdownContainer>
            </Styles.Root>
        </Grid>
    )
}

export default SelectInput
