import { NFTStorage } from 'nft.storage';
import {getJwtTokenFromStore} from './authentication';

//const PUBLIC_GATEWAY_URL = process.env.REACT_APP_DEV_GATEWAY_URL;
const PUBLIC_GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFFODE2RTA3RjBFYTg4MkI3Q0I0MDQ2QTg4NENDQ0Q0MjA4NEU3QTgiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3MzI0NTEzNDc3MywibmFtZSI6Im5mdCJ9.vP9_nN3dQHIkN9cVQH5KvCLNHRk3M2ZO4x2G99smofw"
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
		let response = await fetch(`https://testnet.gateway.netsepio.com/api/v1.0/delegateReviewCreation`, {
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