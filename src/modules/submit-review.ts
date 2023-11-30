import { NFTStorage } from 'nft.storage';
const API_KEY = process.env.REACT_APP_STORAGE_API || '';
const client = new NFTStorage({ token: API_KEY });

interface MetaDataType {
	name: string;
	description: string;
	category: string;
	image: string;
	domainAddress: string;
	siteUrl: string | undefined;
	siteType: string;
	siteTag: string;
	siteSafety: string;
}

export const storeMetaData = async (data: MetaDataType) => {
	try {
		const objectString = JSON.stringify(data);
		const objectBlob = new Blob([objectString], { type: 'application/json' });

		const metadata = await client.storeBlob(objectBlob);
		return [metadata, null];
	} catch (error) {
		return [null, error];
	}
};