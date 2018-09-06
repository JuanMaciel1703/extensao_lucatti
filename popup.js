chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    chrome.storage.local.get(['produtos'], function(items) {
      message.innerHTML = "<h1>Dados coletados com sucesso!</h1>";
      txtStringJson.value = items.produtos;
      var qtdProdutos = JSON.parse(items.produtos).length;
      navigator.clipboard.writeText(items.produtos);
      chrome.browserAction.setBadgeText({text: qtdProdutos.toString()});
    });
  }
});

chrome.runtime.onMessage.addListener(function(request, sender) {
  document.querySelector("#btnLimpar").addEventListener("click", function(){
      if(confirm("Deseja Realmente limpar a lista de produtos")){
        chrome.storage.local.remove(['produtos'], function(items) {
          txtStringJson.value = "";
          chrome.browserAction.setBadgeText({text: '0'});
         });
      }
      return;
  });
});

function onWindowLoad() {

  var message = document.querySelector('#message');
  var txtStringJson = document.querySelector('#txtStringJson');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

  chrome.tabs.executeScript(null, {
    file: "controles.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;
