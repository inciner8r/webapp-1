import React from 'react';
import Link from 'next/link';

const WalletNotFound = () => {

  const style = {
    color: '#11D9C5',
};

const style2 = {
  backgroundColor: '#11D9C5',
};

  return (
      <div className='min-h-screen text-center text-white'>
        <div style={{ marginTop: '30vh' }} className='text-2xl'>Wallet not connected, please authorize to view the content.</div>
      </div>
    )
};

export default WalletNotFound;
