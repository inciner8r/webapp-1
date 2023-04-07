import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WalletNotFound = () => {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="pt-24 mb-10">
        <div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-100 md:text-6xl md:tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">
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
                to="/"
                className="inline-flex items-center font-bold justify-center w-full px-6 py-3 mb-2 text-lg text-black rounded-2xl sm:w-auto sm:mb-0 transition bg-green-400 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
              >
                All Reviews
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full h-full flex flex-col text-center justify-center items-center py-10">
        <motion.h2
          className="text-5xl font-semibold text-gray-700 text-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Wallet Not Connected
        </motion.h2>
      </div>
    </motion.div>
  );
};

export default WalletNotFound;
