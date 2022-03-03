import React, { useEffect, useState } from 'react'
import { Grid } from '@mui/material'
import * as Styles from './selectInput'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import { HTTP_STATUS } from '../../constants/httpStatus';
import { ThreeDots } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import questionMarkImg from '../../assets/icons/questionMark.jpg'

function SelectWithoutDropdown({ half, name, label, value, handleChange, asset }) {
    const dispatch = useDispatch()

    return (
        <Grid item xs={half ? 6 : 12}>
            <Styles.Root>
                <label>{label}</label>
                <div className="container">
                    <div className="select">
                        <div className="left">
                            <img src={asset?.img ? asset?.img : algorandLogo} alt="" />
                            <span>{asset?.name || 'ALGO'}</span>
                        </div>
                    </div>
                    <div className="rightBox">
                        <input
                            name={name}
                            value={value}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </Styles.Root>
        </Grid>
    )
}

export default SelectWithoutDropdown
