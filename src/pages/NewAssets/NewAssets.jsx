import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import useTabs from '../../Hooks/Tabs'
import { COMMON_NFT, CREATE_ASSET, CUSTOM_NFT, FRACTIONAL_NFT, SECURITY, UNIQUE_NFT, WEB3_TICKET } from './constants'
import CreateAsset from './tabs/CreateAsset'
import UniqueNft from './tabs/UniqueNft'
import CommonNft from './tabs/CommonNft'
import CustomNft from './tabs/CustomNft'
import Security from './tabs/Security'
import FractionalNft from './tabs/FractionalNft'
import Web3Ticket from './tabs/Web3Ticket'

const tabs = [CREATE_ASSET, UNIQUE_NFT, COMMON_NFT, CUSTOM_NFT, WEB3_TICKET, FRACTIONAL_NFT, SECURITY]

function NewAssets() {
    const { tabValue, handleTabChange } = useTabs(tabs[0])

    return (
        <DashboardWrapper>
            <SharedStyles.HeaderBox>
                <h2>NEW ASSETS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </SharedStyles.HeaderBox>

            { tabValue === CREATE_ASSET && <CreateAsset /> }
            { tabValue === UNIQUE_NFT && <UniqueNft /> }
            { tabValue === COMMON_NFT && <CommonNft /> }
            { tabValue === CUSTOM_NFT && <CustomNft /> }
            { tabValue === WEB3_TICKET && <Web3Ticket /> }
            { tabValue === FRACTIONAL_NFT && <FractionalNft /> }
            { tabValue === SECURITY && <Security /> }
            
        </DashboardWrapper>
    )
}

export default NewAssets
