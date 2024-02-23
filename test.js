/**
 * important things about my code to keep in mind
 * loop variable e.g: foreach cant have same name 
 * as variable outside loop.
 * scope matters -> pay attention not to return from function 
 * inside foreach loop but from outside of it
 * if you cant come up with good var names ask chatgpt
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