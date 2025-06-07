export const calculateTotalCost = (price: number, quantity: number) => {
  // price should be KOBO
  return price * quantity;
};

export const subtractBalance = (balance: number, amount: number) => {
  // price and amount should be KOBO
  return balance - amount;
};
