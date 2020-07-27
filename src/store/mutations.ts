import {MutationTree} from "vuex";
import {RootState} from "../types";

export enum MUTATIONS {
    SET_STRIPE = 'SET_STRIPE',
    SET_IBAN_ELEMENT = 'SET_IBAN_ELEMENT',
    SET_NAME = 'SET_NAME',
    SET_CLIENT_SECRET = 'SET_CLIENT_SECRET',
    SET_CUSTOMER_EMAIL = 'SET_CUSTOMER_EMAIL',
    SET_PUBLIC_KEY = 'SET_PUBLIC_KEY'
}

export const mutations: MutationTree<RootState> = {
    [MUTATIONS.SET_STRIPE]: (state, payload: any) => {
        state.stripe = payload;
    },
    [MUTATIONS.SET_IBAN_ELEMENT]: (state, payload: any) => {
        state.iban = payload;
    },
    [MUTATIONS.SET_NAME]: (state, payload: string) => {
        state.name = payload;
    },
    [MUTATIONS.SET_CLIENT_SECRET]: (state, payload: string) => {
        state.clientSecret = payload;
    },
    [MUTATIONS.SET_CUSTOMER_EMAIL]: (state, payload: string) => {
        state.customerEmail = payload;
    },
    [MUTATIONS.SET_PUBLIC_KEY]: (state, payload: string) => {
        state.publicKey = payload;
    },
};
