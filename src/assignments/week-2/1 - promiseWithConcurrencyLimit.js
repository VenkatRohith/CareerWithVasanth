/*
Question 1: ### **Uber | Machine Coding: Asynchronous Task Runner (Concurrency Limit)**

**Question:** Imagine Uber is fetching data for 100 nearby drivers. To avoid hitting API rate limits or crashing the browser with too many simultaneous requests, you must implement a
"Batch Runner."

Write a function `promiseAllWithConcurrencyLimit` that takes an array of "task functions" (functions that return a promise) and a limit `limit`. It should execute no more than `limit` tasks
at any given time. As soon as one task finishes, the next one in the queue should start.

 */

/**
 * @param {Array<() => Promise<any>>} tasks - Array of functions returning promises
 * @param {number} limit - Maximum concurrent executions
 */
async function promiseAllWithConcurrencyLimit(tasks, limit) {
  const results = [];
  let executingTasks = 0,
    processedTask = -1,
    totalTasksExecuted = 0;
  const executeTask = () => {
    processedTask++;
    executingTasks++;
    if (processedTask >= tasks.length) return;
    return Promise.resolve(tasks[processedTask]())
      .then((result) => {
        results.push(result);
        return results;
      })
      .catch((err) => {
        console.log(err);
        return results;
      })
      .finally(() => {
        totalTasksExecuted++;
        // console.log(`${totalTasksExecuted} completed`);
        executingTasks--;
        if (executingTasks < limit) {
          return executeTask(processedTask);
        }
      });
  };

  return new Promise((resolve, reject) => {
    tasks.slice(0, limit).forEach((task) =>
      executeTask(task)
        .then((results) => {
          if (totalTasksExecuted === tasks.length) return resolve(results);
        })
        .catch((err) => reject(err)),
    );
  });
}

// --- Input Data for Testing ---
const createDriverTask = (id, delay) => () =>
  new Promise((resolve) => {
    console.log(` Fetching Driver ${id}...`);
    setTimeout(() => {
      console.log(` Driver ${id} loaded`);
      resolve(`Data for Driver ${id}`);
    }, delay);
  });

const tasks = [
  createDriverTask(1, 1000),
  createDriverTask(2, 2000),
  createDriverTask(3, 3000),
  createDriverTask(4, 4000),
  createDriverTask(5, 6000),
  createDriverTask(6, 4000),
  createDriverTask(7, 1000),
  createDriverTask(8, 3000),
  createDriverTask(9, 5000),
  createDriverTask(10, 4000),
  createDriverTask(11, 7000),
  createDriverTask(12, 1000),
  createDriverTask(13, 3000),
  createDriverTask(14, 2000),
  createDriverTask(15, 6000),
  createDriverTask(16, 2000),
];

/* const tasks = [
  createDriverTask(1, 1000),
  createDriverTask(2, 1000),
  createDriverTask(3, 1000),
  createDriverTask(4, 1000),
  createDriverTask(5, 1000),
  createDriverTask(6, 1000),
]; */
// If limit is 2, Task 1 and 2 start.
// When Task 2 finishes at 0.5s, Task 3 starts immediately.
promiseAllWithConcurrencyLimit(tasks, 4).then((results) => {
  console.log("All tasks completed:", results);
});

/*
For reference purposes only for future revision

Test scenarios to check
1. At any point only provided threshold limit of tasks are executed.
2. Variable timings of tasks
3. All tasks have same timings
4. Resolve and return the results only after all the tasks are processed
5. Limit is far greater than provided tasks


Currently out of scope of question, but can be a improvement or can be asked
1. What happens if a task is rejected
2. What happens if those tasks are asked to execute in concurrent mode with threshold limit

Time taken to solve this using multiple output checking - 1hr 30min
 */
