export const arrayToObj = <T extends Record<K, string>, K extends keyof T>(
  array: T[],
  property: K
): Record<string, T> =>
  array.reduce<Record<string | number, T>>((obj, item) => {
    obj[item[property]] = item;
    return obj;
  }, {});
