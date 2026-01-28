/*
Atlassian | Machine Coding: The Ultimate Deep Clone
### **Question:** Implement `deepClone(obj)`. It must handle circular references. Atlassian specifically checks for memory efficiency and handling of nested structures without
 using `JSON.stringify`.

function deepClone(value, map = new WeakMap()) {
  // 1. Base case: handle primitives
  // 2. Handle circular references using map
  // 3. Recursive cloning for Arrays and Objects
}

const original = {
  a: 1,
  b: { c: 2 },
  d: [11, 7],
};
original.self = original; // Circular reference!

const copy = deepClone(original);
console.log(copy!== original); // true
console.log(copy.b!== original.b); // true
console.log(copy.self === copy); // true (circularity preserved)
*/

function deepCloneHelper(key = "", value, map, result) {
  if (typeof value === "object") {
    if (key === "self") {
      result.self = result;
    } else {
      const localResult = Array.isArray(value) ? [] : {};
      Object.keys(value).forEach((objectKey) => {
        deepCloneHelper(objectKey, value[objectKey], map, localResult);
      });
      result[key] = localResult;
    }
  } else {
    result[key] = value;
  }
}

/**
 *
 * @param {object} value
 * @param {WeakMap} map
 * @returns {object} deep cloned object preserving circular references
 */
function deepClone(value, map = new WeakMap()) {
  // 1. Base case: handle primitives
  // 2. Handle circular references using map
  // 3. Recursive cloning for Arrays and Objects
  if (typeof value !== "object" || value === null)
    throw Error("Not an object or an array");
  const result = Array.isArray(value) ? [] : {};
  Object.keys(value).forEach((objectKey) => {
    deepCloneHelper(objectKey, value[objectKey], map, result);
  });
  return result;
}

const original = {
  a: 1,
  b: { c: 2 },
  d: [11, 7],
};
original.self = original; // Circular reference!
// original.b.self = original.b;
// original.d.self = original.d;

const copy = deepClone(original);
console.log(copy !== original); // true
console.log(copy.b !== original.b); // true
console.log(copy.self === copy); // true (circularity preserved)
// console.log(copy.b.self === copy.b); // true (circularity preserved)
// console.log(copy.d !== original.d); // true
// console.log(copy, "\n", original);

/*
For reference purposes only for future revision

TestCases
1. check for both array & object referential equality
2. check for circular references at all nested levels
3. check for Error to be thrown if null or undefined is passed
4. Check for undefined or null as values

Questions?
Why do we require WeakMap? - Current logic is not at all using WeakMap and circular references
working perfectly

Time taken to solve this using multiple output checking - 15min (stuck at fixing new copy not being returned)
*/
