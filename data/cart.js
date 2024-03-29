// localStorage.getItem('cart') will return null if no cart
// even if storage stores empty array its gonna be truthy value
export let cart;
// we run it once, dont worry at import evaluation the whole
// file is gonna be executed once inluding this function
loadFromStorage();
  // this function we created for Jasmine
  export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
  }



function saveToStorage() {
  /**
   * localStorage.setItem takes 2 strings
   * 1 name of what we wanna save
   * 2 data that we wanna save
   * localStorage can only save strings so we need to convert
   * our array into string
   */
  localStorage.setItem('cart',JSON.stringify(cart));
}

// change name: extraQuantity -> quantity so that we can use 
// shorthand property
// change name: addProductToCart -> addToCart (its not automatic
// that we add product to it, so dont add the word product)
/** export function addToCart (productOfInterest,quantity) {
  // oldProduct contains product from products 
  let oldProduct = isProductInCart(productOfInterest);
  let newProduct = findMatchingProduct(productOfInterest);
  // this is gonna be an object which is a truthy value
  // in test() we already found out that this should work like this
  // meaning that if function doesnt return anything variable gonna
  // be initialized with undefined 
 
   * when you log the object after adding something 
   * and after adding extra, you'll see that 
   * the earlier logs also reflect the changes. 
   * The console.log statements are printing references
   * to the same object, not different instances.
   * console.log(cart);
   
  saveToStorage();
} */

// quantity is a number here
export function addToCart(productId,quantity) {
  const cartProduct = findProductByIdInCart(productId);
  if(cartProduct) {
    cartProduct.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

//in Jasmine or in try catch statement
// need to check if cart is empty
/** !!! this whole part is not necessary after final evaluation !!!
 * if a product exists or not is up to Jasmine to find out
function isProductInCart (productOfInterest) {
  //first find product in products
  let ProductFromProducts = findMatchingProduct(productOfInterest);
  //cartItemVar > cartProductVar
  let cartItemVar;
  //this part should only run if ProductFromProducts is defined
  // cartItem is better name than cartProduct
  cart.forEach((cartItem)=> {
    //check if Product already in cart
    if(cartItem.productId === ProductFromProducts.id) {
      //if Product already in cart return cartProduct
      /**
       * IMPORTANT!!!
       * REMEMBER TO USE RETURN STATEMENT ON ONE LVL HIGHER
       
      //return cartProduct;
      cartItemVar = cartItem;
    }
  });
  return cartItemVar;
} */

/**
 * steps
 * 1. calculate the total quantity
 * 2. put the quantity on the page (using the DOM)
 */
export function calculateCartQuantity () {
  // when using += we need to initialize var with 0 or
  // it will try to add number to undefined
  let totalCartQuantity = 0;
  cart.forEach((cartItem)=>{
    totalCartQuantity += cartItem.quantity;
  });
  return totalCartQuantity;
}

//dont write removeItemFromCart coz its obvious what we delete
/**
 * how te delete an item from cart?
 * Steps:
 * 1. Create a new array
 * 2. Loop through the cart
 * 3. Add each product to the new array, exept for this productId
 */
export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  
  if(newCart.length !== 0) {
    cart = newCart;
  } else {
    cart = newCart;
  }
  saveToStorage();
}

function findProductByIdInCart(productId) {
  let matchingProduct;
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId) {
      matchingProduct = cartItem;
    }
  });
  return matchingProduct;
}

export function updateProductQuantity(productId,newQuantity) {
  cart.forEach((cartItem)=>{
    if(cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId) {
  let product = findProductByIdInCart(productId);
  product.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}