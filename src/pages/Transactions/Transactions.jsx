import React, { useEffect } from 'react'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'
import useTabs from '../../Hooks/Tabs'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import { useDispatch } from 'react-redux'
import { getAlgorandTransactions } from '../../app/algorand/algorandSlice'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const dispatch = useDispatch()
    const { tabValue, handleTabChange } = useTabs(tabs[0])

    useEffect(() => {
        dispatch(getAlgorandTransactions())
    }, [])

    return (
        <DashboardWrapper>
            <ChooseNetwork />
            <SharedStyles.HeaderBox>
                <h2>TRANSACTIONS</h2>
                <MyTabs 
                    tabs={tabs} 
                    tabValue={tabValue}
                    handleTabChange={handleTabChange}
                />
            </SharedStyles.HeaderBox>
            <SharedStyles.TableBox>
                <Table />
            </SharedStyles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
