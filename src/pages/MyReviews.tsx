import { checkWalletAuth } from '../modules/connect_to_metamask';
import { checkJwtToken } from '../modules/authentication';
import { useAccount, useSigner } from 'wagmi';
import { setJwtToken, setWalletData } from '../actions/walletActions';
import store from '../store';
import Loader from '../Components/Loader';
import WalletNotFound from '../Components/MyReviews/walletNotFound';
import Main from '../Components/MyReviews/main';

export interface FlowIdResponse {
  eula: string;
  flowId: string;
}

export interface WalletData {
  walletAddress: string | undefined;
}

const MyReviews = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const { data: signer } = useSigner()
  console.log('address', address)
  console.log('signer', signer)

  console.log('isConnecting', isConnecting)
  if (isConnecting) return <div><Loader/></div>

  console.log('isDisconnected', isDisconnected)
  if (isDisconnected) return <div><WalletNotFound/></div>

  const walletData = address;
  store.dispatch(setWalletData(walletData));

  if (checkWalletAuth() && !checkJwtToken()) {
    console.log('Wallet Connected and JWT token not found.')
    // Function to generate {eula} and {flowID} using {walletAddress} from the gateway api.
    const askFlowId = async (address:string | undefined): Promise<FlowIdResponse> => {
      const walletData = address
      if (!walletData) {
          console.error('User not connected to MetaMask');
          throw new Error('User not connected to MetaMask');
      }
      const walletAddress = walletData;
      //const gateway = process.env.REACT_APP_DEV_GATEWAY_URL;
      const gateway = process.env.REACT_APP_GATEWAY_URL;
      const response = await fetch(`${gateway}/flowid?walletAddress=${walletAddress}`);
      const json = await response.json();
      if (response.status !== 200) {
          throw new Error(json.message);
      }
      const data = {
          eula: json.payload.eula,
          flowId: json.payload.flowId,
      };
      return data;
    };

    // Function to get {tokenID} from the gateway api.
    const sendSignature = async (address:string | undefined) => {
        try {
            const { eula, flowId } = await askFlowId(address);
            const message = `${eula}${flowId}`;
            console.log('message:', message)

            const walletData = address;
            
            if (!walletData) {
            console.error('User not connected to MetaMask');
            return false;
            }

            const Signer = signer;
            console.log("Signer from authentication:", Signer);
        
            // Check if Signer is not null or undefined
            if (!Signer) {
              console.error("Signer is null or undefined");
              return false;
            }
        
            const signature = await Signer.signMessage(message);
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

    // Driver function to get and store jwtToken in redux store.
    const get_and_store_jwtToken = async (): Promise<boolean> => {
        try {
            console.log('Getting JWT token...')
            const jwtTokenResponse = await sendSignature(address);
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

    console.log(get_and_store_jwtToken())

  }

  if (!checkWalletAuth() && !checkJwtToken()) {
    console.log("Wallet and JWT token not found.")
    return (
      <div>
        <WalletNotFound />
      </div>
    )
  }  

  return (
    <div>
      <Main />
    </div>
  )
}

export default MyReviews
