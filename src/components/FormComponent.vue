<template>
    <div class="container">
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
                <div id="error-message"></div>
            </div>
            <div class="row">
                <div class="label">
                    {{$t('label.disclaimer', {society: '(A) Aranha bjj'})}}
                </div>
            </div>
            <div class="row">
                <input type="submit" value="Submit"/>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {ELEMENT_CONFIG, StripeElement} from "../stripe/model/StripeElement.model";
    import {from} from "rxjs";

    import {loadStripe} from "@stripe/stripe-js";
    import {COMPONENT_OPTIONS} from "../stripe/model/stripe.model";
    import {error} from "vue-i18n/src/util";

    @Component({})
    export default class FormComponent extends Vue {
        @Prop() private msg!: string;

        private name = "";
        private stripe;
        private ibanElement; //DE89 3704 0044 0532 0130 00
        private publicKey;
        private clientSecret;
        private customerEmail;

        constructor() {
            super();
            const urlParams = new URLSearchParams(window.location.search);
            this.publicKey = urlParams.get('pk') !== null ? urlParams.get('pk') : 'pk_test_TYooMQauvdEDq54NiTphI7jx';
            this.clientSecret = urlParams.get('cs');
            this.customerEmail = urlParams.get('customerEmail');
        }

        mounted() {
            this.init().then(response => {
                this.stripe = response;
                this.ibanElement = this.stripe.elements()
                    .create(StripeElement.IBAN, {
                        ...COMPONENT_OPTIONS, ...ELEMENT_CONFIG[StripeElement.IBAN]
                    });

                this.ibanElement.mount('#iban-element');
                this.ibanElement.on('change', (e) => this.displayIbanError(e));

                const form = document.getElementById('payment-form');
                form.addEventListener('submit', () => this.confirmSepa(this.stripe, this.ibanElement));

            }).catch(error => {
                console.error("Error initializing stripe!", error);
            });
        }

        async init() {
            return await new Promise((resolve, reject) => {
                resolve(loadStripe(this.publicKey));
            });
        }

        public submitForm(e: Event) {
            e.stopPropagation();
        }

        public displayIbanError(e) {
            const displayError = document.getElementById('error-message');
            if (e.error) {
                displayError.textContent = e.error.message;
            } else {
                displayError.textContent = '';
            }
        }

        public createSource(stripe, ibanElement) {

            const sourceData = {
                type: 'sepa_debit',
                currency: 'eur',
                owner: {
                    name: this.name,
                    email: 'TEST',
                },
                mandate: {
                    // Automatically send a mandate notification email to your customer
                    // once the source is charged.
                    'notification_method': 'email',
                },
            };

            stripe.createSource(ibanElement, sourceData).then(function (result) {
                if (result.error) {
                    // Inform the customer that there was an error.
                    const errorElement = document.getElementById('error-message');
                    errorElement.textContent = result.error.message;
                } else {
                    // Send the Source to your server.

                    console.log("SUCCESS =========>", result.source);
                }
            });
        }

        public confirmSepa(stripe, ibanElement) {
            stripe.confirmSepaDebitSetup(
                this.clientSecret,
                {
                    "payment_method": {
                        "sepa_debit": ibanElement,
                        "billing_details": {
                            name: this.name,
                            email: this.customerEmail,
                        },
                    },
                }
            ).then(response => {
                console.log("SUCCESS:", response);
            }).catch((reason => {
                console.error("FAIL:", reason)
            }));
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
        background-color: #4caf50;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        float: right;

        &:hover {
            background-color: #45a049;
        }
    }

    .container {
        border-radius: 5px;
        background-color: #f2f2f2;
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
    }
</style>
