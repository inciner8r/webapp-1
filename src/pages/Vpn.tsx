// import { checkWalletAuth } from '../modules/connect_to_metamask';
// import { checkJwtToken } from '../modules/authentication';
// import { useAccount, useSigner } from 'wagmi';
// import { setJwtToken, setWalletData } from '../actions/walletActions';
// import store from '../store';
import Loader from '../Components/Loader';
import WalletNotFound from '../Components/MyReviews/walletNotFound';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import axios from 'axios';
import React, { useEffect, useState, ChangeEvent, FormEvent} from "react";
import MyVpnContainer from '../Components/Myvpncontainer';
import emoji from '../assets/EmojiMessage.png';
import { NFTStorage } from "nft.storage";
import ButtonNavigation from '../Components/Buttonnavigation';
import novpn from '../assets/novpns.png';

export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

interface FormData {
  name: string;
  region: string;
  // domain: string;
}

const Vpn = () => {

  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [buttonset, setbuttonset] = useState<boolean>(false);
  const [projectsData, setprojectsData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");

  const [verify,setverify] = useState<boolean>(false);

  const txtvalue = localStorage.getItem('txtvalue');

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const storedSubmissionProfile = localStorage.getItem('submissionProfile');
      if (storedSubmissionProfile === 'true') {
        setprofileset(true);
      }
      else
      {
        setprofileset(false);
      }
      setLoading(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  }, [msg]);

  const bg2 = {
    backgroundColor: "white",
  };

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

  const text= {
    color: "#788AA3"
  }

  const successtext= {
    color: "#141a31"
  }

  const errortext= {
    color: "#EE4B2B"
  }

  const bgverify = {
    backgroundColor: "#141a31",
  }

  const initialFormData: FormData = {
    name: '',
    region: '',
    // domain: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append('name', formData.name);
      formDataObj.append('region', formData.region);
      // formDataObj.append('domain', formData.domain);

      // Convert FormData to JavaScript Object
const formDataObject: { [key: string]: string | File | null } = {};
formDataObj.forEach((value, key) => {
  formDataObject[key] = value;
});

// Convert JavaScript Object to JSON string
const jsonData = JSON.stringify(formDataObject);

      const response = await fetch('https://testnet.gateway.netsepio.com/api/v1.0/vpn', {
        method: 'POST',
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        const responseData = await response.json();
        setFormData(initialFormData);
        // setMsg('success');
        console.log("vpn data",responseData);
        // localStorage.setItem('domainId', responseData.payload.domainId);
        // localStorage.setItem('txtvalue',responseData.payload.txtValue);
        setverify(true);
      } else {
        setMsg('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMsg('error');
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    const fetchProjectsData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get('https://testnet.gateway.netsepio.com/api/v1.0/vpn/all/us-east-2', {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        console.log("vpn response", response)

        if (response.status === 200) {
            // Filter the data based on the domain ID
            const wallet = Cookies.get("platform_wallet");
            const payload: any[] = response.data.payload;
    const filteredData = payload.filter(item => item?.walletAddress === wallet);
    setprojectsData(filteredData);
          console.log(filteredData)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
  }, [buttonset]);


  const gotovpn = () => {
setbuttonset(false);
  }

  const handleNavigation = (page: string) => {
    console.log(`Navigating to ${page} page from vpnPage...`);
    // Additional navigation logic if needed
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="py-10"
    >
      <section className="pt-24 mb-10">
        <div className="px-5 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">

          <div className='-mt-10'>
          <ButtonNavigation onNavigate={handleNavigation} count={projectsData? projectsData.length : 0}/>
          </div>
           
            { buttonset && (
            <section className="pb-10 rounded-xl" style={bg}>
              <div className="px-5 mx-auto max-w-2xl rounded-xl">
                <div className="w-full mx-auto text-left py-20">
                  <h1 className="mb-8 text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white text-center">Create Your VPN</span>
                  </h1>

                  <form
                    id="myForm"
                    className="rounded pt-10"
                    onSubmit={handleSubmit}
                  >

                  

                      <div className="mb-10">

                    <div className="mb-10">
                        <input
                          type="text"
                          id="name"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Name"
                          value={formData.name}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div>

                      {/* <div className="mb-10">
                        <input
                          type="text"
                          id="region"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Region"
                          value={formData.region}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div> */}

                      <div className="mb-10">
                        <select
                          id="region"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          value={formData.region}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Select Region</option>
                          <option value="us-east-2">us-east-2</option>
                          <option value="ap-southeast-1">ap-southeast-1</option>
                        </select>
                        {/* <input
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          id="wallet"
                          type="text"
                          placeholder="tag"
                          value={siteTag} onChange={(e) => setSiteTag(e.target.value)} required
                        /> */}
                      </div>

                      {/* <div className="mb-10">
                        <input
                          type="text"
                          id="domain"
                          style={border}
                          className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                          placeholder="Domain"
                          value={formData.domain}
              onChange={handleInputChange}
                          required
                        />

                  
                      </div> */}

                    </div>

                    <div className="text-center pt-10">
                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          type="submit"
                          value="submit"
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Create
                        </button>
                      </div>
                    </div>
                  </form>

                  {
              verify && ( <div style={bgverify} className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full" id="popupmodal">
    <div className="relative p-4 lg:w-1/4 w-full max-w-2xl max-h-full">
        <div className="relative rounded-lg shadow dark:bg-gray-700" style={bg2}>
            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                {/* <h3 className="text-2xl font-semibold">
                Verify Your Registration
                </h3> */}
                <button 
                    onClick={() => setbuttonset(false)}
                    type="button" 
                    className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>

            <img src={emoji} alt="info" className="mx-auto"/>

            <div className="p-4 md:p-5 space-y-4">
            <p className="text-3xl text-center font-bold">
                Done!
                </p>
                <p className="text-md text-center" style={text}>
                VPN deployment successful.
                </p>
            </div>
{/* <div className="p-4 md:p-5 space-y-4">
                <p className="text-lg text-center text-white">
                  {txtvalue}
                </p>
            </div>
            <p style={successtext} className="p-4">{successmsg}</p>
            
            {
              errormsg && !successmsg && (<p style={errortext} className="p-4">{errormsg}. 
              Try again in 3-5 mins if already added txt in dns.</p>)} */}

            <div className="flex items-center p-4 md:p-5 rounded-b">
                <button 
                style={button}
                onClick={gotovpn}
                type="button" className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">My VPNs</button>
              </div>

        </div>          
    </div>
</div>
)
}

                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
          </div>
        </div>)}
            {
              msg == "success" && (
                <p className="text-green-500">Successful</p>
              )
            }

            {
              msg == "error" && (
                <p className="text-red-500">Failed to create VPN. Enter unique name.</p>
              )
            }
                </div>
              </div>
            </section>
         )}












{
  !buttonset && (
    <>
    <h1 className="mb-8 text-start text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                    <span className="text-white">My VPNs</span>
                  </h1>
            <section className="pb-10 rounded-xl">
              
            {loading ? (
            <Loader />
          ) : projectsData?.length == 0 ? (
            <motion.div
            className="w-full max-w-5xl mx-auto py-10 rounded-xl text-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={bg}
          >
             <div className='lg:flex md:flex lg:p-20 md:p-20 p-10'>
              <div className='lg:w-1/3 md:w-1/3 w-full'>
              <img src={novpn}/>
              </div>
              <div className='lg:w-2/3 md:w-2/3 w-full'>
              <h2 className="text-4xl font-semibold text-white">Upgrade Your Safety, Combine 
VPN and Firewall for Total 
Protection</h2>
              <div className='mt-10'>
                <button style={button} onClick={() => setbuttonset(true)} className='py-4 px-10 rounded-lg font-bold'>Create your VPN</button>
              </div>
              </div>
            </div>
          </motion.div>
          ) : (
            <MyVpnContainer metaDataArray={projectsData} MyReviews={false}/>
          )}
                     

                      <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                        <button
                          style={button}
                          onClick={() => setbuttonset(true)}
                          className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg lg:w-1/3 md:w-1/3 w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                        >
                          Add More VPNs
                        </button>
                      </div>


                  {loading && (<div style={{ position: 'absolute', top: 700, left: 0, width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
            <div style={{ border: '8px solid #f3f3f3', borderTop: '8px solid #3498db', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}>
            </div>
          </div>
        </div>)}
            </section>
    </>
  )
}
            
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Vpn
