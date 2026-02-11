import { ANS } from '@algonameservice/sdk'
import algosdk from "algosdk"

const main_client_url = 'https://mainnet-algorand.api.purestake.io/ps2';
const main_index_url = 'https://mainnet-algorand.api.purestake.io/idx2';

const client = new algosdk.Algodv2({'X-API-KEY': import.meta.env.VITE_ANS_CLIENT}, `${main_client_url}`, '');

const indexer = new algosdk.Indexer({'X-API-KEY': import.meta.env.VITE_ANS_CLIENT}, `${main_index_url}`, '');

const algoSdk = new ANS(client, indexer)

export default algoSdk;