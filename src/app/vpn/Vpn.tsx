"use client";
import Cookies from "js-cookie";
import axios from "axios";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import MyVpnContainer from "../../../components/Myvpncontainer";
import emoji from "../../../public/EmojiMessage.png";
import connectWallet from "../../../modules/connectwallet";
import novpn from "../../../public/novpn2.png";
import vpn1 from "../../../public/vpn1.png";
import vpn2 from "../../../public/vpn2.png";
import vpn3 from "../../../public/vpn3.png";
import vpn4 from "../../../public/vpn4.png";
import vpn5 from "../../../public/vpn5.png";
import vpn6 from "../../../public/vpn6.png";
import vpn7 from "../../../public/vpn7.png";
import Image from "next/image";
import VpnContainerDedicated from "../../../components/VpnContainerDedicated";
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/";

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
  type: string;
  // domain: string;
}

const Vpn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [buttonset, setbuttonset] = useState<boolean>(false);
  const [projectsData, setprojectsData] = useState<any>(null);
  const [dedicatedVpnData, setdedicatedVpnData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");
  const [successmsg, setsuccessMsg] = useState<string>("");
  const [errormsg, seterrorMsg] = useState<string>("");
  const [region, setregion] = useState<string>("us-east-2");
  const [verify, setverify] = useState<boolean>(false);
  const [endpoint, setEndpoint] = useState<string>("");
  const [vpntype, setvpntype] = useState<string>("decentralized");
  const [subscription, setSubscription] = useState<string>("desc");
  const [about, setabout] = useState<boolean>(false);

  const txtvalue = localStorage.getItem("txtvalue");

  useEffect(() => {
    setLoading(true);

    const timeoutId = setTimeout(() => {
      const storedSubmissionProfile = localStorage.getItem("submissionProfile");
      if (storedSubmissionProfile === "true") {
        setprofileset(true);
      } else {
        setprofileset(false);
      }
      setLoading(false);
    }, 3000); // 3 seconds

    return () => {
      clearTimeout(timeoutId);
      setLoading(false);
    };
  }, [msg]);

  const bg2 = {
    backgroundColor: "white",
  };

  const bg = {
    backgroundColor: "#30385F",
  };

  const border = {
    backgroundColor: "#30385F",
    border: "1px solid #788AA3",
  };

  const button = {
    backgroundColor: "#11D9C5",
  };

  const text = {
    color: "#788AA3",
  };

  const text2 = {
    color: "#11D9C5",
  };

  const successtext = {
    color: "#141a31",
  };

  const errortext = {
    color: "#EE4B2B",
  };

  const bgverify = {
    backgroundColor: "#141a31",
  };

  const initialFormData: FormData = {
    name: "",
    region: "",
    type: "",
    // domain: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      formDataObj.append("name", formData.name);
      formDataObj.append("region", formData.region);

      // Convert FormData to JavaScript Object
      const formDataObject: { [key: string]: string | File | null } = {};
      formDataObj.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Convert JavaScript Object to JSON string
      const jsonData = JSON.stringify(formDataObject);
      console.log(formData.type);
      if (formData.type === "dedicated") {
        const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/vpn`, {
          method: "POST",
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
          console.log("vpn data", responseData);
          setverify(true);
        } else {
          setMsg("error");
        }
      } else if (formData.type === "decentralized") {
        const response = await fetch(
          `${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/client/${formData.region}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
            body: jsonData,
          }
        );

        if (response.status === 200) {
          const responseData = await response.json();
          setFormData(initialFormData);
          console.log("vpn data", responseData);
          setverify(true);
        } else {
          setMsg("error");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProjectsData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/client/${region}`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        console.log("vpn decentralized", response);

        if (response.status === 200) {
          // Filter the data based on the domain ID
          const wallet = Cookies.get("platform_wallet");
          const payload: any[] = response.data.payload;
          const filteredData = payload.filter(
            (item) => item?.walletAddress === wallet
          );
          setprojectsData(filteredData);
          console.log("decentralized", filteredData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchVpnDedicated = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/vpn/all/${region}`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        console.log("vpn dedicated", response);

        if (response.status === 200) {
          // Filter the data based on the domain ID
          const wallet = Cookies.get("platform_wallet");
          const payload: any[] = response.data.payload;
          const filteredData = payload.filter(
            (item) => item?.walletAddress === wallet
          );
          setdedicatedVpnData(filteredData);
          console.log("dedicated", filteredData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectsData();
    fetchVpnDedicated();
  }, [buttonset, region]);

  const gotovpn = () => {
    setbuttonset(false);
  };

  const handleNavigation = (page: string) => {
    console.log(`Navigating to ${page} page from vpnPage...`);
    // Additional navigation logic if needed
  };

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    // Update the selected region when the dropdown value changes
    setregion(e.target.value);
  };

  const loggedin = Cookies.get("platform_token");
  const wallet = Cookies.get("platform_wallet");

  useEffect(() => {
    const handleConnectWallet = async () => {
      if (!loggedin && !wallet) {
        try {
          const isConnect = await connectWallet();
          if (isConnect) {
            window.location.reload();
          }
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      }
    };
    handleConnectWallet();
  }, [loggedin, wallet]);

  if (!loggedin && !wallet) {
    return (
      <div className="min-h-screen text-center text-white">
        <div style={{ marginTop: "30vh" }} className="text-2xl">
          Wallet not connected, please authorize to view the content.
        </div>
      </div>
    );
  }

  return (
    <div className="py-0">
      <section className="">
        <div className="px-10 mx-auto">
          <div className="w-full mx-auto text-left md:text-center">
            {subscription === "desc" && (
              <div>
                <div className="text-white font-bold text-3xl mt-0">
                  111 NFT VPN Subscription
                </div>
                <div className="text-gray-300 text-2xl w-1/3 mx-auto mt-6">
                  3 months of Erebrus, Each Erebrus subscription comes with 2
                  clients
                </div>
                <div className="text-center mt-8 mb-8">
                  <button
                    className="py-3 px-14 rounded-lg font-bold"
                    style={{ backgroundColor: "#11D9C5" }}
                  >
                    Mint Now
                  </button>
                </div>
                <div className="text-gray-400 text-xl w-1/3 mx-auto">
                  Pricing starts at 1.11 APT only, Get your subscription at an
                  unbeatable price.
                </div>
                <div>
                  <button
                    onClick={() => {
                      setSubscription("compare");
                    }}
                    style={{ color: "#11D9C5" }}
                    className="mt-6"
                  >
                    Comparison of VPNs. Learn more{" "}
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setabout(true);
                    }}
                    style={{ color: "#11D9C5" }}
                    className="mt-4"
                  >
                    About erebrus VPN{" "}
                  </button>
                </div>

                <div
                  className="m-4 text-white px-10 py-14 text-xl rounded-2xl"
                  style={{ backgroundColor: "#222944" }}
                >
                  <div className="flex gap-4">
                    <div className="w-1/3">
                      <Image
                        src="/sub1.png"
                        alt=""
                        width="100"
                        height="100"
                        className="mx-auto"
                      />
                      <div>Trade the NFT on marketplace</div>
                    </div>
                    <div className="w-1/3">
                      <Image
                        src="/sub2.png"
                        alt=""
                        width="100"
                        height="100"
                        className="mx-auto"
                      />
                      <div>Access to NetSepio webapp, browser extension </div>
                    </div>
                    <div className="w-1/3">
                      <Image
                        src="/sub3.png"
                        alt=""
                        width="100"
                        height="100"
                        className="mx-auto"
                      />
                      <div>Exclusive 111 only NFT</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {about && (
              <div
                style={{ backgroundColor: "#222944CC" }}
                className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                id="popupmodal"
              >
                <div className="relative w-full max-w-2xl max-h-full">
                  <div
                    className="relative rounded-lg shadow dark:bg-gray-700 text-left"
                    style={bg}
                  >
                    <div className="px-10 border-b pt-6 pb-6 border-gray-500">
                      <p className="text-2xl text-white font-bold">
                        About Erebrus
                      </p>
                    </div>
                    <div className="text-gray-300 px-10 py-6 border-b border-gray-500">
                      <p className="text-md">
                        Erebrus is a shared decentralized VPN Service based on
                        the WireGuard VPN Protocol. It is designed to enhance
                        users' privacy, anonymity, and security when using
                        Public VPNs.
                      </p>
                      <p className="text-md mt-6">
                        With a strict no logs policy, Erebrus ensures that user
                        data is not stored or tracked. One of the unique
                        features of Erebrus is its community-driven network.
                        Anyone can become a node operator and contribute to the
                        network, and in return, they can receive rewards.
                      </p>
                      <p className="text-md mt-6">
                        This decentralized approach ensures that the VPN service
                        is not controlled by a single entity, promoting
                        transparency and trust. Being an open-source solution,
                        Erebrus is committed to transparency in its operations.
                        Users can review the source code and understand how the
                        VPN service operates. This transparency provides users
                        with confidence in the security and privacy measures
                        implemented by Erebrus.
                      </p>
                      <p className="text-md mt-6">
                        Overall, Erebrus aims to provide a reliable and secure
                        VPN service while prioritizing user privacy and
                        maintaining transparency in its operations.
                      </p>
                    </div>
                    <div className="">
                      <button
                        style={{ color: "#11D9C5" }}
                        onClick={() => {
                          setabout(false);
                        }}
                        type="button"
                        className="w-full text-black font-semibold text-lg py-6 px-10 text-right"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {subscription === "compare" && (
              <>
                <div className="text-white font-bold text-2xl text-left mb-4">
                  Comparison of VPNs
                </div>
                <div className="rounded-2xl flex mb-4 text-gray-400" style={bg}>
                  <div
                    style={{ backgroundColor: "#788AA3" }}
                    className="w-1/4 rounded-l-2xl text-white text-left"
                  >
                    <div className="px-8 pt-20">Network</div>
                    <div className="px-8 pt-10">Reliability</div>
                    <div className="px-8 pt-20">Accessibility</div>
                    <div className="px-8 py-10">Transparency in 
operations</div>
                    <div className="px-8 pt-20">Privacy</div>
                    <div className="px-8 pt-20">IP Address</div>
                    <div className="px-8 pt-20">Performance</div>
                    <div className="px-8 pt-10">Customization</div>
                    <div className="px-8 pt-10">IP whitelisting</div>
                    
                  </div>
                  <div className="w-1/4 text-left">
                    <div className="uppercase px-2 py-4 text-gray-500">Centralized vpnS</div>
                    <div className="border-t border-gray-500 p-2">
                      Centralized - sole providers servers and infrastructure
                    </div>
                    <div className="border-t border-gray-500 px-2 py-8">
                      Solely dependent on providers servers
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Solely dependent on providers servers capacity
                    </div>
                    <div className="border-t border-gray-500 p-2">Limited</div>
                    <div className="border-t border-gray-500 px-2 py-16">
                      - Access Logs may be stored and tracked<br></br>-
                      Potential risk of privacy breaches
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Multiple users share the same IP address
                    </div>
                    <div className="border-t border-gray-500 px-2 py-8">
                      Shared resources and bandwidth with multiple users
                    </div>
                    <div className="border-t border-gray-500 px-2 py-6">
                      N/A
                    </div>
                    <div className="border-t border-gray-500 p-2">N/A</div>
                  </div>
                  <div className="w-1/4 text-left">
                    <div className="uppercase px-2 py-4 text-gray-500">Erebrus</div>
                    <div className="border-t border-gray-500 p-2">
                      Decentralized - Community- driven network with node
                      operators
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Decentralized hence better uptime than centralized service
                      providers as anyone can setup a VPN service node
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Scale up/down is based on Network Demand and Supply
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Open-source code
                    </div>
                    <div className="border-t border-gray-500 px-2 py-10">
                      - No logs policy, ensuring user data is not stored or
                      tracked<br></br>- `Pay in crypto` so users personal
                      identifiable info like credit cards, emails is not
                      collected
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Multiple users will share the same IP address
                    </div>
                    <div className="border-t border-gray-500 px-2 py-8">
                      Shared resources and bandwidth with multiple users
                    </div>
                    <div className="border-t border-gray-500 px-2 py-6">
                      N/A
                    </div>
                    <div className="border-t border-gray-500 p-2">N/A</div>
                  </div>
                  <div className="w-1/4 text-left">
                    <div className="uppercase px-2 py-4 text-gray-500">Sotreus</div>
                    <div className="border-t border-gray-500 p-2">
                      Managed by NetSepio across various regions for VPN and
                      Firewall
                    </div>
                    <div className="border-t border-gray-500 px-2 py-8">
                      As per the SLA Provided by NetSepio for both managed VPN
                      and Firewall
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Solely based on the regions and number of subscribed users
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Open-source code
                    </div>
                    <div className="border-t border-gray-500 px-2 py-1">
                      - No logs policy, ensuring user data is not stored or
                      tracked
                      <br></br>- `Pay in crypto` so users personal identifiable
                      info like credit cards, emails is not collected
                      <br></br>- Greater control over online activities and data
                      reduces the chances of compromise.
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Dedicated VPN + Firewall with a static IP
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Exclusive access to the resources, bandwidth, dedicated
                      connection, ensuring reliable and consisten, performance
                    </div>
                    <div className="border-t border-gray-500 px-2 py-3">
                      Control over specific server locations with DNS Firewall
                      options
                    </div>
                    <div className="border-t border-gray-500 p-2">
                      Option to make resources available only to known IP
                      addresses.
                    </div>
                  </div>
                </div>
              </>
            )}

            {subscription === "done" && (
              <>
                <h1 className="mb-8 ml-6 text-start text-2xl font-bold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                  <span className="text-white">My VPNs</span>
                </h1>
                {buttonset && (
                  <>
                    <div className="flex text-white text-xs mb-4">
                      <button
                        className="p-4 px-3 rounded-l-lg"
                        style={{
                          backgroundColor: buttonset ? "#4B5995" : "#222944",
                        }}
                        onClick={() => setvpntype("decentralized")}
                      >
                        Create VPNs
                      </button>
                      <button
                        className="p-4 px-6 rounded-r-lg"
                        style={{
                          backgroundColor: !buttonset ? "#4B5995" : "#222944",
                        }}
                        onClick={() => setbuttonset(false)}
                      >
                        My VPNs
                      </button>
                    </div>
                    <section className="rounded-xl" style={bg}>
                      <div className="px-5 mx-auto max-w-3xl rounded-xl">
                        <div className="w-full mx-auto text-left py-14">
                          <h1 className="text-4xl font-bold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
                            <span className="text-white text-center">
                              Create Your VPN
                            </span>
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

                              <div className="mb-10">
                                <select
                                  id="region"
                                  style={border}
                                  className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                  value={formData.region}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option
                                    className="bg-white text-black"
                                    value=""
                                  >
                                    Select Region
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="us-east-2"
                                  >
                                    us-east-2
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="ap-southeast-1"
                                  >
                                    ap-southeast-1
                                  </option>
                                </select>
                              </div>

                              <div className="mb-10">
                                <select
                                  id="type"
                                  style={border}
                                  className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                  value={formData.type}
                                  onChange={handleInputChange}
                                  required
                                >
                                  <option
                                    className="bg-white text-black"
                                    value=""
                                  >
                                    Select VPN type
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="dedicated"
                                  >
                                    Dedicated
                                  </option>
                                  <option
                                    className="bg-white text-black"
                                    value="decentralized"
                                  >
                                    Decentralized
                                  </option>
                                </select>
                              </div>
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

                          {verify && (
                            <div
                              style={bgverify}
                              className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                              id="popupmodal"
                            >
                              <div className="relative p-4 lg:w-1/4 w-full max-w-2xl max-h-full">
                                <div
                                  className="relative rounded-lg shadow dark:bg-gray-700"
                                  style={bg2}
                                >
                                  <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                                    <button
                                      onClick={() => setbuttonset(false)}
                                      type="button"
                                      className="text-gray-900 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                      >
                                        <path
                                          stroke="currentColor"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          stroke-width="2"
                                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                      </svg>
                                      <span className="sr-only">
                                        Close modal
                                      </span>
                                    </button>
                                  </div>

                                  <Image
                                    src={emoji}
                                    alt="info"
                                    className="mx-auto"
                                  />

                                  <div className="p-4 md:p-5 space-y-4">
                                    <p className="text-3xl text-center font-bold">
                                      Done!
                                    </p>
                                    <p
                                      className="text-md text-center"
                                      style={text}
                                    >
                                      VPN deployment successful.
                                    </p>
                                  </div>

                                  <div className="flex items-center p-4 md:p-5 rounded-b">
                                    <button
                                      style={button}
                                      onClick={gotovpn}
                                      type="button"
                                      className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                      My VPNs
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          {loading && (
                            <div
                              style={{
                                position: "absolute",
                                top: 700,
                                left: 0,
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  zIndex: 9999,
                                }}
                              >
                                <div
                                  style={{
                                    border: "8px solid #f3f3f3",
                                    borderTop: "8px solid #3498db",
                                    borderRadius: "50%",
                                    width: "50px",
                                    height: "50px",
                                    animation: "spin 1s linear infinite",
                                  }}
                                ></div>
                              </div>
                            </div>
                          )}
                          {msg == "success" && (
                            <p className="text-green-500">Successful</p>
                          )}

                          {msg == "error" && (
                            <p className="text-red-500">
                              Failed to create VPN. Enter unique name.
                            </p>
                          )}
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {!buttonset && (
                  <>
                    {/* {projectsData && projectsData?.length > 0 && (
                  <h1 className="mb-8 ml-6 text-start text-2xl font-bold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                    <span className="text-white">My VPNs</span>
                  </h1>
                )} */}
                    <section className="pb-10 rounded-xl">
                      {loading ? (
                        // <Loader />
                        <div className="min-h-screen"></div>
                      ) : (!projectsData || projectsData?.length == 0) &&
                        (!dedicatedVpnData || dedicatedVpnData?.length == 0) ? (
                        <div className="w-full max-w-7xl mx-auto py-10 rounded-xl text-start">
                          <div className="lg:flex md:flex lg:p-0 md:p-20 p-10 gap-10">
                            <div className="lg:w-1/2 md:w-1/2 w-full">
                              <Image src={novpn} alt="" />
                            </div>
                            <div className="lg:w-1/2 md:w-1/2 w-full lg:mt-10 md:mt-0 mt-10">
                              <h2 className="text-3xl font-semibold text-white">
                                Revamp Your Security, Sotreus Unites VPN and
                                Firewall for Total Protection
                              </h2>
                              <h3 className="text-gray-500 mt-4 lg:w-4/5 md:w-4/5">
                                Sotreus is a dedicated WireGuard VPN and
                                firewall service designed by NetSepio
                              </h3>
                              <div className="mt-10">
                                <button
                                  style={button}
                                  onClick={() => setbuttonset(true)}
                                  className="py-4 px-10 rounded-lg font-bold"
                                >
                                  Create your VPN
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="text-white text-4xl py-20 font-bold mt-20">
                            Easy Setup to Start Using Sotreus VPN
                          </div>
                          <div
                            style={bg}
                            className="text-white text-xl lg:flex md:flex gap-10 p-10 rounded-lg"
                          >
                            <div className="w-1/2">
                              <div className="border-b border-dashed mb-4 pb-2">
                                1. Create{" "}
                                <span style={text}>your VPN on NetSepio</span>
                              </div>
                              <Image src={vpn1} className="p-4" alt="" />
                              <div className="border-b border-dashed my-4 pb-2">
                                2. <span style={text}>Click</span>{" "}
                                <a
                                  href="https://www.wireguard.com/install/"
                                  target="_blank"
                                  style={text2}
                                >
                                  Here
                                </a>{" "}
                                <span style={text}>to</span> Download{" "}
                                <span style={text}>and</span> Install WireGuard
                              </div>
                              <div className="mb-4 pb-2 text-sm p-4">
                                (a) <span style={text}>Download</span> config
                                form{" "}
                                <span style={text}>
                                  dashboard and import to
                                </span>{" "}
                                wireguard <span style={text}>and</span> activate
                              </div>
                              <Image src={vpn2} className="mb-4 p-4" alt="" />
                              <Image src={vpn3} className="p-4" alt="" />
                              <div className="my-4 pb-2 text-sm p-4">
                                (b) <span style={text}>Open</span> Pihole{" "}
                                <span style={text}>&gt;</span> Domains{" "}
                                <span style={text}>&gt;</span> Add Domain To
                                Blacklist{" "}
                                <span style={text}>
                                  &gt; it no longer opens on your network
                                </span>
                              </div>
                              <Image src={vpn4} className="p-4" alt="" />
                            </div>
                            <div className="w-1/2">
                              <div className="border-b border-dashed mb-4 pb-2">
                                3. <span style={text}>Set up</span> Sotreus{" "}
                                <span style={text}>on</span> WireGuard
                              </div>
                              <Image src={vpn5} className="p-4" alt="" />
                              <div className="border-b border-dashed my-4 pb-2">
                                4. <span style={text}>Create</span> Client{" "}
                                <span style={text}>on Sotreus</span>
                              </div>
                              <Image src={vpn6} className="p-4" alt="" />
                              <div className="border-b border-dashed my-4 pb-2">
                                5. <span style={text}>Manage</span> Domain
                                Blacklist <span style={text}>and </span>{" "}
                                Whitelist <span style={text}>on Sotreus</span>
                              </div>
                              <Image src={vpn7} className="p-4" alt="" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mx-6">
                          <div className="flex gap-4">
                            <select
                              id="region"
                              style={border}
                              className="shadow border flex appearance-none rounded lg:w-1/5 md:w-1/3 py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              value={region}
                              onChange={handleRegionChange}
                              required
                            >
                              <option className="bg-white text-black" value="">
                                Select Region
                              </option>
                              <option
                                className="bg-white text-black"
                                value="us-east-2"
                              >
                                us-east-2
                              </option>
                              <option
                                className="bg-white text-black"
                                value="ap-southeast-1"
                              >
                                ap-southeast-1
                              </option>
                            </select>

                            <div className="flex text-white text-xs">
                              <button
                                className="p-4 px-3 rounded-l-lg"
                                style={{
                                  backgroundColor:
                                    vpntype === "decentralized"
                                      ? "#4B5995"
                                      : "#222944",
                                }}
                                onClick={() => setvpntype("decentralized")}
                              >
                                Decentralized
                              </button>
                              <button
                                className="p-4 px-6 rounded-r-lg"
                                style={{
                                  backgroundColor:
                                    vpntype === "dedicated"
                                      ? "#4B5995"
                                      : "#222944",
                                }}
                                onClick={() => setvpntype("dedicated")}
                              >
                                Dedicated
                              </button>
                            </div>

                            <div className="ml-auto text-white">
                              <button
                                style={{ border: "1px solid #11D9C5" }}
                                onClick={() => setbuttonset(true)}
                                className="px-4 py-3 mb-2 text-xs font-semibold rounded-lg w-full sm:mb-0"
                              >
                                Add More VPNs
                              </button>
                            </div>
                          </div>

                          {vpntype === "decentralized" && (
                            <>
                              <div
                                className="w-full h-full lg:px-10 md:px-10 p-4 rounded-lg mt-4"
                                style={bg}
                              >
                                <div className="w-full px-4 flex justify-between">
                                  <h3 className="text-lg leading-12 mb-2 w-1/4">
                                    <div className="flex" style={text}>
                                      VPN Id
                                    </div>
                                  </h3>

                                  <div className="lg:flex md:flex justify-between w-1/4">
                                    <div>
                                      <div
                                        className="text-lg rounded-lg pr-1"
                                        style={text}
                                      >
                                        VPN Name
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="text-lg rounded-lg pr-1 flex w-1/4"
                                    style={text}
                                  >
                                    Download Config
                                  </div>

                                  <div
                                    className="text-lg flex w-1/4"
                                    style={text}
                                  >
                                    <p>QR Code</p>
                                  </div>
                                </div>
                              </div>

                              <MyVpnContainer
                                metaDataArray={projectsData}
                                MyReviews={false}
                              />
                            </>
                          )}

                          {vpntype === "dedicated" && (
                            <>
                              <div
                                className="w-full h-full lg:px-10 md:px-10 p-4 rounded-lg mt-4"
                                style={bg}
                              >
                                <div className="w-full px-4 flex justify-between">
                                  <h3 className="text-lg leading-12 mb-2 w-1/4">
                                    <div className="flex" style={text}>
                                      VPN Id
                                    </div>
                                  </h3>

                                  <div className="lg:flex md:flex justify-between w-1/4">
                                    <div>
                                      <div
                                        className="text-lg rounded-lg pr-1"
                                        style={text}
                                      >
                                        VPN endpoint
                                      </div>
                                    </div>
                                  </div>

                                  <div
                                    className="text-lg rounded-lg pr-1 flex w-1/4"
                                    style={text}
                                  >
                                    Firewall endpoint
                                  </div>

                                  <div
                                    className="text-lg flex w-1/4"
                                    style={text}
                                  >
                                    <p>Password</p>
                                  </div>

                                  <div
                                    className="text-lg flex w-1/8"
                                    style={text}
                                  >
                                    <p>Delete</p>
                                  </div>
                                </div>
                              </div>

                              <VpnContainerDedicated
                                metaDataArray={dedicatedVpnData}
                                MyReviews={false}
                              />
                            </>
                          )}
                        </div>
                      )}

                      {loading && (
                        <div
                          style={{
                            position: "absolute",
                            top: 700,
                            left: 0,
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              zIndex: 9999,
                            }}
                          >
                            <div
                              style={{
                                border: "8px solid #f3f3f3",
                                borderTop: "8px solid #3498db",
                                borderRadius: "50%",
                                width: "50px",
                                height: "50px",
                                animation: "spin 1s linear infinite",
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </section>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vpn;
