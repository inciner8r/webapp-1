import store from '../store';
import { deleteWalletData } from '../actions/walletActions';

export function checkWalletAuth(): boolean {
  const check = store.getState().wallet.walletData !== null;
  return check;
}

export function deleteWalletDataFromStore(): void {
  store.dispatch(deleteWalletData());
}