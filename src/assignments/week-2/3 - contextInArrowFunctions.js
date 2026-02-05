/*
### **Meta (Facebook) | Technical Trivia: Context in Arrow Functions**

**Question:** What will be the output? Can the context of `greet` be changed using `.call()`? Why or why not?

const profile = {
  userName: 'Vasanth',
  greet: () => {
    console.log(`Hi, I'm ${this.userName}`);
  },
  welcome: function() {
    console.log(`Welcome, ${this.userName}`);
  }
};

const friend = { userName: 'Candidate' };

profile.greet.call(friend);
profile.welcome.call(friend);
*/

/*
Expected Output

Hi, I'm undefined
Welcome, Vasanth

Explanation
As we can not change the context of Arrow function. Context can only be defined when arrow function is created so it will take global as this context.
In case of normal function the context can be changed.

Time taken to solve - 3min (re-attempt)
 */
