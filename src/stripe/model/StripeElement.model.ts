
export enum StripeElement {
    IBAN = 'iban',
    CARD_NUMBER = 'cardNumber',
    CARD_EXPIRY = 'cardExpiry',
    CARD_CVC = 'cardCvc'
}

export const ELEMENT_CONFIG = {
    [StripeElement.IBAN]: {
        supportedCountries: ['SEPA'],
        placeholderCountry: 'IT',
        hideIcon: true
    }
}
