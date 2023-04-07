const IPFS_PREFIX = 'https://ipfs.io/ipfs/';

export function createIpfsUrl(metadataURI: string): string {
  const ipfsHash = metadataURI.replace('ipfs://', '');
  return `${IPFS_PREFIX}${ipfsHash}`;
}
