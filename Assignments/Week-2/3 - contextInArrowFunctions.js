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
Hi, I'm Candidate
Welcome, Candidate

Explanation:
The above output is what I am expecting as I feel arrow functions can also be called using call as I feel call just takes in what is the object
that this function has to execute in context to and to which object this has to point out.

Time taken to solve - 3min
 */
