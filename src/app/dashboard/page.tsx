"use client"
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import netsepio from "../../../public/netsepio_logo_light.png";
import netsepioname from "../../../public/productname.png";
import Cookies from "js-cookie";
import axios from 'axios';
import Image from 'next/image';
import { removePrefix } from "../../../modules/Utils/ipfsUtil";
import MyReviews from "../myreviews/ViewMyReviews";
// import Projects from "./Dashboard";
// import Reports from "./Report";
// import Vpns from "./Vpn";
import Profile from "../profile/Profile";
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

const NewDashboard = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [page, setpage] = useState<string>("dashboard");

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
    color: "#FFFFFFB2",
  };

  const navigate = (path: string) => {
    window.location.href = path;
  };

  const navMain = async () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const auth = Cookies.get("platform_token");

        const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/profile`, {
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth}`,
          },
        });

        if (response.status === 200) {
          setProfileData(response.data.payload);
          console.log(response.data)
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  },[]);

  const handleDeleteCookie = () => {
    Cookies.remove('platform_wallet');
    Cookies.remove('platform_token');
    window.location.href = '/';
  };

  return (
    <div
      className="min-h-screen"
    >
      <div className="flex">
        <div className="w-1/6 min-h-screen" style={bg}>
          <div className="pt-10 pl-10">
            <div className="flex flex-row items-center">
              <Image
                src={netsepio}
                alt="netsepio logo"
                className="h-10 w-10 mr-1"
              />
              <button
                onClick={navMain}
                className="text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-200 to-green-400 text-3xl"
              >
                <Image src={netsepioname} className="w-22 h-6" alt=""/>
              </button>
            </div>

            <div className="flex flex-col gap-3">

              <button onClick={()=>setpage("dashboard")}>
              <div className="flex flex-row items-center mt-20 gap-2" style={{ color: page === 'dashboard' ? '#11D9C5' : 'white' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<rect x="4.42578" y="4.42773" width="4.79194" height="4.79194" rx="1.4" fill="currentColor"/>
<rect x="4.42578" y="11.6152" width="4.79194" height="4.79194" rx="1.4" fill="currentColor"/>
<rect x="11.6133" y="4.42773" width="4.79194" height="4.79194" rx="1.4" fill="currentColor"/>
<rect x="11.6133" y="11.6152" width="8.38589" height="8.3859" rx="1.4" fill="currentColor"/>
</svg>

                <div className="text-md">Dashboard</div>
              </div>
              </button>

              <button onClick={()=>setpage("reviews")}>
              <div className="flex flex-row items-center gap-2" style={{ color: page === 'reviews' ? '#11D9C5' : 'white' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path d="M2.5 16.7308V3.84583C2.5 3.4625 2.62861 3.1425 2.88583 2.88583C3.1425 2.62861 3.4625 2.5 3.84583 2.5H16.1542C16.5375 2.5 16.8575 2.62861 17.1142 2.88583C17.3714 3.1425 17.5 3.4625 17.5 3.84583V12.8208C17.5 13.2042 17.3717 13.5244 17.115 13.7817C16.8578 14.0383 16.5375 14.1667 16.1542 14.1667H5.06417L2.5 16.7308ZM7.93083 11.3942L10 10.1392L12.0692 11.3942L11.5192 9.04L13.3492 7.46917L10.9442 7.25667L10 5.04833L9.05583 7.25667L6.65083 7.46917L8.48083 9.04L7.93083 11.3942Z" fill="currentColor"/>
</svg>
                <div className="text-md">Reviews</div>
              </div>
              </button>

              <button onClick={()=>setpage("projects")}>
              <div className="flex flex-row items-center gap-2" style={{ color: page === 'projects' ? '#11D9C5' : 'white' }}>
              <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.75 1.63672V5.36399L8.74999 5.4184C8.74991 5.84247 8.74983 6.2546 8.79553 6.59451C8.84705 6.97771 8.97257 7.41499 9.33579 7.77821C9.699 8.14142 10.1363 8.26694 10.5195 8.31846C10.8594 8.36416 11.2715 8.36408 11.6956 8.364H11.6956L11.75 8.36399H15V13.0913C15 15.4054 15 16.5625 14.341 17.2814C13.682 18.0004 12.6213 18.0004 10.5 18.0004H7.5C5.37868 18.0004 4.31802 18.0004 3.65901 17.2814C3 16.5625 3 15.4054 3 13.0913V6.54581C3 4.23164 3 3.07456 3.65901 2.35564C4.31802 1.63672 5.37868 1.63672 7.5 1.63672H8.75ZM10.75 1.65388V5.36399C10.75 5.86367 10.7521 6.13782 10.7777 6.32802L10.7787 6.3353L10.786 6.3363C10.9762 6.36187 11.2503 6.36399 11.75 6.36399H14.99C14.9775 6.12415 14.9493 5.94647 14.8858 5.77922C14.7716 5.47851 14.5549 5.24204 14.1214 4.7691L14.1213 4.76909L14.1213 4.76908L14.1213 4.76907L12.1287 2.59528C11.6951 2.12232 11.4784 1.88584 11.2027 1.76128C11.0694 1.70105 10.9289 1.66994 10.75 1.65388ZM5.75 10.6367C5.75 10.0844 6.19772 9.63672 6.75 9.63672L11.25 9.63672C11.8023 9.63672 12.25 10.0844 12.25 10.6367C12.25 11.189 11.8023 11.6367 11.25 11.6367L6.75 11.6367C6.19772 11.6367 5.75 11.189 5.75 10.6367ZM6.75 12.9094C6.19772 12.9094 5.75 13.3572 5.75 13.9094C5.75 14.4617 6.19772 14.9094 6.75 14.9094H9.75C10.3023 14.9094 10.75 14.4617 10.75 13.9094C10.75 13.3572 10.3023 12.9094 9.75 12.9094H6.75Z" fill="currentColor"/>
</svg>
                <div className="text-md">Projects</div>
              </div>
              </button>

              <button onClick={()=>setpage("reports")}>
              <div className="flex flex-row items-center gap-2" style={{ color: page === 'reports' ? '#11D9C5' : 'white' }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.86913 4.11323C4.76516 5.23432 3.33301 7.45024 3.33301 10.0007C3.33301 10.0785 3.33434 10.1561 3.33699 10.2334L8.16255 8.94035L6.86913 4.11323ZM9.76722 3.33796L11.1897 8.64686L11.2014 8.69024C11.2514 8.87595 11.3219 9.13789 11.3529 9.37806C11.3919 9.68077 11.401 10.1595 11.1193 10.6475C10.8376 11.1354 10.4184 11.3668 10.1368 11.4844C9.91331 11.5777 9.65119 11.6476 9.46536 11.6971L9.42197 11.7087L4.11237 13.1314C5.2335 15.2353 7.44935 16.6673 9.99967 16.6673C13.6816 16.6673 16.6663 13.6825 16.6663 10.0007C16.6663 6.31875 13.6816 3.33398 9.99967 3.33398C9.92187 3.33398 9.84438 3.33532 9.76722 3.33796Z" fill="currentColor"/>
<path d="M8.36114 3.88182C8.10956 2.9429 7.98376 2.47344 7.53646 2.28242C7.08915 2.0914 6.72341 2.29205 5.99195 2.69337C5.62075 2.89702 5.26476 3.12914 4.92731 3.38807C4.05911 4.05427 3.33062 4.88495 2.78345 5.83268C2.23627 6.78042 1.88113 7.82664 1.73828 8.91163C1.68277 9.33334 1.65974 9.75769 1.66897 10.181C1.68716 11.0151 1.69625 11.4322 2.08533 11.724C2.47442 12.0159 2.94388 11.8901 3.8828 11.6385L8.06847 10.517C8.97916 10.273 9.4345 10.151 9.64161 9.79224C9.84871 9.43352 9.7267 8.97818 9.48269 8.0675L8.36114 3.88182Z" fill="currentColor"/>
</svg>
                <div className="text-md">Reports</div>
              </div>
              </button>

              <button onClick={()=>setpage("vpns")}>
              <div className="flex flex-row items-center gap-2" style={{ color: page === 'vpns' ? '#11D9C5' : 'white' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.8608 5.26217L12.083 3.21454C11.3912 2.91807 10.6082 2.91807 9.9164 3.21454L5.13858 5.26217C4.80154 5.40662 4.58301 5.73803 4.58301 6.10472V10.9199C4.58301 12.6961 5.44082 14.363 6.8862 15.3954L9.93407 17.5725C10.5715 18.0278 11.4278 18.0278 12.0653 17.5725L15.1132 15.3954C16.5585 14.363 17.4163 12.6961 17.4163 10.9199V6.10472C17.4163 5.73803 17.1978 5.40662 16.8608 5.26217ZM14.5305 8.87518C14.8756 8.44392 14.8056 7.81463 14.3744 7.46962C13.9431 7.12461 13.3138 7.19453 12.9688 7.62579L10.0001 11.3367L8.95678 10.2934C8.56626 9.90286 7.93309 9.90286 7.54257 10.2934C7.15204 10.6839 7.15204 11.3171 7.54257 11.7076L8.98089 13.1459C9.61306 13.7781 10.6544 13.7204 11.2129 13.0223L14.5305 8.87518Z" fill="currentColor"/>
</svg>
                <div className="text-md">VPNs</div>
              </div>
              </button>

              <button onClick={()=>setpage("profile")}>
              <div className="flex flex-row items-center gap-2" style={{ color: page === 'profile' ? '#11D9C5' : 'white' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="9.16634" cy="7.33333" rx="4.58333" ry="4.58333" fill="currentColor"/>
<path d="M17.417 9.16602L17.417 14.666" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
<path d="M20.167 11.916L14.667 11.916" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
<path d="M15.7133 18.684C16.1365 18.5882 16.3903 18.1482 16.2027 17.757C15.6969 16.7019 14.8656 15.7748 13.7881 15.076C12.4622 14.2161 10.8376 13.75 9.16634 13.75C7.49508 13.75 5.87051 14.2161 4.54461 15.076C3.46712 15.7748 2.63579 16.7019 2.12997 17.757C1.94241 18.1482 2.19622 18.5882 2.61938 18.684C6.92945 19.6601 11.4032 19.6601 15.7133 18.684Z" fill="currentColor"/>
</svg>
                <div className="text-md">Profile</div>
              </div>
              </button>

            </div>
          </div>
        </div>
        <div className="w-5/6">
            <div className="justify-end text-white flex mr-14 mt-4">
                <div>
                {
                    profileData?.profilePictureUrl && (
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(profileData?.profilePictureUrl)}`}
                      className="mr-4 rounded-md"
                      width="30"
                      height="30"
                    />
                    )}
                  </div>
                <div className="mr-10 pt-1" style={{color:'#788AA3'}}>{profileData?.name}</div>
                <div className="pt-1" style={{color:'#FF85C2'}}><button onClick={handleDeleteCookie}>Log Out</button></div>
            </div>
            <div>
              {/* {
                 page === "dashboard" && (<Projects/>)
              } */}
              {
                 page === "reviews" && (<MyReviews/>)
              }
              {/* {
                 page === "projects" && (<Projects/>)
              }
              {
                 page === "reports" && (<Reports/>)
              }
              {
                 page === "vpns" && (<Vpns/>)
              } */}
              {
                 page === "profile" && (<Profile/>)
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export default NewDashboard;
