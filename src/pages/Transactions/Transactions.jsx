import React, { useEffect } from 'react'
import DashboardWrapper from '../../containers/DashboardWrapper/DashboardWrapper.jsx'
import * as SharedStyles from '../../components/UI/DashboardShared/dashboardShared.js'
import MyTabs from '../../components/MyTabs/MyTabs.jsx'
import Table from '../../components/Table/Table.jsx'
import useTabs from '../../Hooks/Tabs.js'
import ChooseNetwork from '../../components/ChooseNetwork/ChooseNetwork.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getAlgorandTransactions } from '../../app/algorand/algorandSlice.js'
import { ThreeDots } from 'react-loader-spinner'
import { HTTP_STATUS } from '../../constants/httpStatus.js'

const tabs = ["All Transactions", "Algo TXNs", "Asa TXNs", "Scheduled TXNs"]

function Transactions() {
    const dispatch = useDispatch()
    const { tabValue, handleTabChange } = useTabs(tabs[0])
    const { status, data } = useSelector(state => state.algorand.transactions)

    const currentNet = useSelector(state => state.algorand.activeWallet.data?.current_net)

    useEffect(() => {
        if (status === null) {
            dispatch(getAlgorandTransactions())
        }
    }, [status])

    const filter = {
        "All Transactions": data,
        "Algo TXNs": data?.filter(txn => txn.asset_name === 'algo'),
        "Asa TXNs": data?.filter(txn => txn.asset_name !== 'algo'),
        "Scheduled TXNs": data?.filter(txn => txn.tx_type === 'scheduled'),
    }


    const rows = filter[tabValue]?.map((item, i) => (
        <tr key={item.txid}>
            <td><a href={currentNet === "testnet" ? `https://testnet.explorer.perawallet.app/tx/${item.txid}` : `https://explorer.perawallet.app/tx/${item.txid}`} target="_blank">{item.txid}</a></td>
            <td>{item.asset_name}</td>
            <td>{`${item.tx_type === 'sent' ? '-' : '+'} ${item.amount}`}</td>
            <td className="hide-on-mobile">{item.tx_type}</td>
            <td className="hide-on-mobile">{item.tx_time}</td>
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
                            columnsToHideOnMobile={[3, 4]}
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
