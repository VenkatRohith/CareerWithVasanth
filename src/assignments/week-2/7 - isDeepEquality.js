/*
Zeta | Technical Round: Deep Equality Utility
Question: Implement isDeepEqual(obj1, obj2). This is essential in frontend development for optimizing re-renders in components where you only want to update if the data actually changed.

function isDeepEqual(obj1, obj2) {
  // 1. Check if same reference
  // 2. Check types
  // 3. Recursive key-by-key comparison
}

// --- Test Cases ---
const profileA = { name: "Vasanth", roles: ["admin", "mentor"], meta: { id: 1 } };
const profileB = { name: "Vasanth", roles: ["admin", "mentor"], meta: { id: 1 } };
const profileC = { name: "Vasanth", roles: ["admin"], meta: { id: 1 } };

console.log("Test 1 (Identical):", isDeepEqual(profileA, profileB)); // Expected: true
console.log("Test 2 (Different Roles):", isDeepEqual(profileA, profileC)); // Expected: false
console.log("Test 3 (Nested Change):", isDeepEqual(profileA, {...profileB, meta: { id: 2 } })); // Expected: false
console.log("Test 4 (Primitive):", isDeepEqual(10, 10)); // Expected: true
*/

function isDeepEqual(obj1, obj2) {
  // 1. Check if same reference
  // 2. Check types
  // 3. Recursive key-by-key comparison
  if (typeof obj1 !== typeof obj2) return false; // type check
  if (obj1 == obj2) return true; // same reference and base types satisfied
  if (typeof obj1 !== "object") return false;
  if (
    (Array.isArray(obj1) && !Array.isArray(obj2)) ||
    (!Array.isArray(obj1) && Array.isArray(obj2))
  )
    return false;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (const key in obj1) {
    if (!Object.hasOwn(obj2, key)) return false;
    if (!isDeepEqual(obj1[key], obj2[key])) return false;
  }
  return true;
}

// --- Test Cases ---
const profileA = {
  name: "Vasanth",
  roles: ["admin", "mentor"],
  meta: { id: 1 },
};
const profileB = {
  name: "Vasanth",
  roles: ["admin", "mentor"],
  meta: { id: 1 },
};
const profileC = { name: "Vasanth", roles: ["admin"], meta: { id: 1 } };

console.log("Test 1 (Identical):", isDeepEqual(profileA, profileB)); // Expected: true
console.log("Test 2 (Different Roles):", isDeepEqual(profileA, profileC)); // Expected: false
console.log(
  "Test 3 (Nested Change):",
  isDeepEqual(profileA, { ...profileB, meta: { id: 2 } }),
); // Expected: false
console.log("Test 4 (Primitive):", isDeepEqual(10, 10)); // Expected: true
// console.log("Test 4 (Primitive):", isDeepEqual(null, undefined)); // Expected: true
// console.log("Test 4 (Primitive):", isDeepEqual(10, "101")); // Expected: false
// console.log("Test 4 (Primitive):", isDeepEqual(profileA, { ...profileA })); // Expected: true
/*
For reference purposes only for future revision

TestCases
1. primitive vs same primitive and same value
2. primitive vs same primitive and different value
3. primitive vs different primitive and same value
4. complex vs same complex and same value and same ref
5. complex vs same complex and same value and diff ref
6. complex vs same complex and diff value
7. complex vs different complex
8. null & undefined checks

Primitives
1. string ✅
2. boolean ✅
3. number ✅
4. bigint ✅
5. symbol (need to check)
6. null ✅
7. undefined ✅

Complex
1. object ✅
2. function ✅
3. date ✅

Time taken to solve this using multiple output checking - 18min (took time for checking all test cases)
*/
