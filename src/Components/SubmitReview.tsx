import { useState } from 'react';
import { storeMetaData, createReview } from '../modules/submit-review';
import store from '../store';
import Loader from './Loader';
import {motion} from 'framer-motion'
import { checkJwtToken } from '../modules/authentication';

const Submit_review = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [category] = useState<string>('website');
  const [siteTag, setSiteTag] = useState<string>('');
  const [siteSafety, setSiteSafety] = useState<string>('');
  const [siteType, setSiteType] = useState<string>('');

  const walletData = store.getState().wallet.walletData;

  if (!walletData) {
    return <Loader />;
  }

  if (!checkJwtToken()) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <label htmlFor="my-modal-3" className="cursor-pointer text-black">
        Submit Review
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <motion.div
          className="modal-box relative bg-black shadow-xl shadow-green-400/30 p-8 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2 text-green-300">
            ✕
          </label>

          <div className="w-full h-full flex flex-col text-center justify-center items-center py-10">
            <motion.h2
              className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400 text-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Sorry! <br/> <span className='text-xl font-semibold text-gray-700 text-center'> You can't submit your review right now! </span>
            </motion.h2>
          </div>
  
        </motion.div>
      </div>
      </motion.div>
    );
  }

  const handleSubmit = async () => {
    const domainAddress = new URL(`${websiteUrl}`).hostname;
    let metaData = {
      name: title,
      description: description,
      category: category,
      image: 'ipfs://bafybeica7pi67452fokrlrmxrooazsxbuluckmcojascc5z4fcazsuhsuy',
      domainAddress: domainAddress,
      siteUrl: websiteUrl,
      siteType: siteType,
      siteTag: siteTag,
      siteSafety: siteSafety,
    };
    let [CID] = await storeMetaData(metaData);
    let metaDataUri = `ipfs://${CID}`.split(',')[0];

    let reviewData = {
      category: category,
      domainAddress: domainAddress,
      siteUrl: websiteUrl,
      siteType: siteType,
      siteTag: siteTag,
      siteSafety: siteSafety,
      metaDataUri: metaDataUri,
      voter: walletData || '',
    };
    

    let [error] = await createReview(reviewData);
    if (error) {
    } else {
      window.location.reload();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <label htmlFor="my-modal-3" className="cursor-pointer text-black">
        Submit Review
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <motion.div
          className="modal-box relative bg-black shadow-xl shadow-green-400/30 p-8 rounded-lg"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2 text-green-300">
            ✕
          </label>

          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400 mb-3">Submit Your Review</h3>
          <p className="mb-5 text-gray-300">Fill out the following form to submit your review!</p>
  
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="mb-4">
              <input type="text" id="title" className="w-full p-2 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" placeholder='Enter Tile' value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
  
            <div className="mb-4">
              <input type="url" id="websiteUrl" className="w-full p-2 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" placeholder='Enter Site URL' value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
            </div>
  
            <div className="mb-4">
              <select id="siteType" className="w-full p-2 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" value={siteType} onChange={(e) => setSiteType(e.target.value)} required>
                <option value="">Select Site Type</option>
                <option value="Common Website">Common Website</option>
                <option value="Software">Software</option>
                <option value="Defi Project">Defi Project</option>
                <option value="Wallet Address">Wallet Address</option>
                <option value="Company">Company</option>
              </select>
            </div>
  
            <div className="mb-4">
              <select id="siteTag" className="w-full p-2 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" value={siteTag} onChange={(e) => setSiteTag(e.target.value)} required>
                <option value="">Select Site Tag</option>
                <option value="Genuine">Genuine</option>
                <option value="Hate">Hate</option>
                <option value="Scam">Scam</option>
                <option value="Fake">Fake</option>
                <option value="Stereotype">Stereotype</option>
              </select>
            </div> 

            <div className="mb-4">
            <select id="siteType" className="w-full p-2 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" value={siteSafety} onChange={(e) => setSiteSafety(e.target.value)} required>
              <option value="">Select Site Safety</option>
              <option value="Common Website">Safe</option>
              <option value="Software">Adware</option>
              <option value="Defi Project">Malware</option>
              <option value="Wallet Address">Spyware</option>
              <option value="Company">Phishing</option>
            </select>
          </div>

          <div className="mb-4">
            <textarea id="description" className="w-full p-2 h-20 rounded shadow-md shadow-green-200/60  my-1 bg-black text-gray-300" placeholder='Write Something about your review...' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <button type="submit" className="w-full py-2 mt-2 text-lg text-black rounded-md font-bold text-3xl transition bg-green-400 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80">Submit</button>

        </form>
      </motion.div>
    </div>
  </motion.div>
);
};

export default Submit_review;
