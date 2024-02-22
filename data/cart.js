import {findMatchingProduct} from './products.js';

export let cart = [{
  productId: '123',
  quantity: 1
},{
  productId: '456',
  quantity: 1
}];

export function addProductToCart (productOfInterest,extraQuantity) {
  console.log(extraQuantity);
  // oldProduct contains product from products 
  let oldProduct = isProductInCart(productOfInterest);
  let newProduct = findMatchingProduct(productOfInterest);
  // this is gonna be an object which is a truthy value
  // in test() we already found out that this should work like this
  if(oldProduct) {
    oldProduct.quantity += extraQuantity;
  } else {
    cart.push({
      productId: newProduct.id,
      quantity: extraQuantity
    });
  }
  console.log(cart);
}
//in Jasmine or in try catch statement
// need to check if cart is empty
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
       */
      //return cartProduct;
      cartItemVar = cartItem;
    }
  });
  return cartItemVar;
}