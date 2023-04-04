import { useState } from 'react';
import { storeMetaData, createReview } from '../modules/submit-review';
import store from '../store';
import Loader from './Loader';

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

  const handleSubmit = async () => {
    console.log('Submitting review...');
    const domainAddress = new URL(`${websiteUrl}`).hostname;
    console.log('domainAddress: ', domainAddress);
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
    console.log('metaData: ', metaData);
    let [CID] = await storeMetaData(metaData);
    console.log('CID: ', CID);
    let metaDataUri = `ipfs://${CID}`.split(',')[0];
    console.log('metaDataUri: ', metaDataUri);

    let reviewData = {
      category: category,
      domainAddress: domainAddress,
      siteUrl: websiteUrl,
      siteType: siteType,
      siteTag: siteTag,
      siteSafety: siteSafety,
      metaDataUri: metaDataUri,
      voter: walletData.walletAddress,
    };

    console.log('reviewData: ', reviewData);
    let [error] = await createReview(reviewData);
    if (error) {
      console.log('error: ', error);
    } else {
      window.location.reload();
    }
  };

  return (
    <div>
      <label htmlFor="my-modal-3">
        Submit Review
      </label>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box relative bg-black">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>

          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">Submit Your Review</h3>
          <p className="py-4 text-green-100">Fill out the following form to submit your review!</p>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="mb-4">
              <label htmlFor="title" className="text-green-200 block text-left mb-2 font-semibold">Title:</label>
              <input type="text" id="title" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>

            <div className="mb-4">
              <label htmlFor="websiteUrl" className="text-green-200 block text-left mb-2 font-semibold">Website URL:</label>
              <input type="url" id="websiteUrl" className="w-full p-2 border rounded" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} required />
            </div>


            <div className="mb-4">
              <label htmlFor="siteType" className="text-green-200 block text-left mb-2 font-semibold">Site Type:</label>
              <select id="siteType" className="w-full p-2 border rounded" value={siteType} onChange={(e) => setSiteType(e.target.value)} required>
                <option value="">Select Site Type</option>
                <option value="Common Website">Common Website</option>
                <option value="Software">Software</option>
                <option value="Defi Project">Defi Project</option>
                <option value="Wallet Address">Wallet Address</option>
                <option value="Company">Company</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="siteType" className="text-green-200 block text-left mb-2 font-semibold">Site Tag:</label>
              <select id="siteType" className="w-full p-2 border rounded" value={siteTag} onChange={(e) => setSiteTag(e.target.value)} required>
                <option value="">Select Site Tag</option>
                <option value="Common Website">Genuine</option>
                <option value="Software">Hate</option>
                <option value="Defi Project">Scam</option>
                <option value="Wallet Address">Fake</option>
                <option value="Company">Steriotype</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="siteType" className="text-green-200 block text-left mb-2 font-semibold">Site Safety:</label>
              <select id="siteType" className="w-full p-2 border rounded" value={siteSafety} onChange={(e) => setSiteSafety(e.target.value)} required>
                <option value="">Select Site Safety</option>
                <option value="Common Website">Safe</option>
                <option value="Software">Adware</option>
                <option value="Defi Project">Malware</option>
                <option value="Wallet Address">Spyware</option>
                <option value="Company">Phising</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="text-green-200 block text-left mb-2 font-semibold">Description:</label>
              <textarea id="description" className="w-full p-2 h-20 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
            </div>

            <button type="submit" className="w-full py-2 mt-2 text-lg text-black rounded-2xl transition bg-green-400 hover:bg-green-200 focus:ring focus:ring-green-300 focus:ring-opacity-80">Submit</button>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default Submit_review;
