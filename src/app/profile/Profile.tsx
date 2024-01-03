"use client"
import Cookies from "js-cookie";
import axios from "axios";
import emoji from "../../../public/EmojiMessage.png";
import profileimg from "../../../public/female.png";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import connectWallet from "../../../modules/connectwallet";
import { removePrefix } from "../../../modules/Utils/ipfsUtil";
import { NFTStorage } from "nft.storage";
import Image from 'next/image';
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw"
const client = new NFTStorage({ token: API_KEY });
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
  discord: string;
  twitter: string;
  country: string;
  profilePictureUrl: string;
}

const Profile = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileset, setprofileset] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<any>(null);
  const [msg, setMsg] = useState<string>("");

  const navigate = (path: string) => {
    window.location.href = path;
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

  const bgverify = {
    backgroundColor: "#141a31",
  };

  const text = {
    color: "#788AA3",
  };

  const initialFormData: FormData = {
    name: "",
    country: "",
    profilePictureUrl: "",
    discord: "",
    twitter: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  async function uploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      const blobDataImage = new Blob([e.target.files![0]]);
      const metaHash = await client.storeBlob(blobDataImage);
      setFormData({
        ...formData,
        profilePictureUrl: `ipfs://${metaHash}`,
      });
      console.log("profilePictureUrl", metaHash);
    } catch (error) {
      console.log("Error uploading file: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const auth = Cookies.get("platform_token");

    try {
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("country", formData.country);
      formDataObj.append("discord", formData.discord);
      formDataObj.append("twitter", formData.twitter);
      formDataObj.append("profilePictureUrl", formData.profilePictureUrl);

      // Convert FormData to JavaScript Object
      const formDataObject: { [key: string]: string | File | null } = {};
      formDataObj.forEach((value, key) => {
        formDataObject[key] = value;
      });

      // Convert JavaScript Object to JSON string
      const jsonData = JSON.stringify(formDataObject);

      const response = await fetch(`${REACT_APP_GATEWAY_URL}api/v1.0/profile`, {
        method: "PATCH",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
        body: jsonData,
      });

      if (response.status === 200) {
        setFormData(initialFormData);
        setMsg("success");
        // localStorage.setItem('submissionProfile', 'true');
      } else {
        setMsg("error");
      }
    } catch (error) {
      console.error("Error:", error);
      setMsg("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(
          `${REACT_APP_GATEWAY_URL}api/v1.0/profile`,
          {
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth}`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData(response.data.payload);
          console.log(response.data);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileset]);

  const gotodashboard = async () => {
    navigate("/view-my-reviews");
  };

  const handleProfile = () => {
    setMsg("");
    setprofileset(true);
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
    <div
      
    >
      <section className="">
        <div className="px-10 mx-auto">
          <div className="w-full mx-auto text-left w-full md:text-center">
            <h1 className="mb-8 text-start text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-3xl md:tracking-tight">
              <span className="text-white">Profile</span>
            </h1>

            {!profileset && (
              <section className="pb-10 rounded-xl" style={bg}>
                <div className="px-20 mx-auto rounded-xl">
                  <div className="w-full mx-auto text-left py-10">
                    <h1 className="text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                      <span className="text-white">Set Your Profile</span>
                    </h1>

                    <form
                      id="myForm"
                      className="rounded pt-10"
                      onSubmit={handleSubmit}
                    >
                      <div className="lg:flex md:flex justify-between">
                        <div className="flex items-center lg:justify-start md:justify-start justify-center mb-40 ml-10">
                          <div className="rounded-2xl h-36 w-36 ring-1 ring-black bg-gray-200">
                            {formData.profilePictureUrl ? (
                              <img
                                alt="alt"
                                src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                  formData.profilePictureUrl
                                )}`}
                                className="rounded-2xl"
                                width="170"
                                height="170"
                              />
                            ) : (
                              <label
                                htmlFor="upload"
                                className="flex flex-col items-center gap-2 cursor-pointer mt-12"
                              >
                                <input
                                  id="upload"
                                  type="file"
                                  className="hidden"
                                  onChange={uploadImage}
                                  accept="image/*"
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-10 w-10 fill-white stroke-indigo-500"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </label>
                            )}
                          </div>
                        </div>

                        <div className="mb-10 lg:w-3/4 md:w-3/4 mt-10">
                          <div className="lg:flex md:flex justify-between gap-4">
                            <div className="mb-10 w-1/2">
                              <input
                                type="text"
                                id="name"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-10 w-1/2">
                              <input
                                type="text"
                                id="country"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="lg:flex md:flex justify-between gap-4">
                            <div className="mb-0 w-1/2">
                              <input
                                type="text"
                                id="discord"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Discord"
                                value={formData.discord}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>

                            <div className="mb-0 w-1/2">
                              <input
                                type="text"
                                id="twitter"
                                style={border}
                                className="shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Twitter"
                                value={formData.twitter}
                                onChange={handleInputChange}
                                // required
                              />
                            </div>
                          </div>

                          <div className="text-center pt-10 w-1/2">
                        <div className="pb-10 space-x-0 md:space-x-2 md:mb-8">
                          <button
                            style={button}
                            type="submit"
                            value="submit"
                            className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                          >
                            Set Your Profile
                          </button>
                        </div>
                      </div>

                        </div>
                      </div>
                      
                    </form>

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
                          >
                            {/* <Loader/> */}
                          </div>
                        </div>
                      </div>
                    )}
                    {msg == "success" && (
                      <div
                        style={bgverify}
                        className="flex overflow-y-auto overflow-x-hidden fixed inset-0 z-50 justify-center items-center w-full max-h-full"
                        id="popupmodal"
                      >
                        <div className="relative p-4 lg:w-1/4 w-full max-w-2xl max-h-full">
                          <div className="relative rounded-lg shadow bg-white">
                            <div className="flex items-center justify-end p-4 md:p-5 rounded-t dark:border-gray-600">
                              {/* <h3 className="text-2xl font-semibold">
                Verify Your Registration
                </h3> */}
                              <button
                                onClick={handleProfile}
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
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>

                            <Image src={emoji} alt="info" className="mx-auto" />

                            <div className="p-4 md:p-5 space-y-4">
                              <p className="text-3xl text-center font-bold">
                                Woo hoo!!
                              </p>
                              <p className="text-md text-center" style={text}>
                                Congrats! we have successfully updated your
                                profile.
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
                                onClick={gotodashboard}
                                type="button"
                                className="w-full text-black font-bold focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-md px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Go to Dashboard
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {msg == "error" && (
                      <p className="text-red-500">
                        There is some issue in updating your profile. Try again
                        after sometime.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {profileset && (
              <>
                <section className="pb-10 rounded-xl" style={bg}>
                  <h1 className="pt-8 pl-8 text-start text-4xl font-semibold leading-none tracking-normal text-gray-100 md:text-2xl md:tracking-tight">
                    <span className="text-white">Basic information</span>
                  </h1>
                  <div className="px-24 mx-auto rounded-xl">
                    <div className="w-full mx-auto text-left">
                      <form id="myForm" className="rounded pt-10">
                        <div className="lg:flex md:flex justify-between">
                          <div className="lg:w-1/4 md:w-1/4">
                            <div className="flex items-center mb-10 justify-center">
                              {profileData?.profilePictureUrl ? (
                                <div className="rounded-2xl h-36 w-36">
                                <img
                                  alt="alt"
                                  src={`${"https://cloudflare-ipfs.com/ipfs"}/${removePrefix(
                                    profileData?.profilePictureUrl
                                  )}`}
                                  className="rounded-2xl"
                                  width="170"
                                  height="170"
                                />
                                </div>
                              ) : (
                                <div className="rounded-2xl h-36 w-36 ring-offset-2 ring-1 ring-black bg-gray-200">
                                  {/* <FaUserCircle className="text-3xl text-gray-500 w-48 h-48" /> */}
                                  <Image
                                    alt="alt"
                                    src={profileimg}
                                    className="rounded-2xl mx-auto"
                                    width="170"
                                    height="170"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="lg:w-3/4 md:w-3/4">
                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                style={border}
                                className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                {profileData?.name
                                  ? profileData?.name
                                  : "Name"}
                              </div>

                              <div
                                style={border}
                                className="mb-10 shadow border appearance-none rounded w-full py-4 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                              >
                                {profileData?.country
                                  ? profileData?.country
                                  : "Country"}
                              </div>
                            </div>

                            <div className="lg:flex md:flex justify-between gap-4">
                              <div
                                style={border}
                                className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight"
                              >
                                {profileData?.discord
                                  ? profileData?.discord
                                  : "Discord"}
                              </div>

                              <div
                                style={border}
                                className="mb-10 lg:w-1/2 md:w-1/2 rounded w-full py-4 px-3 text-gray-200 leading-tight"
                              >
                                {profileData?.twitter
                                  ? profileData?.twitter
                                  : "Twitter"}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-center pt-0 w-3/4 ml-auto pb-52">
                          <div className="">
                            <button
                              style={button}
                              onClick={() => setprofileset(false)}
                              className="px-14 py-3 mb-2 text-lg text-black font-semibold rounded-lg w-full sm:mb-0 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80"
                            >
                              Edit Profile
                            </button>
                          </div>
                        </div>
                      </form>

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
                            >
                              {/* <Loader/> */}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;
