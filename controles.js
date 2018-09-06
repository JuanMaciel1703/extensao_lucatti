function onLoadScript(document){
  // var body = document.getElementsByTagName("body");
  document.body.innerHtml = "<div id='message'>Coletando Dados...</div>";
  document.body.innerHtml =
    "<button id='btnLimpar' type='button' name='button' style='padding:0.5em; background-color: #e74c3c; border-radius: 5px; color:#fff; border: 1px solid #0001'>Limpar Lista</button>"+
    "<button disabled type='button' name='button' style='padding:0.5em; background-color: #f39c12; border-radius: 5px; color:#fff; border: 1px solid #0001'>Ver Lista</button>"+
    "<button id='btnGerarString' type='button' name='button' style='padding:0.5em; background-color: #27ae60; border-radius: 5px; color:#fff; border: 1px solid #0001'>Gerar JSON String</button>"
  ;


}

chrome.runtime.sendMessage({
    action: "getSource",
    source: onLoadScript(document)
});
