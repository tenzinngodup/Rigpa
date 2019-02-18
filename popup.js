// $(function(){
//     $('#paste').click(function(){pasteSelection();});
//   });
//   function pasteSelection() {
//     chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
//     function(tab) {
//       chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
//       function(response){
//         var text = document.getElementById('text'); 
//         text.innerHTML = response.data;
//       });
//     });
//   }

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
  }, function(selection) {
    // alert(selection[0]);
    sendHighlightMessage();
  });

// $(function(){
//     $('#highlight').click(function(){pasteSelection();});
//   });
//   function pasteSelection() {
//       console.log("highted");
//     // chrome.tabs.query({active:true, windowId: chrome.windows.WINDOW_ID_CURRENT}, 
//     // function(tab) {
//     //   chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
//     //   function(response){
//     //     var text = document.getElementById('text'); 
//     //     text.innerHTML = response.data;
//     //   });
//     // });
//   }

// document.getElementById('highlight').addEventListener('click', sendHighlightMessage, false);


function sendHighlightMessage() {
    console.log("sendHighlight");
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      console.log("query");
    chrome.tabs.sendMessage(tabs[0].id, {highlight: true}, function(response) {
      console.log(response);
    });
  });
}

