import store from '../store';
import { deleteWalletData } from '../actions/walletActions';

export function checkWalletAuth(): boolean {
  console.log("Checking if wallet is authenticated...");
  const check = store.getState().wallet.walletData !== null;
  //const jwtCheck = store.getState().wallet.jwtToken !== null;
  console.log("Wallet authentication: ", check);
  return check;
}

export function deleteWalletDataFromStore(): void {
  // Delete the Wallet Data from the Redux store
  store.dispatch(deleteWalletData());
  console.log("Wallet Data deleted from redux store.");
}