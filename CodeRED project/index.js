function toggleRoundTrip(){
    var x = document.getElementById("returnDateDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

/**
* The Project ID of your Google Cloud Storage Project.
*/
var PROJECT = 'YOUR_PROJECT_ID';
/**
* Enter a client ID for a web application from the Google Developers
* Console on the "APIs & auth", "Credentials" page. 
* In your Developers Console project add a JavaScript origin
* that corresponds to the domain from where you will be running the
* script. For more info see:
* https://developers.google.com/console/help/new/#generatingoauth2
*/
var clientId = 'YOUR_CLIENT_ID';
/**
 * Enter the API key from the Google Developers Console, by following these
 * steps:
 * 1) Visit https://cloud.google.com/console and select your project
 * 2) Click on "APIs & auth" in the left column and then click “Credentials”
 * 3) Find section "Public API Access" and use the "API key." If sample is
 * being run on localhost then delete all "Referers" and save. Setting
 * should display "Any referer allowed." For more info see:
 * https://developers.google.com/console/help/new/#generatingdevkeys
 */
var apiKey = 'YOUR_API_KEY';
/**
* Constants for request parameters. Fill these values in with your custom
* information.
*/
var API_VERSION = 'v1';
/**
* Enter a unique bucket name to create a new bucket. The guidelines for
* bucket naming can be found here:
* https://developers.google.com/storage/docs/bucketnaming
*/
var BUCKET = 'code-sample-bucket-' + Date.now();
/**
* Get this value from the Developers Console. Click on the 
* “Cloud Storage” service in the Left column and then select 
* “Project Dashboard”. Use one of the Google Cloud Storage group IDs 
* listed and combine with the prefix “group-” to get a string 
* like the example below. 
*/
var GROUP = 
'group-0000000000000000000000000000000000000000000000000000000000000000';
/**
* Valid values are user-userId, user-email, group-groupId, group-email,
* allUsers, allAuthenticatedUsers
*/
var ENTITY = 'allUsers';
/**
* Valid values are READER, OWNER
*/
var ROLE = 'READER';
/**
* Valid values are READER, OWNER
*/
var ROLE_OBJECT = 'READER';
/**
* Google Cloud Storage API request to retrieve the list of buckets in
* your Google Cloud Storage project.
*/
function listBuckets() {
    var request = gapi.client.storage.buckets.list({
    'project': PROJECT
    });
    executeRequest(request, 'listBuckets');
}
/**
* Google Cloud Storage API request to retrieve the list of objects in
* your Google Cloud Storage project.
*/
function listObjects() {
    var request = gapi.client.storage.objects.list({
    'bucket': BUCKET
    });
    executeRequest(request, 'listObjects');
}
/**
* Google Cloud Storage API request to retrieve the access control list on
* a bucket in your Google Cloud Storage project.
*/
function listBucketsAccessControls() {
    var request = gapi.client.storage.bucketAccessControls.list({
        'bucket': BUCKET
    });
    executeRequest(request, 'listBucketsAccessControls');
}
/**
* Google Cloud Storage API request to retrieve the access control list on
* an object in your Google Cloud Storage project.
*/
function listObjectsAccessControls() {
    var request = gapi.client.storage.objectAccessControls.list({
        'bucket': BUCKET,
        'object': object
    });
    executeRequest(request, 'listObjectsAccessControls');
}
/**
* Google Cloud Storage API request to retrieve a bucket in
* your Google Cloud Storage project.
*/
function getBucket() {
    var request = gapi.client.storage.buckets.get({
    'bucket': BUCKET
    });
    executeRequest(request, 'getBucket');
}
/**
* Google Cloud Storage API request to retrieve a bucket's Access Control
* List in your Google Cloud Storage project.
*/
function getBucketAccessControls() {
    var request = gapi.client.storage.bucketAccessControls.get({
    'bucket': BUCKET,
    'entity': GROUP
    });
    executeRequest(request, 'getBucketAccessControls');
}
/**
* Google Cloud Storage API request to retrieve an object's Access Control
* List in your Google Cloud Storage project.
*/
function getObjectAccessControls() {
    var request = gapi.client.storage.objectAccessControls.get({
    'bucket': BUCKET,
    'object': object,
    'entity': GROUP
    });
    executeRequest(request, 'getObjectAccessControls');
}
/**
* Removes the current API result entry in the main-content div, adds the
* results of the entry for your function.
* @param {string} apiRequestName The name of the example API request.
*/
function updateApiResultEntry(apiRequestName) {
    listChildren = document.getElementById('main-content')
    .childNodes;
    if (listChildren.length > 1) {
    listChildren[1].parentNode.removeChild(listChildren[1]);
    }
    if (apiRequestName != 'null') {
    window[apiRequestName].apply(this);
    }
}
/**
* Binds event listeners to handle a newly selected API request.
*/
function addSelectionSwitchingListeners() {
    document.getElementById('api-selection-options')
    .addEventListener('change',
    runSelectedApiRequest, false);
}
/**
* Template for getting JavaScript sample code snippets.
* @param {string} method The name of the Google Cloud Storage request
* @param {string} params The parameters passed to method
*/
function getCodeSnippet(method, params) {
    var objConstruction = "// Declare your parameter object\n";
    objConstruction += "var params = {};";
    objConstruction += "\n\n";
    var param = "// Initialize your parameters \n";
    for (i in params) {
    param += "params['" + i + "'] = ";
    param += JSON.stringify(params[i], null, '\t');
    param += ";";
    param += "\n";
    }
    param += "\n";
    var methodCall = "// Make a request to the Google Cloud Storage API \n";
    methodCall += "var request = gapi.client." + method + "(params);";
    return objConstruction + param + methodCall;
}
/**
* Executes your Google Cloud Storage request object and, subsequently,
* inserts the response into the page.
* @param {string} request A Google Cloud Storage request object issued
*    from the Google Cloud Storage JavaScript client library.
* @param {string} apiRequestName The name of the example API request.
*/
function executeRequest(request, apiRequestName) {
    request.execute(function(resp) {
    console.log(resp);
    var apiRequestNode = document.createElement('div');
    apiRequestNode.id = apiRequestName;
    var apiRequestNodeHeader = document.createElement('h2');
    apiRequestNodeHeader.innerHTML = apiRequestName;
    var apiRequestExplanationNode = document.createElement('div');
    apiRequestExplanationNode.id = apiRequestName + 'RequestExplanation';
    var apiRequestExplanationNodeHeader = document.createElement('h3');
    apiRequestExplanationNodeHeader.innerHTML = 'API Request Explanation';
    apiRequestExplanationNode.appendChild(apiRequestExplanationNodeHeader);
    var apiRequestExplanationEntry = document.createElement('p');
    apiRequestExplanationEntry.innerHTML = 
        listApiRequestExplanations[apiRequestName];
    apiRequestExplanationNode.appendChild(apiRequestExplanationEntry);
    apiRequestNode.appendChild(apiRequestNodeHeader);
    apiRequestNode.appendChild(apiRequestExplanationNode);
    var apiRequestCodeSnippetNode = document.createElement('div');
    apiRequestCodeSnippetNode.id = apiRequestName + 'CodeSnippet';
    var apiRequestCodeSnippetHeader = document.createElement('h3');
    apiRequestCodeSnippetHeader.innerHTML = 'API Request Code Snippet';
    apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetHeader);
    var apiRequestCodeSnippetEntry = document.createElement('pre');
    //If the selected API command is not 'insertObject', pass the request
    //paramaters to the getCodeSnippet method call as 'request.wc.wc.params'
    //else pass request paramaters as 'request.wc.wc' 
    if (apiRequestName != 'insertObject') {
        apiRequestCodeSnippetEntry.innerHTML = 
        getCodeSnippet(request.wc.wc.method, request.wc.wc.params);
        //Selected API Command is not 'insertObject'
        //hide insert object button
        filePicker.style.display = 'none';
    } else {
        apiRequestCodeSnippetEntry.innerHTML = 
        getCodeSnippet(request.wc.wc.method, request.wc.wc);
    }
    apiRequestCodeSnippetNode.appendChild(apiRequestCodeSnippetEntry);
    apiRequestNode.appendChild(apiRequestCodeSnippetNode);
    var apiResponseNode = document.createElement('div');
    apiResponseNode.id = apiRequestName + 'Response';
    var apiResponseHeader = document.createElement('h3');
    apiResponseHeader.innerHTML = 'API Response';
    apiResponseNode.appendChild(apiResponseHeader);
    var apiResponseEntry = document.createElement('pre');
    apiResponseEntry.innerHTML = JSON.stringify(resp, null, ' ');
    apiResponseNode.appendChild(apiResponseEntry);
    apiRequestNode.appendChild(apiResponseNode);
    var content = document.getElementById('main-content');
    content.appendChild(apiRequestNode);
    });
}
/**
* Set required API keys and check authentication status.
*/
function handleClientLoad() {
    gapi.client.setApiKey(apiKey);
    window.setTimeout(checkAuth, 1);
}
/**
* Authorize Google Cloud Storage API.
*/
function checkAuth() {
    gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
    }, handleAuthResult);
}
/**
* Handle authorization.
*/
function handleAuthResult(authResult) {
    var authorizeButton = document.getElementById('authorize-button');
    if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';
    initializeApi();
filePicker.onchange = insertObject;
    } else {
    authorizeButton.style.visibility = '';
    authorizeButton.onclick = handleAuthClick;
    }
}
/**
* Handle authorization click event.
*/
function handleAuthClick(event) {
    gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: false
    }, handleAuthResult);
    return false;
}
/**
* Load the Google Cloud Storage API.
*/
function initializeApi() {
    gapi.client.load('storage', API_VERSION);
}
/**
* Driver for sample application.
*/
$(window)
    .bind('load', function() {
    addSelectionSwitchingListeners();
    handleClientLoad();
});