import React, { useEffect, useState } from 'react'
import * as Styles from './exchange'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import { Grid } from '@mui/material'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import SelectInput from '../../components/SelectInput/SelectInput'
import exchangeLogo from '../../assets/icons/exchange.png'
import { Button } from '../../components/UI/Button/button'
import useSelectInput from '../../Hooks/SelectInput'
import useFormValidity from '../../Hooks/FormValidity'
import { useDispatch, useSelector } from 'react-redux'
import { getAlgorandSwapValue, resetSwapValueData, swapAlgorand } from '../../app/algorand/algorandSlice'
import { HTTP_STATUS } from '../../constants/httpStatus'
import Modal from '../../components/UI/Modal/Modal'
import ModalResponse from '../../components/ModalResponse/ModalResponse'
import useModal from '../../Hooks/Modal'
import useSubmit from '../../Hooks/Submit'
import { ThreeDots } from 'react-loader-spinner'
import FormControl from '../../components/FormControl/FormControl'
import { networkDataToReturn } from '../../constants/network'
import useSearchAssetWithDropdown from '../../Hooks/SearchAssetWithDropdown'
import { LoaderContainer } from '../../containers/AssetManagerAlgo/assetManagerAlgo'
import algorandLogo from '../../assets/icons/algorandLogo.png'
import { CustomDropdownContainer, CustomSelectBox, CustomSelectInput } from '../../components/CustomSelect/CustomSelect'
import useCustomSelect from '../../Hooks/CustomSelect'
import useFormControl from '../../Hooks/FormControl'

const mockHoldings = [ 
    { id: 12345, name: 'TinyUSDC', amount: 500, unit: 'tiny' }, 
    { id: 17789, name: 'Algorand', amount: 1, unit: 'algo' }, 
    { id: 24567, name: 'Ripple', amount: 20, unit: 'xrp' } 
]

