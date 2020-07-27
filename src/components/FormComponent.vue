<template>
    <div class="container">
        <!--        <div class="row">-->
        <!--            <div class="col-25">-->
        <!--                Back-->
        <!--            </div>-->
        <!--        </div>-->
        <form v-on:submit.prevent="submitForm" id="payment-form">
            <div class="row">
                <div class="col-25">
                    <label for="name">{{$t('name.label')}}</label>
                </div>
                <div class="col-75">
                    <input
                            type="text"
                            id="name"
                            name="nName"
                            :placeholder="$t('name.placeholder')"
                            required
                            v-model="name"
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="email">{{$t('label.email')}}</label>
                </div>
                <div class="col-75">
                    <input
                            type="email"
                            id="email"
                            name="email"
                            :placeholder="$t('label.placeholder')"
                            v-model="customerEmail"
                            disabled
                    />
                </div>
            </div>
            <div class="row">
                <div class="col-25">
                    <label for="iban">Iban</label>
                </div>
                <div class="col-75" id="iban">
                    <div id="iban-element"></div>
                </div>
            </div>
            <div class="row">
                <div class="col-25" id="error-label">
                    <label for="error"></label>
                </div>
                <div class="col-75" id="error">
                    <div id="error-message"></div>
                </div>
            </div>
            <div class="row">
                <div class="label">
                    {{$t('label.disclaimer', {society: '(A) Aranha bjj'})}}
                </div>
            </div>
            <div class="row">
                <input type="submit" :value="$t('label.submit')"/>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ELEMENT_CONFIG, StripeElement} from "../stripe/model/StripeElement.model";
    import {loadStripe} from "@stripe/stripe-js";
    import {COMPONENT_OPTIONS} from "../stripe/model/stripe.model";
    import {State, Action, Getter, Mutation} from 'vuex-class';
    import {MUTATIONS} from '../store/mutations';
    import {GETTERS} from "../store/getters";
    import {ACTIONS} from "../store/actions";

    @Component({})
    export default class FormComponent extends Vue {
        @Prop() private msg!: string;

        // private ibanElement; //DE89 3704 0044 0532 0130 00
        @Mutation(MUTATIONS.SET_STRIPE) setStripe: (stripe: any) => void;
        @Mutation(MUTATIONS.SET_IBAN_ELEMENT) setIbanElement: (element: any) => void;
        @Mutation(MUTATIONS.SET_CLIENT_SECRET) setClientSecret: (clientSecret: string) => void;
        @Mutation(MUTATIONS.SET_PUBLIC_KEY) setPublicKey: (publicKey: string) => void;
        @Mutation(MUTATIONS.SET_NAME) setName: (name: string) => void;
        @Mutation(MUTATIONS.SET_CUSTOMER_EMAIL) setCustomerEmail: (customerEmail: string) => void;
        @Getter(GETTERS.GET_STRIPE) stripe: any;
        @Getter(GETTERS.GET_IBAN_ELEMENT) ibanElement: any;
        @Getter(GETTERS.GET_CUSTOMER_EMAIL) customerEmail: string;
        @Getter(GETTERS.GET_PUBLIC_KEY) publicKey: string;
        @Getter(GETTERS.GET_NAME) getName: string;
        @Getter(GETTERS.GET_CLIENT_SECRET) clientSecret: string;
        @Action(ACTIONS.CONFIRM_SEPA) confirmSepa: () => Promise<unknown>;

        constructor() {
            super();
            const urlParams = new URLSearchParams(window.location.search);
            this.setPublicKey(urlParams.get('pk') !== null ? urlParams.get('pk') : 'pk_test_TYooMQauvdEDq54NiTphI7jx')
            this.setClientSecret(urlParams.get('cs'));
            this.setCustomerEmail(urlParams.get('customerEmail'));
        }

        mounted() {
            this.init().then(response => {
                this.setStripe(response);
                this.setIbanElement(this.stripe.elements()
                    .create(StripeElement.IBAN, {
                        ...COMPONENT_OPTIONS, ...ELEMENT_CONFIG[StripeElement.IBAN]
                    }));

                this.ibanElement.mount('#iban-element');
                this.ibanElement.on('change', (e) => this.displayIbanError(e));

                const form = document.getElementById('payment-form');
                form.addEventListener('submit', () => {
                    debugger
                    this.confirmSepa()
                });

            }).catch(error => {
                console.error("Error initializing stripe!", error);
            });
        }

        async init() {
            return await new Promise((resolve, reject) => {
                resolve(loadStripe(this.publicKey));
            });
        }

        get name() {
            return this.getName;
        }

        set name(value) {
            this.setName(value);
        }

        public submitForm(e: Event) {
            e.stopPropagation();
        }

        public displayIbanError(e) {
            const displayError = document.getElementById('error-message');
            displayError.textContent = e.error ? e.error.message : '';
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    /* Clear floats after the columns */
    /* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
    * {
        box-sizing: border-box;
    }

    #iban-element {
        width: 100%;
        padding: 12px;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    input[type="text"], input[type="email"] {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    select {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: vertical;
    }

    label {
        padding: 12px 12px 12px 0;
        display: inline-block;
    }

    input[type="submit"] {
        background-color: #2d4ed7;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;

        &:hover {
            background-color: #2d4ed1;
        }
    }

    .container {
        border-radius: 5px;
        /*background-color: #f2f2f2;*/
        padding: 20px;
    }

    .col-25 {
        float: left;
        width: 25%;
        margin-top: 6px;
    }

    .col-75 {
        float: left;
        width: 75%;
        margin-top: 6px;
    }

    .row {
        &:after {
            content: "";
            display: table;
            clear: both;
        }
    }

    .label {
        padding-top: 8px;
    }

    #error {
        padding: 8px 0;
        color: #eb1c26;
    }

    @media screen and (max-width: 600px) {
        .col-25 {
            width: 100%;
            margin-top: 0;
        }
        .col-75 {
            width: 100%;
            margin-top: 0;
        }
        input[type="submit"] {
            width: 100%;
            margin-top: 0;
        }
        #error {
            padding: 4px 0;
        }
        #error-label {
            display: none;
        }
    }
</style>
