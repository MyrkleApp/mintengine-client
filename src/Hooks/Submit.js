import { useDispatch } from 'react-redux'
import { hideBackdrop, showBackdrop } from '../app/backdrop/backdropSlice'

function useSubmit() {
    const dispatch = useDispatch()

    const handleSubmit = (submitData, nextAction, handleError) => {
        dispatch(showBackdrop())

        dispatch(submitData)
        .unwrap()
        .then(() => {
            dispatch(hideBackdrop())
            if (nextAction) {
                nextAction()
            }
        })
        .catch(() => {
            dispatch(hideBackdrop())
            if (handleError) {
                handleError()
            }
        })
    }

    return {
        handleSubmit
    }
}

export default useSubmit