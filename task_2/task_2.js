const user = {
    name: `Anton`,
    age: 36,
    skills: [
        `Javascript`,
        `HTML`,
        `CSS`
    ],
    salary: 80000
};

let userJSON = JSON.stringify(user);

console.log(userJSON);