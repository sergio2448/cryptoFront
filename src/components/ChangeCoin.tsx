export const changecoin = (coin: string, value: number | string) => {
  let str = value.toString();
  let array = str.split(".");

  var thousands = Intl.NumberFormat()
    .format(Number(array[0]))
    .replace(/\,/g, ".");

  var decimals = coin === "btc" ? array[1].slice(0, 8) : array[1].slice(0, 2);

  let result = thousands + "," + decimals;

  return result;
};
