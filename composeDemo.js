import {compose} from 'redux';

function removeSpaces(string){
    return string.split(" ").join("");
}

function repeatString(string){
    // return string+string // repeate string two times
    return string.repeat(2);
}

function convertToUpperCase(string){
    return string.toUpperCase();
}
const input = "abcd efgh ijkl"

// const output = convertToUpperCase(repeatString(removeSpaces(input))) // h(g(f(x))) composition of function
// same as above
const composeFunction = compose(removeSpaces, repeatString, convertToUpperCase) // first remving space then repeat string then converting to upper case
console.log(composeFunction(input));