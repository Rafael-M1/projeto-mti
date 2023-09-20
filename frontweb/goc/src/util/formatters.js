export const formatPrice = (price) => {
  const params = { maximumFractionDigits: 2, minimumFractionDigits: 2 };
  return new Intl.NumberFormat("pt-BR", params).format(price);
};

export const formatLocalDateTime = (date) => {
  return `${date.toLocaleDateString()} 00:00:00`;
};
