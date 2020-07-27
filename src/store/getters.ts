import {GetterTree} from 'vuex';
import axios from 'axios';
import { RootState } from '../types';

export enum GETTERS {
    GET_STRIPE = 'getStripe',
    GET_IBAN_ELEMENT = 'getIbanElement',
    GET_CUSTOMER_EMAIL = 'getCustomerEmail',
    GET_PUBLIC_KEY = 'getPublicKey',
    GET_NAME = 'getName',
    GET_CLIENT_SECRET = 'getClientSecret',
}

export const getters: GetterTree<RootState, RootState> = {
    [GETTERS.GET_STRIPE]: (state => {
        return state.stripe;
    }),
    [GETTERS.GET_IBAN_ELEMENT]: (state => {
        return state.iban;
    }),
    [GETTERS.GET_CUSTOMER_EMAIL]: (state => {
        return state.customerEmail;
    }),
    [GETTERS.GET_PUBLIC_KEY]: (state => {
        return state.publicKey;
    }),
    [GETTERS.GET_NAME]: (state => {
        return state.name;
    }),
    [GETTERS.GET_CLIENT_SECRET]: (state => {
        return state.clientSecret;
    })
};
