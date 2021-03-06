<template>
  <div class="container">
            <div class="rowLeft">
              <div class="backWrapper" v-on:click="cancel">
                <i class="arrow left"></i>
                <span>Aranha bjj</span>
              </div>

            </div>
    <form v-on:submit.prevent="submitForm" id="payment-form">
      <div class="row">
        <div class="col-25">
          <label for="email">{{ $t('label.email') }}</label>
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
          <label for="name">{{ $t('name.label') }}</label>
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
          {{ $t('label.disclaimer', {society: '(A) Aranha bjj'}) }}
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
  @Action(ACTIONS.CANCEL) cancelOperation: () => Promise<unknown>

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
        this.confirmSepa().then( (response: any) => {
          console.debug("confirming sepa response", response);
        }).catch( error => {
          console.debug("error confirming sepa", error);
        })
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
    const ibanElement = document.getElementById('iban-element');

    const displayError = document.getElementById('error-message');
    if(e.error) {
      displayError.textContent = e.error.message;
      ibanElement.setAttribute('class', 'error')
    } else {
      displayError.textContent = '';
      ibanElement.removeAttribute('class')
    }
  }

  public cancel(e) {
    e.stopPropagation();
    console.debug("operation canceled");
    this.cancelOperation();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  font-style: normal;
  font-weight: 300;
}

#iban-element {
  width: 100%;
  padding: 12px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
    outline: none;
    z-index: 9;
  }
}

.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}

.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}

.error {
  border: 1px solid #fa755a !important;
}

input[type="text"], input[type="email"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  transition: box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
    outline: none;
    z-index: 9;
  }
}

label {
  //padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type="submit"] {
  align-content: center;
  background: linear-gradient(180deg, rgba(211, 47, 47, 0.88) 22.4%, rgba(255, 68, 51, 0.79) 100%);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  float: right;

  &:hover {
    //background-color: #2d4ed1;
  }
}

.input-disabled {
  background: gray;
  cursor: default;
}

.container {
  border-radius: 6px;
  background-color: #f2f2f2;
  box-shadow: 0 1px 3px 0 #cfd7df;
  padding: 20px;
}

.col-25 {
  float: left;
  text-align: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

.row {
  display: flex;
  padding-bottom: 12px;
  align-items: center;
  min-height: 32px;
  justify-content: center;

  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.rowLeft {
  display: flex;
  min-height: 32px;
  justify-content: flex-start;

}
.backWrapper {
  cursor: pointer;
  padding-bottom: 12px;
  i {
    margin-right: 8px;
  }
}

.label {
  padding-top: 8px;
  text-align: justify;
}

#error {
  padding: 8px 0;
  color: #eb1c26;
}

@media screen and (max-width: 600px) {
  .col-25 {
    //width: 100%;
    margin-top: 0;
  }
  .col-75 {
    //width: 100%;
    margin-top: 0;
  }
  input[type="submit"] {
    width: 100%;
    margin-top: 0;
  }
  #error {
    width: 100%;
    padding: 4px 0;
    color: #D32F2F;
    font-size: 10px;
  }
  #error-label {
    display: none;
  }
}
</style>
