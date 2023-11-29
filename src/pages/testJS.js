const user = { 
    'name': 'Alex',
    'address': '15th Park Avenue',
    'age': 43
}

const {age, ...rest} = user;
console.log(age);
console.log(rest);