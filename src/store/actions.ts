import { ActionTree } from 'vuex';
import axios from 'axios';
import { RootState } from '../types';
import {loadStripe} from "@stripe/stripe-js";
import {MUTATIONS} from "./mutations";

export enum ACTIONS {
    INIT = 'INIT',
    CONFIRM_SEPA = 'confirmSepa',
    SUCCESS = 'success',
    ERROR = 'error',
    CANCEL = 'cancel'
}

export const actions: ActionTree<RootState, RootState> = {
    [ACTIONS.CONFIRM_SEPA]: ({ commit, state }) => {
        state.stripe.confirmSepaDebitSetup(
            state.clientSecret,
            {
                "payment_method": {
                    "sepa_debit": state.iban,
                    "billing_details": {
                        name: state.name,
                        email: state.customerEmail,
                    },
                },
            }
        ).then(response => {
            console.debug("confirm sepa debit setup response:", response);
            if(response.setupIntent) {
                console.debug("sepa debit success:", response.setupIntent);
                return axios.get('arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Fpayment%2Fsuccess')
            }
            if(response.error) {
                console.debug("sepa debit thrown error:", response.error);
                return axios.get('arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Ferror')
            }
        }).catch((reason => {
            console.debug("confirm sepa debit setup rejected, reason:", reason);
        }));
    },
    [ACTIONS.SUCCESS]: ({ commit }) => {
        axios.get('arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Fpayment%2Fsuccess')
            .then( (response: any) => {
                return response;
            })
    },
    [ACTIONS.ERROR]: ({ commit }) => {
        axios.get('arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Ferror')
            .then( (response: any) => {
                console.debug('SUCCESS', response);
            })
    },
    [ACTIONS.CANCEL]: ({ commit }) => {
        return axios.get('arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Faccount');
    }
};
