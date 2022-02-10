import { Grid } from '@mui/material'
import React from 'react'
import * as Styles from'./formControl'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

function Input(props) {
    const { half, label, name, type, placeholder, helperText, error, value, handleChange, handleBlur, toggleShowPassword, icon, center, textArea } = props;

    return (
        <Grid item xs={ half ? 6 : 12 }>
            <Styles.Root center={center}>
                <label>{label}</label>
                {
                    !textArea ? 
                    <Styles.CustomInput
                        icon={icon}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        center={center}
                        required={type === 'date' ? true : false}
                    /> :
                    <Styles.TextArea
                        icon={icon}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        center={center}
                    /> 
                }
                <Styles.HelperText error={error}>{helperText}</Styles.HelperText>

                {
                    typeof(icon) === 'boolean' && (
                        type === 'password' 
                        ?   <VisibilityOutlinedIcon className="icon" onClick={toggleShowPassword} /> 
                        :   <VisibilityOffOutlinedIcon className="icon" onClick={toggleShowPassword} /> 
                    ) 
                }
                {
                    typeof(icon) === "string" && (
                        <img src={icon} alt="" className="icon" />
                    )
                }
            </Styles.Root>
        </Grid>
    )
}

export default React.memo(Input)
