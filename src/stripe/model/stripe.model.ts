export const COMPONENT_STYLE = {
    base: {
        fontSize: "13px",
        fontSmoothing: "antialiased",
        fontWeight: "400",
        fontFamily: "Arial"
    },
    invalid: {
        color: "#D32F2F",
        iconColor: "#fa755a",
        ":-webkit-autofill": {
            color: "#D32F2F"
        }
    },
    complete: {}
};

export const COMPONENT_OPTIONS = {
    style: COMPONENT_STYLE,
    classes: {
        base: "form-stripe-element",
        focus: "form-stripe-element--focus",
        disabled: "form-stripe-element--disabled",
        complete: "form-stripe-element--is-success",
        invalid: "form-stripe-element--is-error",
        empty: "form-stripe-element"
    }
};
