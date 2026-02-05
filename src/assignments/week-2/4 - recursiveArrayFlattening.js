/*
Swiggy | Machine Coding: Recursive Array Flattening
Question: Implement a polyfill for Array.prototype.flat(). Your implementation must handle the depth argument correctly.
*/

/**
 *
 * @param {number} idx
 * @param {number[]} inputArr
 * @param {number} depth
 * @param {number[]} result
 */
const customFlatHelper = (idx, inputArr, depth, result) => {
  if (idx === inputArr.length) return;
  const value = inputArr[idx];
  if (Array.isArray(value) && depth > 0) {
    customFlatHelper(0, value, depth - 1, result);
  } else {
    result.push(value);
  }
  customFlatHelper(idx + 1, inputArr, depth, result);
};

/**
 * @param {Array} arr
 * @param {number} depth
 * @returns {number[]}
 */
function customFlat(arr, depth = 1) {
  const result = [];
  customFlatHelper(0, arr, depth, result);
  return result;
}

const nestedData = [2, [7, 8, [3, [10, 11, 12, [15]], 4]]];
console.log(JSON.stringify(customFlat(nestedData, 2))); // [2, [7, 8]]
// console.log(customFlat(nestedData, 2)); // [7, 8]
// console.log(customFlat(nestedData, Infinity)); // [9, 10, 11, 7, 8, 12]

/*
For reference purposes only for future revision

1. Found that console can print only upto some levels even for array (only 3 levels) - so need to use JSON.stringify
2. Time & Space complexities - O(N), O(N + D), D -> Depth

TestCases
1. Depth 1
2. Depth 2, 3
3. Max Valid Depth possible
4. Infinity Depth
5. Whether result array is properly displayed in console log

Time taken to solve this using multiple output checking - 45min
*/
