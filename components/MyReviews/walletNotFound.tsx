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
    <div
    >
      <section className="pt-20 mb-10">
        <div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
              <span style={style}>
                Manage Your Reviews
              </span>
              <br />
              Securely Monitor and Manage Your Feedback
              <br />
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-300 md:text-xl lg:px-24">
              Monitor your submitted reviews with NetSepio, the decentralized
              cybersecurity platform designed to ensure the security and privacy
              of your online activities.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
              <Link
                href="/"
                className="inline-flex items-center font-bold justify-center w-full px-6 py-3 mb-2 text-lg text-black rounded-2xl sm:w-auto sm:mb-0 transition hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                style={style2}
              >
                All Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-full flex flex-col text-center justify-center items-center py-10">
        <h2
          className="text-5xl font-semibold text-gray-700 text-center"
        >
          Wallet Not Connected
        </h2>
      </div>
    </div>
  );
};

export default WalletNotFound;
