import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from'./input'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Input({ half, label, name, type, placeholder, error, value, handleChange, toggleShowPassword, visible }) {

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root>
                <label>{label}</label>
                <Styles.CustomInput
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    // required
                    error={error}
                />
                {/* <span>Error message</span> */}
                {/* {
                label.toLowerCase().includes('password') &&
                <img src={`/images/${visible ? 'watch-filled.png' : 'watch.png'}`} alt="" onClick={toggleShowPassword} />
            } */}

                <VisibilityOutlinedIcon className="icon" />
            </Styles.Root>
        </Grid>
    )
}

export default Input
