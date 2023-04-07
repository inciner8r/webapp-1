import store from '../store';
import { deleteJwtToken } from '../actions/walletActions';
  
export function getJwtTokenFromStore(): string | null {
    const jwtToken: string | null = store.getState().wallet.jwtToken;
    return jwtToken;
}

export function checkJwtToken(): boolean {
    const check = store.getState().wallet.jwtToken !== null;
    return check;
}

export function deleteJwtTokenFromStore(): void {
    store.dispatch(deleteJwtToken());
}