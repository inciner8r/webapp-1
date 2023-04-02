import axios from 'axios';

export async function fetchMetadataFromIPFS(ipfsUrl: string, id: string): Promise<any> {
  try {
    const response = await axios.get(ipfsUrl);
    const data = {
      ...response.data, 
      ipfsUrl: ipfsUrl,
      id: id,      
    }
    console.log('Metadata fetched from IPFS:', data);
    return data;
  } catch (error) {
    console.error('Error fetching metadata from IPFS:', error);
    return null;
  }
}
