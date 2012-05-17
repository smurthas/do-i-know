chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getAccessToken")
      sendResponse({accessToken: localStorage.singly_accessToken});
    else
      sendResponse({}); // snub them.
});
