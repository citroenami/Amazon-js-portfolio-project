import {calculateCartQuantity} from '../data/cart.js';
/**
 * href="checkout.html" 
 * import {...} from './';
 * both JavaScript imports and HTML resource references 
 * are handled by the browser, but they may use slightly 
 * different rules for path resolution. 
 * The "./" in JavaScript imports is specific to 
 * the ECMAScript module system and is not a general 
 * requirement for all types of resource references in HTML.
 */
export function renderAmazonHeader () {
  let headerHTML = '';

  headerHTML = `
      <div class="amazon-header-left-section">
        <a href="amazon.html" class="header-link">
          <img class="amazon-logo"
            src="images/amazon-logo-white.png">
          <img class="amazon-mobile-logo"
            src="images/amazon-mobile-logo-white.png">
        </a>
      </div>

      <div class="amazon-header-middle-section">
        <input class="search-bar" type="text" placeholder="Search">

        <button class="search-button">
          <img class="search-icon" src="images/icons/search-icon.png">
        </button>
      </div>

      <div class="amazon-header-right-section">
        <a class="orders-link header-link" href="orders.html">
          <span class="returns-text">Returns</span>
          <span class="orders-text">& Orders</span>
        </a>

        <a class="cart-link header-link" href="checkout.html">
          <img class="cart-icon" src="images/icons/cart-icon.png">
          <div class="cart-quantity js-cart-quantity"></div>
          <div class="cart-text">Cart</div>
        </a>
      </div>
  `;
  document.querySelector('.js-amazon-header')
    .innerHTML = headerHTML;

  document.querySelector('.js-cart-quantity')
    .innerHTML = calculateCartQuantity();
}