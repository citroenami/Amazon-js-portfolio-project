import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
// remove {} coz this is exported as default
import formatCurrency from '../utils/money.js';

export function renderPaymentSummary() {

  let summaryHTML = `
    <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">$42.75${calculations('Items')}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$4.99</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$47.74</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$4.77</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$52.51</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = summaryHTML;
}
 /**
   * steps:
   * 1. loop through the cart
   * 2. for each product, price * quantity
   * 3. add everything together
   */
function calculations(expression) {
  // addEverythingTogether -> productPriceCents(better var name)
  let productPriceCents = 0;
  cart.forEach((cartItem) => {
    const productItem = getProduct(cartItem.productId);
    const quantity = cartItem.quantity;
    productPriceCents += productItem.priceCents * quantity;
  });
  if(expression === 'Items') {
    return productPriceCents;
  } 

}