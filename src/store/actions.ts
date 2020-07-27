import { ActionTree } from 'vuex';
import axios from 'axios';
import { RootState } from '../types';
import {loadStripe} from "@stripe/stripe-js";
import {MUTATIONS} from "./mutations";

export enum ACTIONS {
    INIT = 'INIT',
    CONFIRM_SEPA = 'confirmSepa',
    SUCCESS = 'success'
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
            // axios.get('https://arya.page.link/?apn=com.arya.checkin&ibi=com.arya.checkin&link=https%3A%2F%2Fexample.com%2Fpayment%2Fsuccess')
            // .then( response => {
            //     console.log('SUCCESS', response);
            // })
            // .catch( reason => {
            //     console.error('FAIL', reason);
            // })
            if(response.setupIntent) {
                console.log("SUCCESS", response);
            }
            if(response.error) {
                console.log("ERROR", response);
            }
        }).catch((reason => {
            console.error("FAIL:", reason)
        }));
    },
    [ACTIONS.SUCCESS]: ({ commit }, {stripe, iban}) => {
        // axios({
        //     url: 'https://....'
        // }).then((response) => {
        //     const payload: User = response && response.data;
        //     commit('profileLoaded', payload);
        // }, (error) => {
        //     console.log(error);
        //     commit('profileError');
        // });
    }
};
