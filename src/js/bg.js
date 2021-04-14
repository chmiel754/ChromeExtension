var connections = {};
var prevused = false;
window.setInterval(function(){ if(prevused==false){prevused=true;}else{prevused=false;} }, 60000);
chrome.runtime.onConnect.addListener(function (port) {

    var extensionListener = function (message, sender, sendResponse) {

        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
            connections[message.tabId] = port;
            return;
        }

        // other message handling
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
            if (connections[tabs[i]] == port) {
                delete connections[tabs[i]]
                break;
            }
        }
    });
});


chrome.browserAction.onClicked.addListener(function(activeTab)
{
  chrome.windows.create({ url: chrome.runtime.getURL("index.html"), type:
      "popup" });
});

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Messages from content scripts should have sender.tab set
    if(request["text"]=="uid"){sendResponse(localStorage["uid"]+"|"+prevused);}
    if (sender.tab) {
        var tabId = sender.tab.id;
        if (tabId in connections) {
            // console.log('bg script forwards the message');
            connections[tabId].postMessage(request);
        } else {
            console.log("Tab not found in connection list.");
        }
    } else {
        console.log("sender.tab not defined.");
    }
    return true;
});
/******************************************************************************/
// Check for first install
var uid=localStorage["uid"];
function onInstall() {uid_gen();}
function onUpdate() {}
function uid_gen(){
	var buf = new Uint8Array(16), uid = '';
    window.crypto.getRandomValues(buf);
    for (var i=0; i<buf.length; i++)
        uid += (buf[i]<=0xf ? '0': '')+buf[i].toString(16);
        localStorage["uid"]=uid;
}
function getVersion() {
    var details = chrome.runtime.getManifest();
    return details.version;
}
// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['c_ver']
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {onInstall();}
		localStorage['c_ver'] = currVersion;
}
//chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {sendResponse(localStorage["uid"]+"|"+prevused);});
/******************************************************************************/


