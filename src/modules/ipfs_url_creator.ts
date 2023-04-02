const IPFS_PREFIX = 'https://ipfs.io/ipfs/';

export function createIpfsUrl(metadataURI: string): string {
  const ipfsHash = metadataURI.replace('ipfs://', '');
  console.log('ipfsHash', ipfsHash)
  return `${IPFS_PREFIX}${ipfsHash}`;
}
