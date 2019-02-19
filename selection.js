// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     if (request.method == "getSelection"){
//         sendResponse({data: window.getSelection().toString()});
//         console.log(window.getSelection().toString());
//     }
//     else{
//         sendResponse({}); // snub them.
//     }
//   });
function highlightText(element) {
  var nodes = element.childNodes;
  for (var i = 0, l = nodes.length; i < l; i++) {
    if (nodes[i].nodeType === 3) {


     // Node Type 3 is a text node
      var text = nodes[i].innerHTML;
      nodes[i].innerHTML = "<span style='background-color:#FFEA0'>" + text + "</span>";
    }
    else if (nodes[i].childNodes.length > 0) {
      highlightText(nodes[i]);  // Not a text node or leaf, so check it's children
    }
  }
}

function createElementFromHTML(htmlString) {
var div = document.createElement('div');
div.innerHTML = htmlString.trim();

// Change this to div.childNodes to support multiple top-level nodes
return div.firstChild; 
}

function highlightSelectedBlock () {
  // TODO Filter only selections

  // Get Node where selection starts
  let elementWhereSelectionStart = window.getSelection().anchorNode

  let elementWhereSelectionStartRange = window.getSelection().getRangeAt(0);

  // TODO Get Node where selection ends with Selection.focusNode()
  // TODO Get Nodes in between start and end of selection
  // I've hardcoded finding closest block element for a simplicity
  let closestBlockElement = elementWhereSelectionStart.parentNode

  // Add non disturbing border to selected elements
  // For simplicity I've adding outline only for the start element
  closestBlockElement.style.outline = '1px solid blue'

  let selected_Text = window.getSelection().toString();
   var url = chrome.runtime.getURL("tib_eng.csv");
   var url_tib = chrome.runtime.getURL("data/DICT.csv");


  $.get(url_tib, function(data) {
    let lookup_table = $.csv.toObjects(data);
    let array_result = "none";
    let result = lookup_table.forEach(element => {
      if(element.term == selected_Text) {
        array_result = element.definition
        return element;
      }
      console.log(SYLLABLELIST[element.term]);
    });

    elementWhereSelectionStartRange.insertNode(createElementFromHTML('<span style="font-weight:bold;">'+ array_result+'</span>'))
    console.log(array_result);
  });
  
  // TODO Clear outline on some event: saving selection, ending selection etc
  // setTimeout(() => { closestBlockElement.style.outline = 'none' }, 2000)
}


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("onmessage");
  if (request.highlight === true) {
    highlightText(document.body);
    highlightSelectedBlock();
  //   console.log(document.body);
    sendResponse({messageStatus: "received"});
  }
});
