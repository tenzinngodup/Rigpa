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

function highlightSelectedBlock () {
    // TODO Filter only selections
  
    // Get Node where selection starts
    let elementWhereSelectionStart = window.getSelection().anchorNode
  
    // TODO Get Node where selection ends with Selection.focusNode()
    // TODO Get Nodes in between start and end of selection
    console.log(elementWhereSelectionStart);
    // I've hardcoded finding closest block element for a simplicity
    let closestBlockElement = elementWhereSelectionStart.parentNode
  
    // Add non disturbing border to selected elements
    // For simplicity I've adding outline only for the start element
    closestBlockElement.style.outline = '1px solid blue'

    let selected_Text = window.getSelection().toString();

    readTextFile("./index.html");

    var reader = new FileReader();
    content = reader.readAsText("./index.html");
    console.log(content);
    
    // TODO Clear outline on some event: saving selection, ending selection etc
    // setTimeout(() => { closestBlockElement.style.outline = 'none' }, 2000)
  }
  
  function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
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