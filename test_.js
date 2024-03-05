/**
 * important things about my code to keep in mind:
 * feedback: i comment randomly time to time here and there
 * and include them into the different git commits without
 * mentioning anything. 
 * loop variable e.g: foreach cant have same name 
 * as variable outside loop.
 * scope matters -> pay attention not to return from function 
 * inside foreach loop but from outside of it
 * if you cant come up with good var names ask chatgpt
 * --------------
 * using multiple script tags instead of modules
 * can cause naming conflicts
 * e.g: var cart in cart.js and cart variable in amazon.js
 * is OK if we use modules because we CONTAIN the variables
 * inside the different files
 * for modules to work we need to use live server
 * --------------
 * in task quantity selector my code was:
 * <select
        class="js-product-quantity-select"
        data-product-id="${product.id}">
   this could be improved to:
   <select
        class="js-quantity-selector-${product.id}"
        >
   because its obvious that its about product quantity
   also using dataset here is redundant 
   note: values we get from the DOM are strings by default
   e.g: the value of <select> element
   ---------------
   external library = code outside of our project
   https://unpkg.com/supersimpledev@1.0.1/hello.js
   {dayjs} -> this is called a named export
   dayjs -> this is a default export
   ------------------
   function getProduct(productId) ->
 * if we look for product by id, than we dont need to choose
   between product.id(productItem) and 
   product.productId(cartItem) 
   --------------------------
   Automated testing = using code to test code
   try to test something different in every test case

   with manual testing if we wanted to remove e.g: rounding
   in formatCurrency from money.js, we would need to remove
   it manually -> auto test make re-testing easy after any change
 */

let bol = false;
export function test(){
  let testVar = someTest();
  // if function dont return anything testVar 
  // will be initialized with undefined value
  console.log(typeof testVar);
  if(testVar) {
    /*want to see if there is difference between
    initializing a variable with undefined 
    and getting undefined from non returning function*/
    console.log('useful info about func working');
  } else {
    console.log('function didnt return anything');
  }
}

/* find out if a function returns undefined
does it make if statement evaluate false thus stopping it*/
function someTest() {
  if(bol === true) {
    //intentionally dont return anything
    return true;
  }
}