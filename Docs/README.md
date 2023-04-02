You are a frontend developer and you have to take following codes and queries as reference and write code for every file path I provide you with. If you understand reply with a {short summary of what I will do} and {what you will do} and {what you understood about the project} and also tell me all the necessary dependencies I would need to install in my `react-typescript` to run this project with a each file and folder I need to create first before starting the project.

# (.env) file:
PUBLIC_GATEWAY_URL = "http://localhost:3000/api/v1.0"
PUBLIC_JSON_RPC_PROVIDER_URL = "https://polygon-mumbai.g.alchemy.com/v2/QuHFh_kiJbakSBUi8Js2Jtvaz6WfE-if"
PUBLIC_NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzNDdmNWVkNEQ5NEEwY0YxNjJlZEIyMWJkODA0NTYwY0NDMTczNjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTA4NTUzMTUwNSwibmFtZSI6Ik5ldFNlcGlvIFJldmlld3MgRGF0YSBVcGxvYWQifQ.3oI57m8CtjLpgy6iD3XmKMTd16JKvSw3E6e_NrU2G6s"
PUBLIC_ETHERSCAN_API_KEY = "5GX9E9RR2Q3JD9GC7N4MCD2EYD8I21DA2H"
PUBLIC_SUBGRAPH_URL = "https://api.thegraph.com/subgraphs/name/netsepio/netsepio-mumbai"


# Data Format returned from GraphQL:

{
  "data": {
    "reviewCreateds": [
      {
        "id": "0x003a2a736bae6f57747b547da6bab6e083a5c16426650872fbf888378fc39b0e14000000",
        "tokenId": "13",
        "domainAddress": "chat.openai.com",
        "metadataURI": "ipfs://bafkreign5yiaxiyjbrnpa5m22h75dnsh6chuaso7hu5dcjt7xih4jbwyom",
        "receiver": "0x673c4ef75688f3664a93da8592b862bf4f0e06fa"
      }
    ]
  }
}

# Graphql query to fetch all the review's {metadataURI} created by the user based on their wallet address that we get when user clicks [Connect-to-MetaMask] button on our UI:

