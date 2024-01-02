import Link from "next/link";
import { removePrefix } from "../modules/Utils/ipfsUtil";
import React from "react";
import eye2 from '../public/eye2.png';
import Image from "next/image";

interface ReviewCardProps {
  metaData: {
    blockchain: string;
    coverImageHash: string;
    createdAt: string;
    category: string;
    description: string;
    domainName: string;
    headline: string;
    logoHash: string;
    title: string;
    verified: boolean;
    creatorName: string;
    id: string;
  } | null;
  MyReviews?: boolean;
  // review?: ReviewCreated;
  onReviewDeleted?: () => void;
}

const background = {
  backgroundColor: "#222944",
};

const color = {
  color: "#788AA3",
};

const color2 = {
  color: "#11D9C5",
};

const backgroundbutton = {
  backgroundColor: "#11D9C5",
};

const AllProjectsCard: React.FC<ReviewCardProps> = ({
  metaData,
  MyReviews = false,
  onReviewDeleted,
}) => {
 

  if (!metaData) {
    return (
      <div
        className="flex flex-col items-center justify-center w-full max-w-sm mx-auto"
      >
        <div
          className="w-full h-72 p-5 bg-center bg-cover"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div
            className="animate-spin rounded-full h-32 w-32 mx-auto border-t-2 border-b-2 border-green-200"
           
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full max-w-5xl"
      
    >
      <div
        className="w-full h-full lg:p-10 md:p-10 p-4 rounded-lg"
        
      >
            <div>
                <div className="lg:flex m:flex justify-start">
                <div className="w-1/4">
                    <img
                      alt="alt"
                      src={`${
                        "https://cloudflare-ipfs.com/ipfs"
                      }/${removePrefix(metaData?.logoHash)}`}
                      className=""
                      width="150"
                      height="150"
                    />
                </div>
                <div className="w-full lg:px-4 md:px-4">
                  <h3
                    className="leading-12 mb-2 text-white"
                    
                  >
                    <div className="lg:flex md:flex justify-between">
                      <div className="text-4xl font-bold">{metaData.title}</div>
                      <div className="mt-4 flex flex-col text-end" style={color}>
                      <div className="text-md rounded-lg">
                      Creator Name : {metaData.creatorName}
                    </div>
                  <div className="text-md rounded-lg">
                      Blockchain : {metaData.blockchain}
                    </div>
                    </div>
                    </div>
                  </h3>

              

              <div style={background} className="p-4 rounded-xl">
                  <div className="lg:flex md:flex justify-between">
                    <div className="">
                  <div
                    className="flex"
                 
                    style={color}
                  >
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.domainName} /
                    </div>     
                    <div className="text-lg rounded-lg pr-1">
                      {metaData.category}
                    </div>
                  </div>
                  </div>
                  <div className="text-white flex gap-2 text-xs">
                  <Link href={`/reviews/${metaData.domainName.replace(/^https:\/\//, '')}`}>
                  <div className="flex py-2 px-2 gap-1 text-black" style={backgroundbutton}>
                  <Image src={eye2} alt="info" className="w-4 h-4"/> View Project
                    </div>
                  </Link>
                    </div>
              </div>
                  

                  <div className="text-md text-white text-start flex mt-2">
                  <div style={color} className="w-1/5">
                  Headline :  
                  </div>
                    <p
                      
                      className="w-4/5"
                    >
                      {/* Average Rating:  */}
                      
                      {metaData.headline}
                    </p>
                  </div>

                  <div className="text-md text-white text-start flex mt-2">
                  <div style={color} className="w-1/5">
                  Description : 
                  </div>
                    <p
                      
                      className="w-4/5"
                    >
                      {/* Total reviews:  */}
                      
                      {metaData.description}
                    </p>
                  </div>

                  </div>

                </div>
                </div>
            </div>
      </div>
    </div>
  );
};

export default AllProjectsCard;
