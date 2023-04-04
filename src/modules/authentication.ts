import store from '../store';

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
        console.log('eula:', eula)
        console.log('flowId:', flowId)
        const message = `${eula}${flowId}`;
        console.log('message:', message)
        const walletData = store.getState().wallet.walletData;
        if (!walletData) {
        console.error('User not connected to MetaMask');
        return false;
        }

        const signer = walletData.signer;
        console.log('signer:', signer)
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
  