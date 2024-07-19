const findDisabled = require('./findDisabled');

/* This function moves the elevator based on the requests and the state of the elevator.
  *
  * path - Array with the path of the elevator.
  * requestsParam - Array of requests.
  * state - State of the elevator. (0 to 7)
  * division - Number of requests that the elevator will collect before passing the left requests to the other elevator.
  * 
  *
  * Returns an array with the path of the elevator.
  */


function move(path, requestsParam, state, division) {
	
	let { disabledRequests, requests } = findDisabled(requestsParam);
	
	let collectedRequests = [];
	let disabledCollectedRequests = [];
	let leftRequests = [];

	let weight = 0;
	let counter = 0;
	let doorsOpened = false;
	let disabledCompleted = disabledRequests.length < 1;

	const maxWeight = 900;
	
	

	//Variable to check if the elevator is moving up (true) or down (false)
	let moving;
	
	//Variable to store the first request
	let firstRequest;
	firstRequest = requestsParam.find(req => req.checked === true);
	if (!firstRequest) {
		firstRequest = requestsParam[0];
	}
	
	//Variable to store the first floor
	//If the elevator is already on the first request's origin, the elevator will move to the first request's destination
	const firstFloor = firstRequest.origin === state ? firstRequest.destination : firstRequest.origin;

	//Check if the elevator will move up or down based on the first request
	if (firstFloor > state) {
		moving = true;
	} else {
		moving = false;
	}


	let active = true;
	//While there are still requests to be processed the elevator will move up and down
	while (active) {
			
		let i = state;

		while (i >= 0 && i <= 7) {

			//If the elevator already collected the half of the requests
			//it will pass the leftRequests to the other elevator
			if (counter >= division && leftRequests.length <= 0) {
				leftRequests = disabledRequests;
				leftRequests = leftRequests.concat(requests);

				disabledRequests = [];
				requests = [];
			}

			//Close the doors
			doorsOpened = false;
			//If there are no disabled requests to be collected the elevator will collect other requests
			disabledCompleted = disabledRequests.length === 0 && disabledCollectedRequests.length === 0;

			//If there are disabled requests to be collected the elevator will collect them first
			//First will drop the requests and then will collect the other requests
			for (let req of disabledCollectedRequests) {
				if (req.destination === i) {
					weight -= req.weight;
					disabledCollectedRequests = disabledCollectedRequests.filter(request => request.id !== req.id);
			
					doorsOpened = true;
					
					if (path[path.length - 1] !== req.destination) {
						path.push(req.destination);
					}
				}
			}
			
			for (let req of disabledRequests) {
				if (req.origin === i) {
					
					//Add request if the weight is less than the maxWeight
					if (weight + req.weight <= maxWeight) {
						
						weight += req.weight;
						disabledCollectedRequests.push(req);
						
						//Open doors to collect other requests in the same floor
						doorsOpened = true;
						
						//Increment the counter of collected requests
						counter++;

						//Add request to path if it's not already there
						if (path[path.length - 1] !== req.origin) {
							path.push(req.origin);
						}
					} else {
						//If the request is too heavy it will be added to the leftRequests
						leftRequests.push(req);
					}
					
					//Remove request from disabledRequests
					disabledRequests = disabledRequests.filter(request => request.id !== req.id);
				
				}
			}

			


			//If the elevator was opened for collecting disabled requests or disabled requests 
			//are completed it will collect other requests in the same floor
			if (doorsOpened || disabledCompleted) {

				//First will drop the requests and then will collect the other requests
				for(let req of collectedRequests) {
					if (req.destination === i) {
						weight -= req.weight;

						//Remove request from collectedRequests
						collectedRequests = collectedRequests.filter(request => request.id !== req.id);
	
						//Add request to path if it's not already there
						if (path[path.length - 1] !== req.destination) {
							path.push(req.destination);
						}
					}
				}

				for (let req of requests) {
					if (req.origin === i) {
						
						//Remove request from requests
						requests = requests.filter(request => request.id !== req.id);

						//Add request if the weight is less than the maxWeight
						if (weight + req.weight <= maxWeight) {
							collectedRequests.push(req);
							
							weight += req.weight;

							//Increment the counter of collected requests
							counter++;

							//Add request to path if it's not already there
							if (path[path.length - 1] !== req.origin) {
								path.push(req.origin);
							}
						} else {
							//If the request is too heavy it will be added to the leftRequests
							leftRequests.push(req);
						}
					}
				}

			}





		
			// for (let request of requests) {

			// 		//Check if the origin of the request is the same as the current floor
			// 	if (request.origin === i) {

			// 		//Add request to path if it's not already there
			// 		if (path[path.length - 1] !== request.origin)
			// 			path.push(request.origin);

			// 		//Add request to collectedRequests
			// 		collectedRequests.push(request);

			// 		//Remove request from requests
			// 		requests = requests.filter(req => req !== request);
			// 	};
			// };

			// //Check if there are any collected requests to be processed in the current floor
			// for (let collected of collectedRequests) {

			// 	if (collected.destination === i) {
						
			// 		//Add collected request to path if it's not already there
			// 		if (path[path.length - 1] !== collected.destination) {
			// 			//Add collected request to path
			// 			path.push(collected.destination);
			// 		};

					
			// 		//Remove collected request from collectedRequests
			// 		collectedRequests = collectedRequests.filter(req => req !== collected);
			// 	};
							
			// };

			if (moving) {
				i++;
			} else {
				i--;
			}

		};

		//Change state
		state = moving ? 7 : 0;

		//Change direction
		moving = !moving;

		if (requests.length > 0 || disabledRequests.length > 0 || collectedRequests.length > 0 || disabledCollectedRequests.length > 0) {
			active = true;
			//console.log('still');
		} else {
			active = false;
		}

	};

	return {path, leftRequests};
	
	return [1, 2, 3];
	return [[7,0,2],[0,5,1]];

}

module.exports = move;