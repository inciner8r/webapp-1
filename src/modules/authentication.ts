import store from '../store';
import { deleteJwtToken } from '../actions/walletActions';
  
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