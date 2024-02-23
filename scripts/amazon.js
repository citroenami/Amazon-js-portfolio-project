/* 1. Save the data (info about the product: name,price,image
  ect...
  in this project by default this data is in the html code)
2. Generate the HTML
3. Make it interactive 

 * break down each module into steps 
 * 1.Check if the product is alredy in the cart
 * 2. if it is in the cart, increase the quantity
 * 3. if it's not in the cart, add it to the cart.
 
*/
/* ../ -> step outside current file (towards parrent folder) */
import {products,findMatchingProductById} from '../data/products.js';
import {addProductToCart} from '../data/cart.js';
// i specifically need to import calculateCartQuantity
// into amazonHeader.js its not enough to just import it here
import {renderAmazonHeader} from './amazonHeader.js';
/**
 * The ./ indicates that the module or file you are trying 
 * to import is located in the same directory as the file
 * where the import statement is written.
 */
//import {test} from '../test.js';


renderAmazonHeader();
//test();
// we need to initialize this var with emplty sting 
// like this productsHTML = '' or list will start with undefined
let productsHTML = '';

products.forEach((product) => {
  /* product.rating.stars is f.e:4,5 by default but pic name
  uses num 45 so we need to multiply for correct work*/
  /** productsHTML += ->this called Accumulator Pattern */
  /** toFixed() -> convert a number into a string */
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      
      <div class="product-quantity-container">
        <select
        class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart
      js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="
      add-to-cart-button js-add-to-cart-btn
      button-primary"
      data-product-id="${product.id}"
      >
        Add to Cart
      </button>
    </div>
  `;
});
document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

  /* a Data Attribute is just another HTML attribute.
  it allows us to attach any info to an element
  data attributes have to start with data- 
  btn.dataset -> gives all the data attributes attached 
  to a certain element(in this case to this button)*/ 
const addToCartBtnsElement = document.querySelectorAll('.js-add-to-cart-btn');
  addToCartBtnsElement.forEach((btn)=>{
    // this var is unique for each btn it uses closure
    let previousTimeoutKey;
    btn.addEventListener('click',()=>{
      const {productId} = btn.dataset;
      //look for number to add, to existing/ new quantity

      // this value is string here  
      let selectVar = document.querySelector(`.js-quantity-selector-${productId}`)
      .value;
      
      // console.log(selectVar); found out here that variable mismatch break code
      // findMatchingProductById returns a product
      addProductToCart(findMatchingProductById(productId),Number(selectVar));
      renderAmazonHeader();
      // this element is also unique for each instance
      // so we can use it to remove class from msg div element
      const addedMsgElement = document.querySelector(`.js-added-to-cart-${productId}`);
      addedMsgElement.classList.add('added-to-cart-visible');
      if(previousTimeoutKey) {
        clearTimeout(previousTimeoutKey);
      }
      previousTimeoutKey = setTimeout(()=>{
        addedMsgElement.classList.remove('added-to-cart-visible');
      },2000);
    });
      /**
     * steps:
     * 1. Check if the product is alredy in the cart
     * 2. if it is in the cart, increase the quantity
     * 3. if it's not in the cart, add it to the cart.
     */
});
