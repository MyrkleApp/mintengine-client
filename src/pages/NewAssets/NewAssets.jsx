import React from 'react'
import DashboardWrapper from '../../components/Wrappers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import useTabs from '../../Hooks/Tabs'
import { COMMON_NFT, CREATE_ASSET, CUSTOM_NFT, FRACTIONAL_NFT, SECURITY, UNIQUE_NFT, WEB3_TICKET } from './constants'
import CreateAsset from './tabs/CreateAsset'

const tabs = [CREATE_ASSET, UNIQUE_NFT, COMMON_NFT, CUSTOM_NFT, WEB3_TICKET, FRACTIONAL_NFT, SECURITY]

function NewAssets() {
    const { tabValue, handleTabChange } = useTabs(tabs[0])

    return (
        <DashboardWrapper>
            <SharedStyles.Transactions>
                <h2>YOUR TRANSACTIONS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </SharedStyles.Transactions>

            { tabValue === CREATE_ASSET && <CreateAsset /> }
            
        </DashboardWrapper>
    )
}

export default NewAssets
