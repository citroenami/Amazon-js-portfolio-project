import { cart,removeFromCart,updateProductQuantity } from "../../data/cart.js";
import {findMatchingProductById} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {renderCheckoutHeader} from './checkoutHeader.js';

// radio selector working same name = we can only select 1 of them
// <input type='radio' name="name1">
export function renderOrderSummary () {
  renderCheckoutHeader();
  let orderSummaryHTML = '';
  console.log(cart);

  cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = findMatchingProductById(productId);
    orderSummaryHTML += `
        <div class="cart-item-container
        js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
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
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${matchingProduct.id}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  });

  document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHTML;

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

  
}