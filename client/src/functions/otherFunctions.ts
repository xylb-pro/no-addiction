/**
 * Insert intem to array
 * @param {array} arr - array
 * @param {number} index - insert index
 * @param {any} newItem - intem to insert
 * @return {array} newArray
 */

export const insert = (arr: any[], index: number, newItem: any) => [
  // part of the array before the specified index
  ...arr.slice(0, index),
  // inserted item
  newItem,
  // part of the array after the specified index
  ...arr.slice(index),
];
