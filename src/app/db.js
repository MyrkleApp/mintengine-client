import PouchDB from 'pouchdb';

function DB() {
    const db = new PouchDB('mint-engine');

    const getPassphrase = async () => {
        const passphrase = await db.allDocs({ include_docs: true })
        return passphrase.rows
    }

    const addPassphrase = async (passphraseData) => {
        const res = await db.post(passphraseData) 
        return res
    }

    const getFingerprint = async () => {
        const docs = await db.allDocs({ include_docs: true })
        return docs.rows.find(item => item.doc.type === 'fingerprint')
    }

    const saveFingerprint = async (data) => {
        const res = await db.post(data) 
        return res
    }

    const clearData = async () => {
        const res = await db.destroy()
        return res
    }

    return {
        getPassphrase,
        addPassphrase,
        getFingerprint,
        saveFingerprint,
        clearData
    }
}

export default DB
