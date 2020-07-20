/**
 * Create a Stripe element.
 * @param stripeKey Stripe Private Key.
 * @param element Type of Stripe Element to create.
 * @param selector The anchor in DOM.
 * @param cbOnChange Callback on change.
 * @param cbError Callback on error.
 */
import {StripeElement} from "./model/StripeElement.model";

export default async function initStripeComponent(
    stripeKey: string | undefined,
    element: StripeElement,
    selector: string,
    cbOnChange: (ev: any) => void,
    cbError: (ev: any) => void
): Promise<{
    stripeInstance: any
    stripeEl: any
} | void> {
    if (!stripeKey) {
        console.error('Stripe Key is missing')
        return void 0
    }

    try {
        const stripeInstance = (window as any).Stripe(stripeKey)
        let ELEMENT_CONFIG;
        const stripeEl = stripeInstance
            .elements()
            .create(element, { ...COMPONENT_OPTIONS, ...ELEMENT_CONFIG[element] })
        stripeEl.mount(selector)
        stripeEl.on('change', cbOnChange)

        return { stripeInstance, stripeEl }
    } catch (err) {
        cbError(err)
        return void 0
    }
}
