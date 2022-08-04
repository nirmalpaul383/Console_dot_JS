/* This project is originally made by me(N Paul). My github profile https://github.com/nirmalpaul383/
My youtube page https://www.youtube.com/channel/UCY6JY8bTlR7hZEvhy6Pldxg/ .This is an open source program .
You are welcomed to modify it...If you want to support me please give a like to our facebook page: https://facebook.com/a.new.way.Technical/ */


//Declaring necessary variables
const consoleInputDisplay = document.getElementById('consoleInputDisplay');
const consoleOutputDisplay = document.getElementById('consoleOutputDisplay');
const acceptButton = document.getElementById("acceptButton");
let backgroundExecMode; //Used for setting execution mode (false: Single(main) threaded; true: Multi(worker) threaded)
let bgExecuter; //Background code executer (worker)


//Changing default/stock JavaScript's console.log() function with our custom function...
const console = {
  log: function(input) {

    //When the user tries to view a JavaScript object through the console.log() method, the object will be shown as a string instead of "[object Object]".
    if (typeof(input) === 'object') {
      input = JSON.stringify(input);
    };

    consoleOutputDisplay.value = `${consoleOutputDisplay.value}
${input}`;
  }
};


//Main object, containing all necessary functions
const Console_dot_JS = {

  //For testing background code execution mode (worker thread) availability on the system/client
  test_bgExe_availability: function() {

    //Execution mode checking
    try {

      //Initializing worker
      bgExecuter = new Worker('executer_worker.js');

      //After initialisation, when worker thread give some output
      bgExecuter.addEventListener("message", (msg) => {
        //For outputting the information
        console.log(msg.data);


        //When the worker thread completed its task, the Accept button 's style (Label and Color) will be reset
        acceptButton.value = "Run";
        acceptButton.style.backgroundColor = "rgb(19, 221, 70)";
      });

      backgroundExecMode = true;
    }
    catch (error) {
      backgroundExecMode = false;
    };
  },




  //Main function, when user click Run button

  //The main thread will execute the user inputed code when a background worker cannot be used on the client/system
  //Main (Single) threaded code execution mode
  run_bgExeMode_false: function() {

    consoleOutputDisplay.value = ''; //Clearing Console

    let rawCodes = consoleInputDisplay.value; //for getting user inputed code.

    let startTimeForTestPerformance = window.performance.now(); //for performence testing

    //When error occured for evaluating JS Codes, then program flow should not be stopped instead error message should be shown.
    try {
      //Evaluating the expression using global Function()
      Function(rawCodes)();
    }
    catch (error) {
      console.log((error.message)); //Show error message/code to the console ,incase of an error
    };

    let endTimeForTestPerformance = window.performance.now(); //for performence testing

    console.log(`Code Execution finished (in main thread). Time consumed(for User inputed JS code evaluating only): ${endTimeForTestPerformance - startTimeForTestPerformance} ms`); //Show code execution time on Console

  },


  //The worker thread will execute the user inputed code when a background worker can be used on the client/system
  //Background (Worker) threaded code execution mode
  run_bgExeMode_true: function() {

    consoleOutputDisplay.value = ''; //Clearing Console
    
    let rawCodes = consoleInputDisplay.value; //for getting user inputed code.

    //Sending user inputed codes to the worker thread (for execution)
    bgExecuter.postMessage(rawCodes);


  }

};

//First we need to check background execution mode avililiblity
Console_dot_JS.test_bgExe_availability();


//Writes some basic information to the input and output display
{
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

  consoleOutputDisplay.placeholder = `Console Output , Background Execution Mode: ${backgroundExecMode}`;

}


//Assiging acceptThisCode() function to the accept(run) button
acceptButton.addEventListener("click", () => {

  //If background execution mode is available in the system/client
  if (backgroundExecMode === true) {

    //Clicking the accept button while the code is running in worker thread mode will behave like both the run and stop buttons. (First as Run button and later (during code execution) as Stop button)
    if (acceptButton.value === "Run") {

      //If system/client supports worker then user inputed codes will be executed using background (worker) thread
      //As this mode will run in background thread so we can add some extra features (e.g execution termination) in this mode.
      Console_dot_JS.run_bgExeMode_true();

      //Changing the accept button 's label to Stop and background color to Red (To make it behave like a stop button while code is executing on the worker thread.)
      acceptButton.value = "Stop";
      acceptButton.style.backgroundColor = "Red";
    }

    //Accept button's label is when not "Run" (i.e. when code is executing in the background)
    else {
      //For termination of the worker thread
      bgExecuter.terminate();

      //For removing worker thread and its event listener
      bgExecuter = undefined;

      //For giving feedback about termination
      console.log("Execution Terminated");

      //For re-initialising of worker thread
      Console_dot_JS.test_bgExe_availability();

      //For reset accept button 's label & background color
      acceptButton.value = "Run";
      acceptButton.style.backgroundColor = "rgb(19, 221, 70)";
    };


  }
  else {
    //If system/client does not support worker then user inputed codes will be executed using main thread
    Console_dot_JS.run_bgExeMode_false();
  }
});
