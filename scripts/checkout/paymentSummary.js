import {cart,calculateCartQuantity} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
// remove {} coz this is exported as default
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  //shippingCosts -> shippingPriceCents
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productItem = getProduct(cartItem.productId);
    productPriceCents += productItem.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  // calculate 10% on this number
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  // 10% = multiply by 10 / 100
  // thats what per / cent 100 means
  // 10/100 = 0.1 we can also multiply by 0.1
  const taxCents = totalBeforeTaxCents * 0.1;
  // its important to include Cents in name coz these are cents
  const totalCents = totalBeforeTaxCents + taxCents;

  let PaymentSummaryHTML = `
    <div class="payment-summary-row">
    <div>Items (${calculateCartQuantity()}):</div>
      <div class="payment-summary-money">
        $${formatCurrency(productPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatCurrency(shippingPriceCents)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatCurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatCurrency(totalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = PaymentSummaryHTML;
}
 /**
   * steps:
   * 1. loop through the cart
   * 2. for each product, price * quantity
   * 3. add everything together
   */

/** this function is not necessary
function calculations(expression) {
  // addEverythingTogether -> productPriceCents(better var name)
  let productPriceCents = 0;
  //shippingCosts -> shippingPriceCents
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const productItem = getProduct(cartItem.productId);
    const quantity = cartItem.quantity;
    productPriceCents += productItem.priceCents * quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  // calculate 10% on this number
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  // 10% = multiply by 10 / 100
  // thats what per / cent 100 means
  // 10/100 = 0.1 we can also multiply by 0.1
  const taxCents = totalBeforeTaxCents * 0.1;
  // its important to include Cents in name coz these are cents
  const totalCents = totalBeforeTaxCents + taxCents;
  if(expression === 'Items') {
    return productPriceCents;
  } else if(expression === 'Shipping') {
    return shippingPriceCents;
  } else if(expression === 'TotalBeforeTax') {
    return totalBeforeTaxCents;
  } else if(expression === 'EstimatedTax') {
    return taxCents;
  } else if(expression === 'OrderTotal') {
    return totalCents;
  }
}
*/