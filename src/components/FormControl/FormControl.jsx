import React, { useImperativeHandle, useRef } from 'react'
import { Grid } from '@mui/material'
import * as Styles from'./formControl'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const Input = React.forwardRef((props, ref) => {
    const { half, label, name, type, placeholder, helperText, error, value, handleChange, handleBlur, toggleShowPassword, icon, center, textArea, handleClick, readOnly } = props;

    const inputRef = useRef()

    const click = () => {
        inputRef.current.click()
    }

    useImperativeHandle(ref, () => {
        return {
            click: click
        }
    })

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
                        ref={inputRef}
                        // onClick={handleClick}
                        readOnly={readOnly}
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
                        <img src={icon} alt="" className="icon" onClick={handleClick} />
                    )
                }
            </Styles.Root>
        </Grid>
    )
})

export default Input
