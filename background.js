// background.js

let previousLink = null;

function hacerClicConXPath(xpath) {
  var elemento = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  console.log(elemento);
  return elemento;
}

function comprobarEnlace() {
  fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => {
      const newLink = data.link;
      const processFBOpt = data.processFB;

      if (previousLink !== newLink) {
        console.log('Enlace anterior:', previousLink);
        console.log('Nuevo enlace:', newLink);
        console.log()
        console.log(typeof processFBOpt);

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          const currentTab = tabs[0];
          chrome.tabs.update(currentTab.id, { url: newLink }, function() {
            console.log('Enlace abierto en la pestaña:', currentTab.id);
            setTimeout(function() {
              if(processFBOpt === "1"){
                if(newLink.includes('/share')){
                  chrome.tabs.executeScript(currentTab.id, {
                    code: `
                    console.log("Entro en el modo de reproduccion con /share");
                    var elementShare = document.evaluate("//div[@role='presentation']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    console.log(elementShare);
                    document.elementFromPoint(400,400).click();
                    console.log('Clic en el punto 400, 400');
                    `
                  });
                }else if(newLink.includes('fb.watch')){
                  chrome.tabs.executeScript(currentTab.id, {
                    code: `
                    console.log("Entro en el modo de reproduccion con fb.watch");
                    var elementPause = document.evaluate("//div[@role='presentation']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    console.log(elementPause);
                    if(elementPause){
                      elementPause.click();
                      console.log('Clic en elemento');
                    }else{
                      console.log('No se encontró elemento');
                    }
                    `
                  });
                }else if(newLink.includes('/videos')){
                  chrome.tabs.executeScript(currentTab.id, {
                    code: `
                    setTimeout(function() {
                      var elementPause = document.evaluate("//div[@role='presentation']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                      console.log(elementPause);
                      if(elementPause){
                        elementPause.click();
                        console.log('Clic en elemento');
                      }else{
                        console.log('No se encontró elemento');
                      }
                    },15000);
                    `
                  });
                }
              } else if(processFBOpt === "2"){
                chrome.tabs.executeScript(currentTab.id, {
                  code:`
                  console.log("Entro en el modo me gusta");
                  do{
                    var elementLike = document.querySelector('.x9f619.x1n2onr6.x1ja2u2z.x78zum5.x1r8uery.x1iyjqo2.xs83m0k.xeuugli.xl56j7k.x6s0dn4.xozqiw3.x1q0g3np.xn6708d.x1ye3gou.xexx8yu.xcud41i.x139jcc6.x4cne27.xifccgj.xn3w4p2.xuxw1ft');
                    console.log(elementLike);
                    if(elementLike){
                      elementLike.click();
                      console.log('El elemento se encontro');
                    }else{
                      console.log("El elemento no fue encontrado se hace scroll hacia abajo");
                      document.documentElement.scrollTop += 100;
                    }
                  }while(!elementLike);
                  console.log('Se termina el proceso');
                  `
                });
              }else if (processFBOpt === "3"){
                chrome.tabs.executeScript(currentTab.id, {
                  code:`
                  console.log("Regresando al muro principal de facebook");
                  `
                });
              }else if(processFBOpt === "4"){
                chrome.tabs.executeScript(currentTab.id, {
                  code:`
                  console.log("Entro en el modo de seguir pagina");
                    var elementFollow = document.querySelector(".x1n2onr6.x1ja2u2z.x78zum5.x2lah0s.xl56j7k.x6s0dn4.xozqiw3.x1q0g3np.xi112ho.x17zwfj4.x585lrc.x1403ito.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.xn6708d.x1ye3gou.xtvsq51.x1r1pt67");
                    console.log(elementFollow);
                    if(elementFollow){
                      elementFollow.click();
                      console.log('Clic en elemento');
                    }else{
                      console.log('No se encontró elemento');
                    }
                  `
                });
              }else{
                console.log("Error al obtener el proceso");
              }
            }, 9000);
          });
        });

        previousLink = newLink;
      } else {
        console.log('El enlace no ha cambiado o cuenta suspendida. No se realizaron acciones.');
      }
    })
    .catch(error => {
      console.error('Error al conectar con el servidor:', error);
    });
}

// Comprobar el enlace cada minuto (60,000 milisegundos)
setInterval(comprobarEnlace, 60000);

//document.querySelector('.x1ey2m1c.x9f619.xds687c.x10l6tqk.x17qophe.x13vifvyx1ypdohk');