function ExchangeAlgo() {
    const dispatch = useDispatch()

    const { 
        value: fromAsset, 
        setValueByClick: setFromAssetByClick, 
        handleSelectChange: handleFromAssetSelectChange,
        handleSetValue: handleSetFromAssetValue,
        handleSetAssetValue: handleSetFromAssetWholeValue,
    } = useSelectInput()

    const { 
        value: toAsset, 
        setValueByClick: setToAssetByClick, 
        handleSetValue: handleSetToAssetValue, 
        handleSelectChange: handleToAssetSelectChange,
        handleSetAssetValue: handleSetToAssetWholeValue
    } = useSelectInput()

    const [toAssetIsValid, setToAssetIsValid] = useState(true)
    // console.log(toAssetIsValid)

    const handleToAssetClick = (data) => {
        setToAssetByClick(data)
        setToAssetIsValid(true)
    }

    const network = useSelector(state => state.network.network)
    const { data: activeWalletData } = useSelector(networkDataToReturn[network.toLowerCase()]);

    const passphrase = useSelector(state => state.algorand.passphrase)

    const [swapIds, setSwapIds] = useState({ from: fromAsset.id, to: toAsset.id })

    const { formIsValid } = useFormValidity(fromAsset.amount, toAsset.amount)
    const { modalState, handleModalOpen, handleModalClose } = useModal()
    const { handleSubmit } = useSubmit()
    const { status: getSwapValueStatus } = useSelector(state => state.algorand.swapValue)
    const { data: holdingsData } = useSelector(state => state.algorand.holdings)

    /**
     * get the asset you are swapping to
     */
    const { 
        checkValidAssetExchangeStatus: checkToAssetValidStatus, 
        checkValidAssetError: checkToAssetValidError 
    } = useSearchAssetWithDropdown(toAsset.id, handleSetToAssetWholeValue)

    useEffect(() => {
        if (checkToAssetValidStatus === HTTP_STATUS.FULFILLED) {
            setToAssetIsValid(true)
        } else {
            setToAssetIsValid(false)
        }
    }, [checkToAssetValidStatus])   

    const swapData = {
        from_asset: fromAsset.id === swapIds.from ? fromAsset.id : toAsset.id, 
        to_asset: fromAsset.id !== swapIds.from ? fromAsset.id : toAsset.id,
        asset_amount: fromAsset.id === swapIds.from ? parseFloat(fromAsset.amount) : parseFloat(toAsset.amount),
        phrase: passphrase
    }
    // console.log(swapData)

    /**
     * get equivelent value of other asset to swap to/from and set the value 
     */
    useEffect(() => {
        const inputRateTimer = setTimeout(() => {
            if (
                (swapData.asset_amount > 0) && 
                (fromAsset.id != toAsset.id) && toAssetIsValid
                // ((checkToAssetValidStatus === HTTP_STATUS.FULFILLED) || toAssetIsValid)
            ) {
                dispatch(getAlgorandSwapValue(swapData))
                .unwrap()
                .then(swapAmount => {
                    if (fromAsset.id === swapIds.from) {
                        handleSetToAssetValue('amount', swapAmount)
                    } else {
                        handleSetFromAssetValue('amount', swapAmount)
                    }
                })
                .catch(err => console.log(err))
            }
        }, 1000)

        return () => clearTimeout(inputRateTimer)
    }, [swapData.asset_amount, fromAsset.id, toAsset.id, checkToAssetValidStatus, toAssetIsValid])

    const resetValues = () => {
        const defaultSwapValue = { id: 0, name: 'Algorand', amount: "", image: algorandLogo, unit: 'ALGO' }
        handleSetFromAssetWholeValue(defaultSwapValue)
        handleSetToAssetWholeValue(defaultSwapValue)
    }

    const swapResponseCallback = () => {
        resetValues()
        handleModalOpen()
    }

    const handleSwap = () => {
        const data = {
            from_asset: fromAsset.id, 
            to_asset: toAsset.id,
            asset_amount: parseFloat(fromAsset.amount),
            phrase: passphrase
        }
                
        handleSubmit(swapAlgorand(data), swapResponseCallback, swapResponseCallback)
    }

    const { status } = useSelector(state => state.algorand.swap)
    const success = status === HTTP_STATUS.FULFILLED

    const handleFromAssetFocus = () => {
        setSwapIds({ from: fromAsset.id, to: toAsset.id })
        handleSetToAssetWholeValue(toAsset)
    }

    const handleToAssetFocus = () => {
        setSwapIds({ from: toAsset.id, to: fromAsset.id })
        handleSetFromAssetWholeValue(fromAsset)
    }

    useEffect(() => {
        return () => dispatch(resetSwapValueData())
    }, [])

    /**TINY USDC
     * 21582668
     */

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

    const { value: fromInputValue, handleChange: handleFromInputChange, handleSetValue: handleSetFromValue } = useFormControl()
    const { value: toInputValue, handleChange: handleToInputChange, handleSetValue: handleSetToValue } = useFormControl()
    

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

                                <CustomSelectBox { ...fromSelectedItem } handleClick={toggleFromDropdownIsOpen} />

                                <CustomDropdownContainer 
                                    dropdownItems={holdingsData} 
                                    dropdownIsOpen={fromDropdownIsOpen}
                                    setDropdownIsOpen={setFromDropdownIsOpen}
                                    handleDropdownItemClick={setFromSelectedItem}
                                    handleSetInputValue={handleSetFromValue}
                                />

                                <CustomSelectInput 
                                    placeholder="0.00" 
                                    value={fromInputValue}
                                    onChange={handleFromInputChange}
                                />

                                



                                {/* <label className="asset-amount">Amount</label>
                                <SelectInput
                                    exchange
                                    label="From"
                                    value={fromAsset.amount}
                                    asset={fromAsset}
                                    handleChange={(e) => handleFromAssetSelectChange('amount', e)}
                                    handleItemClick={setFromAssetByClick}
                                    handleFocus={handleFromAssetFocus}
                                    placeholder="0"
                                /> */}
                                <Styles.Info>
                                    Balance:&nbsp; 
                                    { fromAsset.id === 0 ? 
                                        <strong>{activeWalletData?.balance}</strong> : 
                                        <strong>{holdingsData?.filter(asset => asset.id === fromAsset.id)[0]?.amount}</strong> 
                                    }
                                </Styles.Info>
                            </div>
                            <img src={exchangeLogo} alt="" />
                        </Styles.Container>
                        <Styles.Container>
                            <div className="innerContainer" style={{ paddingTop: '20px' }}>

                            
                                {  toSelectedItem ? <CustomSelectBox { ...toSelectedItem } handleClick={toggleToDropdownIsOpen} /> : null }

                                <CustomDropdownContainer 
                                    lower
                                    dropdownItems={
                                        !toSelectedItem ? holdingsData.filter(item => item.id.toString().includes(toInputValue.trim())) : holdingsData
                                    } 
                                    dropdownIsOpen={toDropdownIsOpen}
                                    setDropdownIsOpen={setToDropdownIsOpen}
                                    handleDropdownItemClick={setToSelectedItem}
                                    handleSetInputValue={handleSetToValue}
                                />

                                <CustomSelectInput 
                                    smallerPlaceholderSize={!toSelectedItem}
                                    placeholder={!toSelectedItem ? "Select a token, or paste the ID" : "0.00"} 
                                    onClick={() => !toSelectedItem && setToDropdownIsOpen(true)}
                                    value={toInputValue}
                                    onChange={handleToInputChange}
                                />
                                { toSelectedItem && <Styles.PasteID onClick={() => setToSelectedItem("")}>Paste Asset ID</Styles.PasteID> }



                                {/* <label className="asset-amount">Amount</label>
                                <SelectInput
                                    exchange
                                    hideInput
                                    label="To"
                                    asset={toAsset}
                                    value={toAsset.amount}
                                    handleItemClick={handleToAssetClick}
                                    handleChange={e => handleToAssetSelectChange('amount', e)}
                                    handleFocus={handleToAssetFocus}
                                    placeholder="0"
                                />

                                <FormControl 
                                    type="text"
                                    label="Asset ID"
                                    center
                                    exchange
                                    value={toAsset.id}
                                    handleChange={e => handleToAssetSelectChange('id', e)}
                                    placeholder="Asset ID"
                                /> */}
                                <p>{getSwapValueStatus === HTTP_STATUS.REJECTED ? 'Could not get equivelent value' : ''}</p>
                                <p>{checkToAssetValidError}</p>
                                { ((checkToAssetValidStatus === HTTP_STATUS.PENDING) || (getSwapValueStatus === HTTP_STATUS.PENDING)) && (
                                    <LoaderContainer><ThreeDots height="80" width="80" color='gray' /></LoaderContainer>
                                )}
                            </div>
                            
                        </Styles.Container>
                        <Styles.ButtonContainer>
                            <Button 
                                fullWidth 
                                disabled={!formIsValid || (getSwapValueStatus === HTTP_STATUS.PENDING) || !toAssetIsValid} 
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
