
export enum StripeElement {
    IBAN = 'iban',
    CARD_NUMBER = 'cardNumber',
    CARD_EXPIRY = 'cardExpiry',
    CARD_CVC = 'cardCvc'
}

const ELEMENT_CONFIG = {
    [StripeElement.IBAN]: {
        supportedCountries: ['SEPA'],
        placeholderCountry: 'FR',
        hideIcon: true
    },
    [StripeElement.CARD_NUMBER]: {
        placeholder: '1234 5678 9101 1121',
        showIcon: true,
        iconStyle: 'default'
    },
    [StripeElement.CARD_EXPIRY]: {
        placeholder: 'MM/YY'
    },
    [StripeElement.CARD_CVC]: {
        placeholder: 'CVC'
    }
}
