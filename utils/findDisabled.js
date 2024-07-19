/* This function filters the disabled requests and normal requests.
  *
  * requests - Array of requests.
  * 
  *
  * Returns an object with the disabled requests and the normal requests.
  */

function findDisabled(requests) {
    const disabledRequests = requests.filter(req => req.checked === true);

    const filteredRequests = requests.filter(req => req.checked === false);

    return { disabledRequests: disabledRequests, requests: filteredRequests };

}

module.exports = findDisabled;