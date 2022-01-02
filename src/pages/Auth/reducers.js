export const passwordReducer = (state, action) => {
    switch (action.type) {
        case 'SIGNUP_PASSWORD_INPUT':
            return {
                ...state,
                passwordValue: action.passwordValue,
                passwordHelperText: 'Minimum of 8 characters in length, include a number.',
                passwordError: false,
                passwordIsValid: (action.passwordValue.trim().length >= 8) && (/\d/.test(action.passwordValue))
            }
        case 'SIGNUP_PASSWORD_BLUR':
            return {
                ...state,
                passwordHelperText: state.passwordIsValid ? '' : action.passwordHelperText,
                passwordError: !state.passwordIsValid,
            }
        case 'CONFIRM_PASSWORD_INPUT':
            return {
                ...state,
                confirmPasswordValue: action.confirmPasswordValue,
                confirmPasswordHelperText: (action.confirmPasswordValue.trim().length > 0 && action.confirmPasswordIsValid === false) ? 'Password does not match' : '',
                confirmPasswordError: !action.confirmPasswordIsValid,
                confirmPasswordIsValid: action.confirmPasswordIsValid
            }
        case 'LOGIN_PASSWORD_INPUT':
            return {
                ...state,
                passwordValue: action.passwordValue,
                passwordIsValid: (action.passwordValue.trim().length >= 8) && (/\d/.test(action.passwordValue))
            }
        case 'LOGIN_ERROR':
            return {
                ...state,
                passwordHelperText: action.passwordHelperText,
                passwordError: true
            }
        default:
            return state
    }
}