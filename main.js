/* This project is originally made by me(N Paul). My github profile https://github.com/nirmalpaul383/
My youtube page https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/ .This is an open source program .
You are welcomed to modify it...If you want to support me please give a like to our facebook page: https://facebook.com/a.new.way.Technical/ */


//Declaring necessary variables
let consoleInputDisplay = document.getElementById('consoleInputDisplay');
let consoleOutputDisplay = document.getElementById('consoleOutputDisplay');


//Write some basic information to the consoleInputDisplay
consoleInputDisplay.placeholder = `Welcome to Console.JS by N Paul.This is a small project to run/evaluate javascript code and to show the output on a custom console
using a custom 'console.log()' method.You can enter JavaScript code here. You can use the "console.log()" method to output a JS code.

This project is very similar to my another project "JavaScript_Console_Mini-inside-webpage" https://github.com/nirmalpaul383/JavaScript_Console_Mini-inside-webpage.
But the main difference between this and that project is that it never instantly returns the output of a code untill "console.log()" method is used but that one always returns
an output(regardless of defined/undefinded value). Another difference is that when a code is thrown into that(JavaScript_Console_Mini-inside-webpage), that first reads it,
then evaluates it, then prints its output and is ready to take the another code again (not forgetting the old codes). But comparatively in this project, if codes are thrown into
it, it first reads the entire codes, then evaluates it, and if there is "console.log()" method only then it outputs it, and if we throws a new code, it forgets the previously
executed code. 

If you like this project please give a star to this project. https://github.com/nirmalpaul383/Console_dot_JS



[Write Your JS Codes Here And Click On The Run Button To Execute Those Codes , You Can Use "console.log()" Method To Output A JS Code To The Console]


`;


consoleOutputDisplay.placeholder = `Console Output`;

//Changing default/stock JavaScript's console.log() function with our custom function...
console.log = function (input) {

    //When the user tries to view a JavaScript object through the console.log() method, the object will be shown as a string instead of "[object Object]".
    if (typeof (input) === 'object') {
        input = JSON.stringify(input);
    };

    consoleOutputDisplay.value = `${consoleOutputDisplay.value}
${input}`;
};

//Main function, when user click Run button this function will be executed
function acceptThisCode() {

    consoleOutputDisplay.value = '';//Clearing Console


    let rawCodes = consoleInputDisplay.value;//for getting user inputed code.

    let startTimeForTestPerformance = window.performance.now();//for performence testing

    //When error occured for evaluating JS Codes, then program flow should not be stopped instead error message should be shown.
    try {
        //Evaluating the expression using global Function()
        Function(rawCodes)();
    }
    catch (error) {
        console.log((error.message)); //Show error message/code to the console ,incase of an error
    };


    let endTimeForTestPerformance = window.performance.now(); //for performence testing

    console.log(`Code Execution finished. Time consumed(for User inputed JS code evaluating only): ${endTimeForTestPerformance - startTimeForTestPerformance} ms`); //Show code execution time on Console

}

