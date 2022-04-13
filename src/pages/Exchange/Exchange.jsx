import React, { useEffect, useState } from 'react'
import * as Styles from './exchange'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import { Grid } from '@mui/material'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import exchangeLogo from '../../assets/icons/exchange.png'
import { Button } from '../../components/UI/Button/button'
import useFormValidity from '../../Hooks/FormValidity'
import { useDispatch, useSelector } from 'react-redux'
import { checkAlgorandAssetIsValid, getAlgorandSwapValue, resetSwapValueData, swapAlgorand } from '../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../constants/httpStatus'
import Modal from '../../components/UI/Modal/Modal'
import ModalResponse from '../../components/ModalResponse/ModalResponse'
import useModal from '../../Hooks/Modal'
import useSubmit from '../../Hooks/Submit'
import { ThreeDots } from 'react-loader-spinner'
import { networkDataToReturn } from '../../constants/network'
import { LoaderContainer } from '../../containers/AssetManagerAlgo/assetManagerAlgo'
import { CustomDropdownContainer, CustomSelectBox, CustomSelectInput } from '../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../Hooks/CustomSelect'
import useFormControl from '../../Hooks/FormControl'
import { useSearchAssetByIdForExchange } from '../../Hooks/SearchAssetById'


function ExchangeAlgo() {
    const dispatch = useDispatch()
    const network = useSelector(state => state.network.network)
    const { data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()]);
    const passphrase = useSelector(state => state.algorand.passphrase)

    const {
        selectedItem: fromSelectedItem,
        setSelectedItem: setFromSelectedItem,
        dropdownIsOpen: fromDropdownIsOpen,
        setDropdownIsOpen: setFromDropdownIsOpen,
        toggleDropdownIsOpen: toggleFromDropdownIsOpen,
    } = useCustomSelect('initializeAsFilled')

    const {
        selectedItem: toSelectedItem,
        setSelectedItem: setToSelectedItem,
        dropdownIsOpen: toDropdownIsOpen,
        setDropdownIsOpen: setToDropdownIsOpen,
        toggleDropdownIsOpen: toggleToDropdownIsOpen,
    } = useCustomSelect('initializeAsEmpty')

    const { value: fromInputValue, handleChange: handleFromInputChange, handleSetValue: handleSetFromInputValue } = useFormControl()
    const { value: toInputValue, handleChange: handleToInputChange, handleSetValue: handleSetToInputValue } = useFormControl()

    const [swapIds, setSwapIds] = useState({ from: fromSelectedItem.id, to: toSelectedItem.id })

    const { formIsValid } = useFormValidity(fromInputValue, toInputValue)
    const { handleSubmit } = useSubmit()
    const { status: getSwapValueStatus } = useSelector(state => state.algorand.swapValue)
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)
    const { modalState, handleModalOpen, handleModalClose } = useModal()

    const resetValues = () => {
        setFromSelectedItem("")
        setToSelectedItem("")
        handleSetFromInputValue("")
        handleSetToInputValue("")
    }

    const swapResponseCallback = () => {
        resetValues()
        handleModalOpen()
    }

    const handleSwap = () => {
        const data = {
            from_asset: fromSelectedItem.id, 
            to_asset: toSelectedItem.id,
            asset_amount: parseFloat(fromInputValue),
            phrase: passphrase
        }
                
        handleSubmit(swapAlgorand(data), swapResponseCallback, swapResponseCallback)
    }

    const { status } = useSelector(state => state.algorand.swap)
    const success = status === HTTP_STATUS.FULFILLED


    useEffect(() => {
        return () => dispatch(resetSwapValueData())
    }, [])

    /**TINY USDC
     * 21582668
     */


    /**
     * send check request on to asset ID input change
     */
    const { status: toAssetIsValidStatus, data: toAssetIsValidData } = useSearchAssetByIdForExchange(toInputValue, { asset_id: toInputValue }, checkAlgorandAssetIsValid)
    
    const [searchedAssets, setSearchedAssets] = useState([])
    const concatAssetArray = holdingsData.concat(searchedAssets)

    useEffect(() => {
        if (toAssetIsValidData) {
            if (!holdingsData.includes(toAssetIsValidData) && !searchedAssets.includes(toAssetIsValidData)) {
                setSearchedAssets(prevState => [...prevState, toAssetIsValidData])
            }
        }
    }, [toAssetIsValidData])

    const swapData = {
        from_asset: fromSelectedItem.id === swapIds.from ? fromSelectedItem.id : toSelectedItem.id, 
        to_asset: fromSelectedItem.id !== swapIds.from ? fromSelectedItem.id : toSelectedItem.id,
        asset_amount: fromSelectedItem.id === swapIds.from ? parseFloat(fromInputValue) : parseFloat(toInputValue),
        phrase: passphrase
    }

    /**
     * get equivelent value of other asset to swap to/from and set the value 
     */
     useEffect(() => {
        const inputRateTimer = setTimeout(() => {

            if ((swapData.asset_amount > 0) && (fromSelectedItem.id !== toSelectedItem.id)) {
                dispatch(getAlgorandSwapValue(swapData))
                .unwrap()
                .then(swapAmount => {
                    if (fromSelectedItem.id === swapIds.from) {
                        handleSetToInputValue(swapAmount)
                    } else {
                        handleSetFromInputValue(swapAmount)
                    }
                })
                .catch(err => console.log(err))
            }
        }, 1000)

        return () => clearTimeout(inputRateTimer)
    }, [swapData.asset_amount, fromSelectedItem.id, toSelectedItem.id])

    useEffect(() => {
        handleSetToInputValue("")
    }, [fromSelectedItem.id])

    useEffect(() => {
        handleSetFromInputValue("")
    }, [toSelectedItem.id])

    const resetToSelectedValues = () => {
        setToSelectedItem("")
        handleSetToInputValue("")
    }

    const handleFromInputFocus = () => {
        setSwapIds({ from: fromSelectedItem.id, to: toSelectedItem.id })
        handleSetToInputValue("")
    }

    const handleToInputFocus = () => {
        setSwapIds({ from: toSelectedItem.id, to: fromSelectedItem.id })
        handleSetFromInputValue("")
    }


    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <Grid container>
                <Grid item xs={12} md={8}>
                    <Styles.Root>
                        <Styles.Title>Swap</Styles.Title>
                        <Styles.Text>Token should be added to your wallet before swapping.</Styles.Text>
                        <Styles.Line />
                        <Styles.Container>
                            <div className="innerContainer">

                                {/* <label className="asset-amount">From</label> */}

                                <CustomSelectBox { ...fromSelectedItem } handleClick={toggleFromDropdownIsOpen} />

                                <CustomDropdownContainer 
                                    dropdownItems={holdingsData} 
                                    dropdownIsOpen={fromDropdownIsOpen}
                                    setDropdownIsOpen={setFromDropdownIsOpen}
                                    handleDropdownItemClick={setFromSelectedItem}
                                    handleSetInputValue={handleSetFromInputValue}
                                />

                                <CustomSelectInput 
                                    placeholder="0.00" 
                                    value={fromInputValue}
                                    onChange={handleFromInputChange}
                                    onFocus={handleFromInputFocus}
                                />

                                <Styles.Info>
                                    Balance:&nbsp; 
                                    { fromSelectedItem.id === 0 ? 
                                        <strong>{activeWalletData?.balance}</strong> : 
                                        <strong>{holdingsData?.filter(asset => asset.id === fromSelectedItem.id)[0]?.amount}</strong> 
                                    }
                                </Styles.Info>
                            </div>
                            <img src={exchangeLogo} alt="" />
                        </Styles.Container>
                        <Styles.Container>
                            <div className="innerContainer" style={{ padding: '20px 0' }}>

                            
                                {  toSelectedItem ? <CustomSelectBox { ...toSelectedItem } handleClick={toggleToDropdownIsOpen} /> : null }

                                <CustomDropdownContainer 
                                    lower
                                    dropdownItems={
                                        !toSelectedItem ? concatAssetArray.filter(item => item.id.toString().includes(toInputValue.trim())) : concatAssetArray
                                    } 
                                    dropdownIsOpen={toDropdownIsOpen}
                                    setDropdownIsOpen={setToDropdownIsOpen}
                                    handleDropdownItemClick={setToSelectedItem}
                                    handleSetInputValue={handleSetToInputValue}
                                    searchStatus={toAssetIsValidStatus}
                                />

                                <CustomSelectInput 
                                    smallerPlaceholderSize={!toSelectedItem}
                                    placeholder={!toSelectedItem ? "Select a token, or paste the ID" : "0.00"} 
                                    onClick={() => !toSelectedItem && setToDropdownIsOpen(true)}
                                    value={toInputValue}
                                    onChange={handleToInputChange}
                                    onFocus={handleToInputFocus}
                                />
                                { toSelectedItem && <Styles.PasteID onClick={resetToSelectedValues}>Paste Asset ID</Styles.PasteID> }

                                { toSelectedItem && <p>{getSwapValueStatus === HTTP_STATUS.REJECTED ? 'Could not get equivelent value' : ''}</p> }

                                { getSwapValueStatus === HTTP_STATUS.PENDING && (
                                    <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
                                )}
                                
                            </div>
                            
                        </Styles.Container>
                        <Styles.ButtonContainer>
                            <Button 
                                fullWidth 
                                disabled={!formIsValid || (getSwapValueStatus === HTTP_STATUS.PENDING) || (getSwapValueStatus === HTTP_STATUS.REJECTED)} 
                                onClick={handleSwap}>
                                    swap
                            </Button>
                        </Styles.ButtonContainer>
                    </Styles.Root>
                </Grid>
            </Grid>

            {/* response modal */}
            <Modal open={modalState} handleClose={handleModalClose}>
                <ModalResponse
                    success={success}
                    title={success ? 'success' : 'error'}
                    description={
                        success ? 'successfully swapped asset' : 'something went wrong!'
                    }
                />
            </Modal>
        </DashboardWrapper>
    )
}

export default ExchangeAlgo
