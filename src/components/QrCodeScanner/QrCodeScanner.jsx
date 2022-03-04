import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


const QrCodeScanner = ({ setValue, handleClose }) => {
    const [data, setData] = useState('No result');


    return (
        <>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                        setValue(result?.text)
                        handleClose()
                    }

                    if (!!error) {
                        console.info(error);
                    }
                }}
                containerStyle={{ width: '400px', height: '400px', zIndex: '2000' }}
            />
            <p>{data}</p>
        </>
    );
};

export default QrCodeScanner