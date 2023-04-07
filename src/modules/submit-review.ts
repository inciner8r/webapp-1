import { NFTStorage } from 'nft.storage';
import {getJwtTokenFromStore} from './authentication';

//const PUBLIC_GATEWAY_URL = process.env.REACT_APP_DEV_GATEWAY_URL;
const PUBLIC_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
const API_KEY = process.env.REACT_APP_NFT_STORAGE_API_KEY;
const client = new NFTStorage({ token: API_KEY! });

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
		console.error(error);
		return [null, error];
	}
};

interface ReviewType {
	category: string;
	domainAddress: string;
	siteUrl: string | undefined;
	siteType: string;
	siteTag: string;
	siteSafety: string;
	metaDataUri: string;
	voter: string;
}

export const createReview = async (data: ReviewType) => {
	try {
        const token = await getJwtTokenFromStore();
		let response = await fetch(`${PUBLIC_GATEWAY_URL}/delegateReviewCreation`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `${token}`
			},
			body: JSON.stringify(data)
		});

		let result = await response.json();
		return [result, null];
	} catch (error) {
		return [null, error];
	}
};