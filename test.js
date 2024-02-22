/**
 * important things about my code to keep in mind
 * break down each module into steps 
 * 1.Check if the product is alredy in the cart
 * 2. if it is in the cart, increase the quantity
 * 3. if it's not in the cart, add it to the cart.
 */

let bol = false;
export function test(){
  let testVar = someTest();
  if(testVar) {
    /*want to see if there is difference between
    initializing a variable with undefined 
    and getting undefined from non returning function*/
    console.log('useful info about func working');
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