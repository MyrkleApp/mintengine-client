import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';


const QrCodeScanner = () => {
    const [data, setData] = useState('No result');

    return (
        <QrReader
            onResult={(result, error) => {
                if (!!result) {
                    setData(result?.text);
                }

                if (!!error) {
                    console.info(error);
                }
            }}
            containerStyle={{ width: '400px', height: '400px', zIndex: '2000' }}
        />
    );
};

export default QrCodeScanner