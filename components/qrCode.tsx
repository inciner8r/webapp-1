"use client"
import React, { useEffect, useState } from "react";
import QRCodeSVG from "qrcode.react";
import axios from "axios";
import Cookies from "js-cookie";
const REACT_APP_GATEWAY_URL = "https://gateway.netsepio.com/"

interface QrCodeProps {
  clientId: string;
  name: string;
  region: string;
}

export const QrCode: React.FC<QrCodeProps> = ({ clientId, name, region }) => {
  const [qrCodeData, setQrCodeData] = useState(null);

  const handleQrCode = async (clientId: string, name: string, region: string) => {
    try {
      const auth = Cookies.get("platform_token");
  
      const response = await axios.get(`${REACT_APP_GATEWAY_URL}api/v1.0/erebrus/config/${region}/${clientId}`, {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth}`,
        },
      });
      console.log(response)
      setQrCodeData(response.data);
    } catch (error) {}
  };
  

  useEffect(() => {
    handleQrCode(clientId, name, region);
  }, [clientId, name, region]);

  return (
    <div>
      {/* <label htmlFor="my-modal-3">Qr Code</label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" /> */}
      <div className="modal ">
        <div className="modal-box relative w-full bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-80">
          <p className="text-sm text-white font-medium">
            You will get the clients config qrcode here..
          </p>
          <div className="py-10 flex justify-center">
            {qrCodeData && <QRCodeSVG value={qrCodeData} size={300} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;