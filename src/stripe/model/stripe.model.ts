export const COMPONENT_STYLE = {
    base: {
        fontSize: '13px',
        fontSmoothing: 'antialiased',
        fontWeight: '400',
        fontFamily: 'Arial'
    },
    complete: {}
}

export const COMPONENT_OPTIONS = {
    style: COMPONENT_STYLE,
    classes: {
        base: 'form-stripe-element',
        focus: 'form-stripe-element--focus',
        disabled: 'form-stripe-element--disabled',
        complete: 'form-stripe-element--is-success',
        invalid: 'form-stripe-element--is-error',
        empty: 'form-stripe-element'
    }
}
