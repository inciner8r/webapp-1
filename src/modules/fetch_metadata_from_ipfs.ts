import axios from 'axios';

export async function fetchMetadataFromIPFS(ipfsUrl: string): Promise<any> {
  try {
    const response = await axios.get(ipfsUrl);
    return {
      ...response.data, 
      ipfsUrl: ipfsUrl
    };
  } catch (error) {
    console.error('Error fetching metadata from IPFS:', error);
    return null;
  }
}
