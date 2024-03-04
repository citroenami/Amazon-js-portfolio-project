import { cart,removeFromCart,updateProductQuantity,updateDeliveryOption } from "../../data/cart.js";
import {getProduct} from '../../data/products.js';
import formatCurrency from '../utils/money.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';

// DayJS (ESM version) putting export before external library 
// function turns it into an ESM version
// we can use default export when we only wanna export 1 thing
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// radio selector working same name = we can only select 1 of them
// <input type='radio' name="name1">

/** prcatice code
 * const today = dayjs();
   const deliveryDate = today.add(7,'days');
   console.log(deliveryDate.format('dddd, MMMM D')); 
*/

export function renderOrderSummary () {
  renderCheckoutHeader();
  renderPaymentSummary();
  let orderSummaryHTML = '';

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    // const matchingProduct = findMatchingProductById(productId);
    const matchingProduct = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const deliveryDateString = calculateDeliveryDate(deliveryOption);

    orderSummaryHTML += `
        <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${deliveryDateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link
                js-update-quantity-link
                link-primary"
                data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link
                js-save-quantity-link-${matchingProduct.id}
                link-primary">
                  Save
                </span>
                <span class="delete-quantity-link 
                js-delete-link
                link-primary"
                data-product-id="${matchingProduct.id}">
                  Delete
                </span>
                <br>
                <span class="invalid-input 
                js-invalid-input-${matchingProduct.id}
                ">
                  invalid input!
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct,cartItem)}
            </div>
          </div>
        </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct,cartItem) {
    let optionsHTML = '';
    deliveryOptions.forEach((deliveryOption)=>{
      const dateString = calculateDeliveryDate(deliveryOption);
      // we can break ternary operators into multiply lines
      const priceString = deliveryOption.priceCents === 0 
      ? 'FREE' 
      : '$' + formatCurrency(deliveryOption.priceCents) + ' -';
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId
      ? 'checked'
      : '';

      // ${isChecked ? 'checked' : ''}
      /**
       * When you place an <input type="radio"> element inside a <div> 
       * and attach an event listener to the <div> for click events, 
       * it creates a connection between the click event on the <div> 
       * and the associated <input> element. This is because of 
       * a behavior known as !!! event bubbling !!! in the DOM.
       */
      optionsHTML += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });
    return optionsHTML;
  }
  /**
   * update code so that delivery dates are not on a weekend
   * steps: 
   * 1. when calculating delivery date skip all weekend days
   */
  function calculateDeliveryDate (deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    // deliveryDate is the original object
    let deliveryDate = dayjs();

    while(remainingDays !== 0) {
      // we dont need += because the date changes automatically
      deliveryDate = deliveryDate.add(
        1,
        'days'
      );

      if(!isWeekend(deliveryDate)) {
        remainingDays--;
      }
    }
   

    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );
    return dateString;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHTML;

  document.querySelectorAll('.js-delivery-option')
    .forEach((element)=>{
      element.addEventListener('click',()=>{
        const {productId,deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        /**
         * 1. update the data
         * 2. regenerate the HTML
         * MVC = model - view - controller(is a design pattern)
         * 1. Model = saves and manages the data
         * so data folder is all part of model, cause 
         * it saves and manages our data.
         * 2. View = takes the data and displays it on the page
         * the part of the code that takes and generates our data
         * 3. Controller = runs some code when we interact with the page
         * e.g: the event listeners
         * so e.g: cart -> model -> generate HTMl with foreach -> view 
         * querry selector, event listener -> controller
         * than view -> regenerates HTML with updated model 
         * instead of updating the page directly using the DOM
         * we use MVC approach
         */
        renderOrderSummary();
      });
    });

  /**
   * 1. Remove the product from the cart
   * 2. Update the HTML
   * we could use container.remove() by inserting the id into 
   * the container class name but its not what we want here
   */
  document.querySelectorAll('.js-delete-link')
    .forEach((delLink)=>{
      delLink.addEventListener('click',()=>{
        const {productId} = delLink.dataset;
        removeFromCart(productId);
        renderOrderSummary();
      });
    });

  const updateLinkElement = document.querySelectorAll(`.js-update-quantity-link`);
  updateLinkElement.forEach((updateLinkBtn)=>{
    updateLinkBtn.addEventListener('click',()=>{
      const {productId} = updateLinkBtn.dataset;
      const containerElement = document.querySelector(`.js-cart-item-container-${productId}`);
      containerElement.classList.add('is-editing-quantity');
// ------------- this part below handles save btn ---------
      const saveLinkElement = document.querySelector(`.js-save-quantity-link-${productId}`);
      saveLinkElement.addEventListener('click',()=>{
        const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
        const inputValue = inputElement.value;
        const invalidElement = document.querySelector(`.js-invalid-input-${productId}`);
        if(Number(inputValue) > 0 && Number(inputValue) <= 1000) {
          updateProductQuantity(productId,Number(inputValue));
          containerElement.classList.remove('is-editing-quantity');
          if(invalidElement.classList.contains('not-valid')) {
            invalidElement.classList.remove('not-valid');
          }
          renderOrderSummary();
        } else {
          invalidElement.classList.add('not-valid');
          console.log('ok')
        }
      });
// -----this code is a little repetative but at this moment
// i know no better ----------------
      const inputElement = document.querySelector(`.js-quantity-input-${productId}`);
      inputElement.addEventListener("keydown", (event)=> {
        // Check if the pressed key is Enter (key code 13)
        if (event.key === "Enter") {
          // Your code to execute when Enter is pressed
          const inputValue = inputElement.value;
          const invalidElement = document.querySelector(`.js-invalid-input-${productId}`);
          if(Number(inputValue) > 0 && Number(inputValue) <= 1000) {
            updateProductQuantity(productId,Number(inputValue));
            containerElement.classList.remove('is-editing-quantity');
            if(invalidElement.classList.contains('not-valid')) {
              invalidElement.classList.remove('not-valid');
            }
            renderOrderSummary();
          } else {
            invalidElement.classList.add('not-valid');
            console.log('ok')
          }
        }
      });
    });
  });

  /**
   * takes a DaysJS obj and returns true if it falls to a 
   * weekday.
   */

  //  dayObj->date
  function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    /**if(argument === 'Saturday'
    || argument === 'Sunday') {
      return true;
    }*/
    return dayOfWeek === 'Saturday'|| dayOfWeek === 'Sunday';
  }
  
}