import { Grid } from '@mui/material'
import React, { Fragment } from 'react'
import ModalResponse from '../../../components/ModalResponse/ModalResponse'
import Modal from '../../../components/UI/Modal/Modal'
import useFormControl, { useFormControlPasswordCheck } from '../../../Hooks/FormControl'
import FormControl from '../../../components/FormControl/FormControl'
import { changePassword } from '../../../app/auth/authSlice'
import { Button } from '../../../components/UI/Button/button'
import { useSelector } from 'react-redux'
import { HTTP_STATUS } from '../../../constants/httpStatus'
import useSubmit from '../../../Hooks/Submit'
import useModal from '../../../Hooks/Modal'

function ChangePassword() {
    const { handleSubmit } = useSubmit()
    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const {
        value: currentPasswordValue,
        handleChange: handleCurrentPasswordChange,
        toggleVisibile: toggleCurrentPasswordVisibile,
        typeForPasswordInput: typeForCurrentPasswordInput
    } = useFormControl()

    const {
        value: newPasswordValue,
        handleChange: handleNewPasswordChange,
        toggleVisibile: toggleNewPasswordVisibile,
        typeForPasswordInput: typeForNewPasswordInput,
        handlePasswordBlur: handleNewPasswordBlur,
        helperText: newPasswordHelpertext
    } = useFormControl()

    const {
        value: confirmPasswordValue,
        handleConfirmPasswordChange,
        toggleVisibile: toggleConfirmPasswordVisibile,
        typeForPasswordInput: typeForConfirmPasswordInput,
        helperText: confirmPasswordHelperText
    } = useFormControl()

    const { passwordsAreValid } = useFormControlPasswordCheck(newPasswordValue, confirmPasswordValue)

    const handleChangePassword = () => {
        const changePasswordData = {
            old_password: currentPasswordValue,
            new_password1: newPasswordValue,
            new_password2: confirmPasswordValue
        }
        handleSubmit(changePassword(changePasswordData), handleModalOpen, handleModalOpen)
    }

    const { status, error } = useSelector(state => state.auth.changePassword)
    const success = status === HTTP_STATUS.FULFILLED

    return (
        <Fragment>
            <Grid container className="changeDetails">
                <FormControl
                    icon
                    label="Current Password"
                    value={currentPasswordValue}
                    handleChange={handleCurrentPasswordChange}
                    type={typeForCurrentPasswordInput}
                    toggleShowPassword={toggleCurrentPasswordVisibile}
                />
                <FormControl
                    icon
                    label="New Password"
                    value={newPasswordValue}
                    handleChange={handleNewPasswordChange}
                    type={typeForNewPasswordInput}
                    toggleShowPassword={toggleNewPasswordVisibile}
                    handleBlur={handleNewPasswordBlur}
                    helperText={newPasswordHelpertext}
                    error={newPasswordHelpertext && true}
                />
                <FormControl
                    icon
                    label="Confirm New Password"
                    value={confirmPasswordValue}
                    handleChange={(e) => handleConfirmPasswordChange(e, newPasswordValue)}
                    type={typeForConfirmPasswordInput}
                    toggleShowPassword={toggleConfirmPasswordVisibile}
                    helperText={confirmPasswordHelperText}
                    error={confirmPasswordHelperText && true}
                />
                <Button fullWidth disabled={!passwordsAreValid || (currentPasswordValue.length === 0)} onClick={handleChangePassword}>save my changes</Button>
            </Grid>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 
                        'Your password has been changed successfully' : 
                        (error?.old_password[0] ? 'The entered current password is incorrect' : 'Sorry, your password could not be changed')
                    }
                />
            </Modal>
        </Fragment>
    )
}

export default ChangePassword