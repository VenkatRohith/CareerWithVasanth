/*
Flipkart | Machine Coding Round: Robust Debounce Utility
Question: Implement a debounce utility. The interviewer will likely ask for the "Immediate/Leading" flag as a follow-up

function debounce(func, wait, immediate = false) {
  let timeout;
  // TODO: Logic to clear timeout and handle 'this' context
}

// Usage in UI:
const onSearch = debounce((e) => console.log("Searching for:", e.target.value), 300);
// document.getElementById('search').addEventListener('input', onSearch);
*/

/**
 *
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 */
function debounce(func, wait, immediate = false) {
  if (immediate) {
    return func;
  }
  let timeout = null;
  return (...args) => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(null, args), wait);
  };
}

const onSearch = debounce(
  (e) => console.log("Searching for:", e.target.value),
  3000,
);

// document.getElementById('search').addEventListener('input', onSearch);

/*
For reference purposes only for future revision

TestCases
1. if debounce is correctly happening
2. immediate check is correctly working
3. this context is correctly happening
4. timer is cleaned correctly

Time taken to solve this using multiple output checking - 40min (stuck at fixing this context)
*/
