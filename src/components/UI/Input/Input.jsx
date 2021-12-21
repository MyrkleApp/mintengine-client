import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from'./input'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Input({ half, label, name, type, placeholder, helperText, error, value, handleChange, handleBlur, toggleShowPassword, visible }) {

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
                    onBlur={handleBlur}
                    // required
                />
                <Styles.HelperText error={error}>{helperText}</Styles.HelperText>

                {
                    !visible 
                    ?   <VisibilityOutlinedIcon className="icon" onClick={toggleShowPassword} /> 
                    :   <VisibilityOffOutlinedIcon className="icon" onClick={toggleShowPassword} />
                }
            </Styles.Root>
        </Grid>
    )
}

export default Input
