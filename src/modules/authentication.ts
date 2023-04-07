import store from '../store';
import { setJwtToken, deleteJwtToken } from '../actions/walletActions';

export interface FlowIdResponse {
    eula: string;
    flowId: string;
}

// Function to generate {eula} and {flowID} using {walletAddress} from the gateway api.
export const askFlowId = async (): Promise<FlowIdResponse> => {
    const walletData = store.getState().wallet.walletData;
    if (!walletData) {
        console.error('User not connected to MetaMask');
        throw new Error('User not connected to MetaMask');
    }
    const walletAddress = walletData.walletAddress;
    const gateway = process.env.REACT_APP_DEV_GATEWAY_URL;
    const response = await fetch(`${gateway}/flowid?walletAddress=${walletAddress}`);
    const json = await response.json();
    if (response.status !== 200) {
        throw new Error(json.message);
    }
    return {
        eula: json.payload.eula,
        flowId: json.payload.flowId,
    };
};

// Function to get {resonse} from the gateway api.
export const sendSignature = async () => {
    try {
        const { eula, flowId } = await askFlowId();
        const message = `${eula}${flowId}`;
        console.log('message:', message)

        const walletData = store.getState().wallet.walletData;
        
        if (!walletData) {
        console.error('User not connected to MetaMask');
        return false;
        }

        const signer = walletData.signer;
        console.log('Signer from authentication:', signer)

        const signature = await signer.signMessage(message);
        console.log('signature:', signature)
        const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            flowId,
            signature,
        }),
        };
        const gateway = process.env.REACT_APP_DEV_GATEWAY_URL;
        const response = await fetch(`${gateway}/authenticate`, requestOptions);
        console.log('response:', response)
        const tokenID_json = await response.json()
        console.log('tokenID_json:', tokenID_json)
        return tokenID_json;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
};

export async function get_and_store_jwtToken(): Promise<boolean> {
    try {
        console.log('Getting JWT token...')
        const jwtTokenResponse = await sendSignature();
        console.log('JWT token response:', jwtTokenResponse);

        const token = jwtTokenResponse.payload.token;

        store.dispatch(setJwtToken(token));
        console.log("JWT token stored in redux store.");

        return token;
    } catch (error) {
        console.error(error);
        return false;
    }
}
  
export function getJwtTokenFromStore(): string | null {
    const jwtToken: string | null = store.getState().wallet.jwtToken;
    return jwtToken;
}

export function checkJwtToken(): boolean {
    console.log("Checking if JWT token is stored...");
    const check = store.getState().wallet.jwtToken !== null;
    console.log("JWT token stored: ", check);
    return check;
}

export function deleteJwtTokenFromStore(): void {
    store.dispatch(deleteJwtToken());
    console.log("JWT token deleted from redux store.");
}