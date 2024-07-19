const move = require('./move');

/* This function calculates the path of the elevator based on the requests and the state of the elevator.
  *
  * requests - Array of requests.
  * state - State of the elevator. (0 to 7)
  * 
  *
  * Returns an array with the path of the elevator.
  */

function calculatePath(requests, state) {

  let elevatorPath = [];

  const halfOfRequests = Math.round(requests.length / 2);//2

  //Calculate the path for the first elevator
  const { path, leftRequests } = move([], requests, state[0], halfOfRequests);
  // Assign the path to the first elevator
  elevatorPath.push(path);
  
//Calculate the path for the second elevator
  let result = move([], leftRequests, state[1], 1000);
  let path2 = result.path;
  let leftRequests2 = result.leftRequests;

  //If there are still requests left, the second elevator will collect them
  if (leftRequests2.length > 0) {
    
    result = move(path2, leftRequests2, path2[path2.length - 1], 1000);
    path2 = result.path;
    leftRequests2 = result.leftRequests;
  }

  // Assign the path to the second elevator
  elevatorPath.push(path2);

	return elevatorPath; // Returns the path of the elevator
}


module.exports = calculatePath;