//Creating a custom Console for backgrounds code executer
//The worker thread will post to the main thread whenever there is console.log() in the user inputted codes.
const console = {
  log: function(input) {
    self.postMessage(input);
  }
}


//Whenever something is posted from the main thread to the worker thread
self.addEventListener("message", (rawCodesMsg) => {

  let rawCodes = rawCodesMsg.data //Accessing data

  let startTimeForTestPerformance = self.performance.now(); //for performence testing

  //When error occured for evaluating JS Codes, then program flow should not be stopped instead error message should be shown.
  try {
    //Evaluating the expression using global Function()
    Function(rawCodes)();
  }
  catch (error) {
    console.log((error.message)); //Show error message/code to the console ,incase of an error
  };

  let endTimeForTestPerformance = self.performance.now(); //for performence testing

  console.log(`Code Execution finished (in worker thread). Time consumed(for User inputed JS code evaluating only): ${endTimeForTestPerformance - startTimeForTestPerformance} ms`); //Show code execution time on Console



})
