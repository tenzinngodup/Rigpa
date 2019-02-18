/**
 * Listens for the app launching then creates the window
 *
 * @see http://developer.chrome.com/apps/app.window.html
 */

// chrome.app.runtime.onLaunched.addListener(function() {
//   chrome.app.window.create('popup.html', {
//     id: 'main',
//     bounds: { width: 620, height: 500 }
//   });
// });
console.log(chrome);
// chrome.browserAction.onClicked.addListener(function(tab) {
//     // chrome.storage.sync.set({color: '#3aa757'}, function() {
//     //   console.log("The color is green.");
//     // });

//           console.log("The color is green.");

//     chrome.tabs.create({url:chrome.extension.getURL('index.html')});
//     // chrome.tabs.create( { url: "http://www.facebook.com"} );

//   });