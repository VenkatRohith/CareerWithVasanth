/*

Question 2: ### **Microsoft | Technical Round: The Microtask Priority Riddle**

**Question:** Predict the exact output. Explain why the `asyncFn` behaves differently than a standard promise chain.

console.log('1 - Sync');

setTimeout(() => {
  console.log('2 - Macrotask');
}, 0);

async function asyncFn() {
  console.log('3 - Inside Async');
  await Promise.resolve();
  console.log('4 - After Await');
}

asyncFn();

Promise.resolve().then(() => {
  console.log('5 - Microtask');
});

console.log('6 - Sync End');

*/

/*
Predicted output
1 - Sync
3 - Inside Async
6 - Sync End
4 - After Await
5 - Microtask
2 - Macrotask

why the `asyncFn` behaves differently than a standard promise chain?
async and await behave differently than promise as the code inside an async function executes in synchronous way until it encouters an await,
if await is encountered, then it stop the execution at that point of time until that Promise on which it awaits is resolved or rejected and executes the
subsequent code after it based on if it is resolved or rejected.

Time taken to solve - 3min
 */
