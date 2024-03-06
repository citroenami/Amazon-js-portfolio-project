import {addToCart,cart,loadFromStorage} from '../../data/cart.js';

//this is an if else statement test
describe('test suite: addToCart', ()=>{
  it('adds an exesting product to the cart',()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    expect(cart.length).toEqual(1);
    // after mocking a method we can check how many times it was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // localStorage store stings
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');

  });

  it('adds a new product to the cart',()=>{
    // even though we will setItem down below after 
    // executing addToCart() we have to first make fake
    // setItem also because this is the rule !!!ORDER MATTERS
    spyOn(localStorage, 'setItem');

    // flaky test = test that sometimes passes and sometimes fails
       // make !!!Mock!!! for ls.getItem to return a fake version
    //give 2 parameters 1st. obj localStorage
    // 2. is the method that we want to moch e.g: getItem
    // this will replace ls.gI with a fake version
    // spy will return an object and this has a propert called:
    // and-> this is also an object which has a method called:
    // callFake() -> we give this a function describing in it
    // what we want getItem to do
    // order matters when mocking localStorage first we load cart
    // 1. than we mock local storage 
    // 2. and than we reload the cart
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      // we override getItem with whatever is inside this function
      // !!!lS only support strings!!!
      return JSON.stringify([]);
    });
    // this console.log has to be inside it()
    //console.log(localStorage.getItem('cart'));
    // we reload the cart with this function but this time
    // with our mocked localStorage value 
    loadFromStorage();

    // we dont want our test code to modify real code
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6',1);
    // to prevent save cart to lS we moch setItem also
    expect(cart.length).toEqual(1);
    // after mocking a method we can check how many times it was called
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // localStorage store stings
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');

  });
 
});