/**
 * toFixed method has a small issue with rounding
 * for some numbers it wont round properly
 * 6.005.toFixed(2) -> '6.00' X
 * 7.005.toFixed(2) -> '7.00' X
 * 8.005.toFixed(2) -> '8.01' X
 * so we first round the priceCents first that way
 * toFixed dont need to do any rounding
 */

function formatCurrency (priceCents) {
  return (Math.round(priceCents) / 100).toFixed(2);
}

// each file can only have 1 default export
export default formatCurrency;