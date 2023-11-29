
import { motion } from "framer-motion";
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";

const Verificationsteps = () => {

  const [loading, setLoading] = useState<boolean>(false);

  const bg = {
    backgroundColor: "#222944",
  };

  const border = {
    backgroundColor: "#222944",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const color = {
    color: "#FFFFFFB2"
  }


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="py-10"
    >
      <section className="pt-10 mb-10">
        
        <div className="mx-auto max-w-7xl">
        
          <div className="w-full mx-auto md:w-11/12 xl:w-9/12">
          <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl">
                    <span className="text-white">How to add verification code</span>
                  </h1>

           <section className="pb-10 rounded-xl" style={bg}>
              <div className="max-w-8xl rounded-xl">
                <div className="w-full py-10">
                    <div className="lg:px-20 md:px-20 px-4">
                  <h1 className="mb-8 text-2xl font-bold text-gray-100 flex">
                    <span className="text-white">1. Find your DNS Records</span>
                  </h1>
                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className="">(a) Sign in to your account at your domain host (eg:cloudfare)</span>
                  </h1>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(b) Scroll to your list of domains and click the <span className="font-bold text-white">Manage</span> button next to the 
domain you are setting up today.</span>
                  </h1>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(c) Click  <span className="font-bold text-white">Advanced DNS.</span></span>
                  </h1>


                  <h1 className="mb-8 text-2xl font-bold text-gray-100 flex">
                    <span className="text-white">2. Add your verification code</span>
                  </h1>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(a) Click the  <span className="font-bold text-white">add new record </span> button</span>
                  </h1>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(b) Fill out the form</span>
                  </h1>
                  <div className="ml-10">
                  <h1 className="text-md flex" style={color}>
                    <span className="">• Select txt record from the type drop-down list.</span>
                  </h1>
                  <h1 className="text-md flex" style={color}>
                    <span className="">• Enter @ for the host.</span>
                  </h1>
                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className="">• Paste the verification code you copied from the setup tool</span>
                  </h1>
                  </div>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(c) Click the <span className="font-bold text-white">save all changes </span>button</span>
                  </h1>
                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className="ml-10">Your verification code is now saved as a TXT record and will soon 
be visible to other computers on the internet.</span>
                  </h1>


                  <h1 className="mb-8 text-2xl font-bold text-gray-100 flex">
                    <span className="text-white">3. Tell us verify to verify your code</span>
                  </h1>
                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className="">(a) Return to the browser tab where you have the verification open.</span>
                  </h1>
                  <h1 className="mb-8 text-md text-gray-100 flex">
                    <span className="text-white" style={color}>(b) On the page where you copied your verification code, scroll to 
the botton and click verify.</span>
                  </h1>
                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className=""><span className="font-bold text-white">Important! </span>some registrars may require additional time to publish your
verification code. if the setup tool cant find your new TXT record, wait
an hour before you try again.</span>
                  </h1>

                  <h1 className="mb-8 text-md flex" style={color}>
                    <span className="">If you need additional help with your DNS settings, please contact 
your registrar. They are experts in managingyour domain and are eager 
to help you.</span>
                  </h1>
                 </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Verificationsteps
