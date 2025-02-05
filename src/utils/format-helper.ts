const INR = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "INR",
});

export const formatPrice = (amount: number) => {
  if (!amount) return "";
  return INR.format(amount);
};