query GetAllReviewsByUser($userWalletAddress: String!) {
  reviewCreateds(where: {receiver: $userWalletAddress}) {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}

## Query Variables for above schema:

{
  "userWalletAddress": "0x673C4EF75688f3664A93Da8592B862bF4f0E06FA"
}

# Graphql query to fetch all reviews {metadataURI}:

query GetAllReviews {
  reviewCreateds {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}

# Graphql query to fetch all the review's {metadataURI} searched by the user when user provides website url in search bar:

query GetReviewsBySiteURL($siteURL: String!) {
  reviewCreateds(where: {domainAddress: $siteURL}) {
    id
    tokenId
    domainAddress
    metadataURI
    receiver
  }
}

## Query Variables for above schema:

{
  "userWalletAddress": "0x673C4EF75688f3664A93Da8592B862bF4f0E06FA"
}

# MetaData Format stored in NFTStorage API.

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

# Code used to store MetaData in NFTStorage API:
> This code is from another project of creating the chrome extension where user can submit review's about the website.

### Following is the typescript functions file (/home/adimis/Desktop/Netsepio/ChromiumExtension/src/lib/components/SubmitReview.svelte) to store metaData into NFT Storage API:
import { NFTStorage, File } from 'nft.storage';
import { PUBLIC_NFT_STORAGE_API_KEY, PUBLIC_GATEWAY_URL } from '$env/static/public';
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

### Following is the typescript code of the sveltekit project file (/home/adimis/Desktop/Netsepio/ChromiumExtension/src/lib/modules/reviewSubmitFunctions.ts) to store metaData into NFT Storage API:
<script lang="ts">
	import { storeMetaData, createReview } from '$lib/modules/reviewSubmitFunctions';
	import { checkAuth } from '$lib/modules/secondAuth';
	import { walletAddress } from '$lib/store/store';
	import { onMount } from 'svelte';
	import Loader from './Loader.svelte';

	let showModal = false;
	let title: string;
	let description: string;
	let websiteUrl: string | undefined;
	let category: string = 'website';
	let siteTag: string;
	let siteSafety: string;
	let siteType: string;
	let image = 'ipfs://bafybeica7pi67452fokrlrmxrooazsxbuluckmcojascc5z4fcazsuhsuy';
	let isAuthenticated = false;
	let isLoading = false;

	const getUrl = async () => {
		const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
		websiteUrl = tab.url?.toLocaleLowerCase();
	};

	const reloadPage = () => {
		location.reload();
	};

	const handleSubmit = async () => {
		isLoading = true;
		const domainAddress = new URL(`${websiteUrl}`).hostname;

		let metaData = {
			name: title ?? '',
			description: description ?? '',
			category: category ?? '',
			image: image ?? '',
			domainAddress: domainAddress ?? '',
			siteUrl: websiteUrl ?? '',
			siteType: siteType ?? '',
			siteTag: siteTag ?? '',
			siteSafety: siteSafety ?? ''
		};

		let CID = await storeMetaData(metaData);
		let metaDataUri = `ipfs://${CID}`.split(',')[0];

		let reviewData = {
			category: category ?? '',
			domainAddress: domainAddress ?? '',
			siteUrl: websiteUrl ?? '',
			siteType: siteType ?? '',
			siteTag: siteTag ?? '',
			siteSafety: siteSafety ?? '',
			metaDataUri,
			voter: $walletAddress
		};
		let [response, error] = await createReview(reviewData);

		isLoading = false;
		showModal = false;
		setTimeout(function () {
			reloadPage();
		}, 3000);
	};

	onMount(async () => {
		[isAuthenticated] = await checkAuth();
		await getUrl();
	});
</script>

# Workflow for the entire project created and written in `react-typescript`:
> This is a webApp for the above chrome extension where user can (read, delete) each and all the reviews submitted by them and also search for any reviews created by anyone based on `siteUrl`.

### When fetching reviews based on user wallet address (My_Reviews Page):
- User Connects to metamask by clicking a button in our UI.
- We get the wallet address when Metamask wallet is connected.
- We use the wallet address to run the `Graphql query to fetch all the review's {metadataURI} created by the user based on their wallet address that we get when user clicks [Connect-to-MetaMask] button on our UI`.
- When we get all the reviews created by the user from graphql, we will iterate through each {metadataURI} and get the review's metaData from NFTStorage API (PUBLIC_NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzNDdmNWVkNEQ5NEEwY0YxNjJlZEIyMWJkODA0NTYwY0NDMTczNjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTA4NTUzMTUwNSwibmFtZSI6Ik5ldFNlcGlvIFJldmlld3MgRGF0YSBVcGxvYWQifQ.3oI57m8CtjLpgy6iD3XmKMTd16JKvSw3E6e_NrU2G6s")
- Now there will be a [review_card] component in our `react-typescript` project where we will display each review's metaData AND there will also be a [review_container] that will display all the [review_card].

### When fetching reviews based on user search {siteURL} (All_Reviews Page):
- User search for a {siteURL} in the search bar.
- We use the {siteURL} provided by the user to get all fetch all the review's {metadataURI} from the graphQL endpoint by using `Graphql query to fetch all the review's {metadataURI} searched by the user when user provides website url in search bar`.
- When we get all the review's from graphql, we will iterate through each {metadataURI} and get the review's metaData from NFTStorage API (PUBLIC_NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzNDdmNWVkNEQ5NEEwY0YxNjJlZEIyMWJkODA0NTYwY0NDMTczNjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTA4NTUzMTUwNSwibmFtZSI6Ik5ldFNlcGlvIFJldmlld3MgRGF0YSBVcGxvYWQifQ.3oI57m8CtjLpgy6iD3XmKMTd16JKvSw3E6e_NrU2G6s")
- Now there will be a [review_card] component in our `react-typescript` project where we will display each review's metaData AND there will also be a [review_container] that will display all the [review_card].

### When fetching all the reviews (All_Reviews Page):
- We fetch all the review's {metadataURI} from the graphQL endpoint by using `Graphql query to fetch all reviews {metadataURI}`.
- When we get all the review's from graphql, we will iterate through each {metadataURI} and get the review's metaData from NFTStorage API (PUBLIC_NFT_STORAGE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDQzNDdmNWVkNEQ5NEEwY0YxNjJlZEIyMWJkODA0NTYwY0NDMTczNjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NTA4NTUzMTUwNSwibmFtZSI6Ik5ldFNlcGlvIFJldmlld3MgRGF0YSBVcGxvYWQifQ.3oI57m8CtjLpgy6iD3XmKMTd16JKvSw3E6e_NrU2G6s")
- Now there will be a [review_card] component in our `react-typescript` project where we will display each review's metaData AND there will also be a [review_container] that will display all the [review_card].

# Desired UI Pages and their components Layout Structure:

**App.tsx Layout Structure:** 
- Navbar at the top shown in every page.
- Navbar have 2 button one to navigate too [My_Reviews Page] and other to navigate to [All_Reviews Page]

**All_Reviews Page Layout Structure:** 
- Search bar in the center above the [review_container].
- Dynamic list of [review_card] inside [review_container] displaying all the reviews or site reviews searched by user when they provide the website url.

**My_Reviews Page Layout Structure:** 
- If user is not connected to metamask wallet:
	- Button to connect to metamask.
- Else:
	- User Information we got after they connected to their metamask wallet (such as wallet ballence, wallet address, network they are connected to).
	- And they should also be able to switch between any network provided by Metamask.
	- Below this there will be the same [review_container] but this time it will only display the list of all the reviews created by the user based on their wallet address.

