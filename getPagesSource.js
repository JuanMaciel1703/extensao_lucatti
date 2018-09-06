// @author Rob W <http://stackoverflow.com/users/938089/rob-w>
// Demo: var serialized_html = DOMtoString(document);

function adicionaLista(produto){
  var produtos = new Object();

  chrome.storage.local.get(['produtos'], function(items) {
    if(items.produtos){
      var arrProdutos = JSON.parse(items.produtos);

      for(var i = 0; i < arrProdutos.length; i++){
        if(arrProdutos[i].cod == produto.cod){
          return alert("O produto já está na lista.")
        }
      }

      arrProdutos.push(produto);

      chrome.storage.local.set({'produtos': JSON.stringify(arrProdutos)}, function() {
            console.log('Os dados Foram Salvos');
          });

    } else {

      var arrProdutos = new Array();
      arrProdutos.push(produto);

      chrome.storage.local.set({'produtos': JSON.stringify(arrProdutos)}, function() {
            console.log('Os dados Foram Salvos');
          });
    }

    return arrProdutos;
  });
}

function DOMtoString(document_root) {
    // Objeto que receberá os dados dos produtos
    var produto = {};

    //Captura a linha composta pelo Código de Fabricante e o Nome do Produto
    var linhaNomeSku = document_root.querySelector('.product-heading').innerText;

    //Array para separação dos dados de nome e código
    var arrNomeSku = new Array();

    //Separação dos dados em índices da Array
    arrNomeSku = linhaNomeSku.split(" - ");

    //Captura o TH com o conteúdo de texto das Medidas
    var thTags = document.getElementsByTagName("th");
    var searchText = "Altura";
    var nodeAltura;

    for (var i = 0; i < thTags.length; i++) {
      if (thTags[i].textContent == searchText) {
        nodeAltura = thTags[i];
        break;
      }
    }

    var altura = nodeAltura.parentElement.childNodes[3].innerText;

    searchText = "Largura";
    var nodeLargura;

    for (var i = 0; i < thTags.length; i++) {
      if (thTags[i].textContent == searchText) {
        nodeLargura = thTags[i];
        break;
      }
    }

    var largura = nodeLargura.parentElement.childNodes[3].innerText;


    searchText = "Comprimento";
    var nodeComprimento;

    for (var i = 0; i < thTags.length; i++) {
      if (thTags[i].textContent == searchText) {
        nodeComprimento = thTags[i];
        break;
      }
    }

    var comprimento = nodeComprimento.parentElement.childNodes[3].innerText;

    //Captura o TH com o conteúdo de texto Classificação Fiscal-NCM
    var thTags = document.getElementsByTagName("th");
    searchText = "Classificação Fiscal-NCM";
    var found;

    for (var i = 0; i < thTags.length; i++) {
      if (thTags[i].textContent == searchText) {
        found = thTags[i];
        break;
      }
    }


    //Pega o pai do elemento encontrado e em seguida o filho com o código IPI
    var ipi = found.parentElement.childNodes[3].innerText;


    //Seta o objeto de medidas
    var medidas = {
      "altura"      :   altura ? altura.replace(",", "").replace(" mt", "").trim() : null,
      "largura"     :   largura ? largura.replace(",", "").replace(" mt", "").trim() : null,
      "comprimento" :   comprimento ? comprimento.replace(",", "").replace(" mt", "").trim() : null
    }

    produto = {
      "cod"           :   arrNomeSku[0].trim(),
      "nome"          :   arrNomeSku[1].trim(),
      "preco_de"      :   null,
      "preco"         :   null,
      "url_foto"      :   document_root.querySelector('.fotorama__img').src.trim(),
      "link_produto"  :   window.location.href,
      "medidas"       :   medidas,
      "ipi"           :   ipi.trim()
    };

    var priceTag = document_root.querySelector(".prdct-price-tag");

    if(priceTag){
      produto.preco = priceTag.innerText.replace("R$", "");
    } else {
      var productMid = document_root.querySelector(".product-mid").children[1];
      var precoDe = productMid.children[0].children[0].innerText.replace("R$ ", "");

      var precoPor = productMid.children[2].innerText.replace("POR R$ ", "");

      produto.preco = precoPor;
      produto.preco_de = precoDe;
    }

    var stringJson = adicionaLista(produto);

    return stringJson;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
