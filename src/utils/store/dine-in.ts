import { DineInCartActionType, DineInCartItemType } from '@/store/features/dine-in.slice';

export const addItemToDineInCart = (
  cart: DineInCartItemType[],
  item: DineInCartActionType,
  totalItems: number
) => {
  const existingItem = cart.find(
    (cartItem) => item.productId === cartItem.productId
  );
  if (existingItem) {
    existingItem.quantity += 1;
    totalItems += 1;
  } else {
    cart.push({ productId: item.productId, quantity: 1 });
    totalItems += 1;
  }

  return { cart, totalItems };
};

export const removeItemFromDineInCart = (
  cart: DineInCartItemType[],
  item: DineInCartActionType,
  totalItems: number
) => {
  const existingItemIndex = cart.findIndex(
    (cartItem) => item.productId === cartItem.productId
  );
  const existingItem = cart[existingItemIndex];

  if (existingItemIndex >= 0) {
    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      totalItems -= 1;
    } else {
      cart.splice(existingItemIndex, 1);
      totalItems -= 1;
    }
  }

  return { cart, totalItems };
};
