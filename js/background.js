chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getAccessToken") {
      console.log("SENDING",localStorage.accessToken);
      sendResponse({accessToken: localStorage.accessToken});      
    }
    else
      sendResponse({}); // snub them.
});
