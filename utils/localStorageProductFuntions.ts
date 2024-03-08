export const deleteProductFromLS = (productId: string) => {
  const cartItems = localStorage.getItem('cartItems');
  if (cartItems === null || cartItems.length === 0) return;
  else {
    const oldCardItems: string[] = JSON.parse(cartItems);
    const productIdx = oldCardItems.findIndex((item) => item === productId);
    oldCardItems.splice(productIdx, 1);
    localStorage.setItem('cartItems', JSON.stringify(oldCardItems));
  }
};
export const saveProductInLS = (productId: string) => {
  const cartItems = localStorage.getItem('cartItems');
  if (cartItems === null) localStorage.setItem('cartItems', JSON.stringify([productId]));
  else {
    const oldCardItems: string[] = JSON.parse(cartItems);
    localStorage.setItem('cartItems', JSON.stringify([...oldCardItems, productId]));
  }
};
export const clearProductsInLS = () => {
  const cartItems = localStorage.removeItem('cartItems');
};
export const deleteWholeProductFromLS = (productId: string) => {
  const cartItems = localStorage.getItem('cartItems');
  if (cartItems === null || cartItems.length === 0) return;
  else {
    const oldCardItems: string[] = JSON.parse(cartItems);
    const newCartItems = oldCardItems.filter((item) => item !== productId);
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }
};
