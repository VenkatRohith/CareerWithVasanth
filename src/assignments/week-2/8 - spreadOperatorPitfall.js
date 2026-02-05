/*
### **Adobe | Conceptual Round: Spread Operator Pitfall**

**Question:** What will be logged? How do you fix this using the spread operator while keeping the code readable?

const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {...state };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city);
// Expected output? Why did it change?
 */

/*
Expected Output:
Chennai

Explanation:
The original state also changed as how complex data types are handled in javascript.
Objects, Arrays, Functions and other reference data types are not deep copied and only
shallow copied and pointing to the same memory. Hence the output.

This can be fixed by destructuring the details object as well, so that a new copy of details
object

Fix:
const state = {
  user: { id: 101, details: { city: 'Bangalore' } },
  theme: 'dark'
};

const newState = {...state, details: {...state.details } };
newState.user.details.city = 'Chennai';

console.log(state.user.details.city); => 'Bangalore'

Time taken to solve - 2min
*/
