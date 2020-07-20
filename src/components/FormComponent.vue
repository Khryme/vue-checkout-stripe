<template>
  <div class="container">
    <form v-on:submit.prevent="submitForm">
      <div class="row">
        <div class="col-25">
          <label for="fname">First Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            id="fname"
            name="firstname"
            placeholder="Your name.."
            v-model="name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="lname">Last Name</label>
        </div>
        <div class="col-75">
          <input
            type="text"
            id="lname"
            name="lastname"
            placeholder="Your last name.."
          />
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="email">Email</label>
        </div>
        <div class="col-75">
          <input
            type="email"
            id="email"
            name="email"
            placeholder="test@test.com"
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
        <div class="label">
          By providing your IBAN and confirming this payment, you authorise (A)
          Aranha bjj and Stripe, our payment service provider, to send
          instructions to your bank to debit your account and (B) your bank to
          debit your account in accordance with those instructions. You are
          entitled to a refund from your bank under the terms and conditions of
          your agreement with your bank. A refund must be claimed within eight
          weeks starting from the date on which your account was debited.
        </div>
      </div>
      <div class="row">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import initStripeComponent from "../stripe/stripe";
import {StripeElement} from "../stripe/model/StripeElement.model";
import {from} from "rxjs";

import { loadStripe } from "@stripe/stripe-js";

@Component({})
export default class FormComponent extends Vue {
  @Prop() private msg!: string;

  private name = "";
  private stripeKey = "pk_test_TYooMQauvdEDq54NiTphI7jx";
  private stripe;

  constructor() {
    super();
    this.init().then(response => {
      this.stripe = response;
      const options = {
        supportedCountries: ['SEPA'],
        // Elements can use a placeholder as an example IBAN that reflects
        // the IBAN format of your customer's country. If you know your
        // customer's country, we recommend that you pass it to the Element as the
        // placeholderCountry.
        placeholderCountry: 'ES',
      };

      // Create an instance of the IBAN Element
      const iban = this.stripe.elements().create('iban', options);
      iban.mount('#iban-element');
    });
  }

  async init() {
    return await new Promise((resolve, reject) => {
      resolve(loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'));
    });
  }

  async initializeStripe() {
    const promise = new Promise((resolve, reject) => {
      resolve(loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx'));
    }).then((resp) => {
      this.stripe = resp;
    });
    await promise;
    promise.then(response => {
      this.stripe = response;
    });
    const options = {
      supportedCountries: ['SEPA'],
      // Elements can use a placeholder as an example IBAN that reflects
      // the IBAN format of your customer's country. If you know your
      // customer's country, we recommend that you pass it to the Element as the
      // placeholderCountry.
      placeholderCountry: 'ES',
    };

    // Create an instance of the IBAN Element
    const iban = this.stripe.elements().create('iban', options);
    iban.mount('#iban-element');
  }
  
  async initIBANComponent(): Promise<void> {
    const init = await initStripeComponent(
            this.stripeKey,
            StripeElement.IBAN,
            '#stripe-iban-element',
            ({ complete, error }: any) => {
              // this.ibanError = error?.message ?? null
              // this.ibanIsCompleted = complete
            },
            (err) => console.warn("e", err)
    )
    // if (init) {
    //   this.stripeInstance = init.stripeInstance
    //   this.ibanEl = init.stripeEl
    // }
  }

  public submitForm(e: Event) {
    e.stopPropagation();

    const options = {
      supportedCountries: ['SEPA'],
      // Elements can use a placeholder as an example IBAN that reflects
      // the IBAN format of your customer's country. If you know your
      // customer's country, we recommend that you pass it to the Element as the
      // placeholderCountry.
      placeholderCountry: 'ES',
    };

    // Create an instance of the IBAN Element
    const iban = this.stripe.elements().create('iban', options);

    // Add an instance of the IBAN Element into the `iban-element` <div>
    iban.mount('#iban-element');
    console.log("Submitted!", this.name);
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
input[type="text"],input[type="email"] {
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
