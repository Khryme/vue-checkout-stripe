export interface RootState {
    stripe: any,
    iban: any,
    name: string,
    publicKey: string,
    clientSecret: string,
    customerEmail: string
}


export const initialState: () => RootState = () => ({
    stripe: null,
    iban: null,
    name: null,
    publicKey: null,
    clientSecret: null,
    customerEmail: null
});
