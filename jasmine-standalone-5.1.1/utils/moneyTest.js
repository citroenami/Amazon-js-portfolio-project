import formatCurrency from '../../scripts/utils/money.js';

// describe -> test suite
describe('test suite: formatCurrency', ()=>{
  // it -> spec (= test)
  it('converts cents into dollars',()=>{
    // expect -> lets us compare a value with another value
    // expect gives us many objects to work with
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  describe('edge cases: formatCurrency',()=>{
    it('works with 0', ()=>{
      expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent', ()=>{
      expect(formatCurrency(2000.5)).toEqual('20.01');
    });

    it('rounds down to the nearest cent', ()=>{
      expect(formatCurrency(2000.4)).toEqual('20.00');
    });
  });

});