import {LocaleMessages} from 'vue-i18n';

export const messages: LocaleMessages = {
  'en-US': {
    'name.label' : 'Name',
    'name.placeholder' : 'Insert your full name',
    'label.email' : 'Email address',
    'label.placeholder' : 'Insert your email address',
    'label.disclaimer': 'By providing your IBAN and confirming this payment, you authorise {society} and Stripe, our payment service provider, to send instructions to your bank to debit your account and (B) your bank to debit your account in accordance with those instructions. You are entitled to a refund from your bank under the terms and conditions of your agreement with your bank. A refund must be claimed within eight weeks starting from the date on which your account was debited.',
    'label.submit': 'Set up SEPA Direct Debit'
  },
  'it-IT': {
    'name.label' : 'Nome',
    'name.placeholder' : 'Inserisci il tuo nome completo',
    'label.email' : 'Indirizzo email',
    'label.placeholder' : 'Inserisci il tuo indirizzo email',
    'label.disclaimer': 'Fornendo il tuo IBAN e confermando questo pagamento, autorizzi {society} e Stripe, il nostro fornitore di servizi di pagamento, a inviare istruzioni alla tua banca per addebitare il tuo conto e (B) la tua banca per addebitare il tuo conto in conformità con tali istruzioni. Hai diritto a un rimborso dalla tua banca secondo i termini e le condizioni del tuo accordo con la tua banca. Il rimborso deve essere richiesto entro otto settimane a partire dalla data in cui è stato addebitato il tuo account.',
    'label.submit': 'Imposta l\'addebito diretto SEPA'
  },
};
