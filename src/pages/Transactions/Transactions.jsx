import React, { useEffect } from 'react'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared'
import MyTabs from '../../components/MyTabs/MyTabs'
import Table from '../../components/Table/Table'
import useTabs from '../../Hooks/Tabs'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork'
import { useDispatch, useSelector } from 'react-redux'
import { getAlgorandTransactions } from '../../app/algorand/algorandSlice'
import { ThreeDots } from 'react-loader-spinner'
import { HTTP_STATUS } from '../../constants/httpStatus'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const dispatch = useDispatch()
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const { status, data } = useSelector(state => state.algorand.transactions)

    useEffect(() => {
        if (data === null) {
            dispatch(getAlgorandTransactions())
        }
    }, [data])

    const rows = data?.map((item, i) => (
        <tr key={i}>
            <td>{item.txid}</td>
            <td>{item.asset_name}</td>
            <td>{item.amount}</td>
            <td>{item.tx_type}</td>
            <td>{item.tx_time}</td>
        </tr>
    ))

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

                {
                    status === HTTP_STATUS.PENDING ? (
                        <SharedStyles.LoaderContainer>
                            <ThreeDots height="250" width="250" color='gray' />
                        </SharedStyles.LoaderContainer>
                    ) : (
                        <Table
                            columnTitles={['transaction id', 'asset name', 'amount', 'txn type', 'date']}
                            rows={rows}
                            noDataTitle="NO TRANSACTIONS YET"
                            noDataText="You don’t have any transaction that can be displayed yet."
                        />
                    )
                }

            </SharedStyles.TableBox>
        </DashboardWrapper>
    )
}

export default Transactions
