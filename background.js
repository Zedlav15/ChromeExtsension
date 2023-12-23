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

        chrome.tabs.query({}, function(tabs) {
          for (let i = 0; i < tabs.length; i++) {
            chrome.tabs.update(tabs[i].id, { url: newLink }, function() {
              console.log('Enlace abierto en la pestaña:', tabs[i].id);
              setTimeout(function() {
                if(processFBOpt === "1"){
                  chrome.tabs.executeScript(tabs[i].id, {
                    code: `
                    console.log("Entro en el modo de envivo");
                    var element = document.evaluate("//div[@role='presentation']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    console.log(element);
                    if (element) {
                      element.click();
                      console.log('Clic en el elemento');
                    } else {
                      console.error("Error: no se encontró elemento con xpath");
                    }
                    `
                  });
                }else if(processFBOpt === "2"){
                  chrome.tabs.executeScript(tabs[i].id, {
                    code: `
                    console.log("Entro en el modo de reproduccion");
                    var element3 = document.querySelector('.x1ey2m1c.x10l6tqk.x1d8287x.x6o7n8i.xl405pv.xh8yej3.x11uqc5h.x6s0dn4.xzt5al7.x78zum5.x1q0g3np');
                    console.log(element3);
  
                    if (element3) {
                      var clicEvent = new Event('click', { bubbles: true, cancelable: true });
                      element3.dispatchEvent(clicEvent);
                      console.log('Clic en elemento 3 con el nuevo clic event');
                    } else {
                      console.error("Error: no se encontró el elemento con la clase y atributos especificados.");
                    }
                    `
                  });
                } else{
                  console.log("Error al obtener el proceso");
                }
              }, 9000);
            });
          }
        });

        previousLink = newLink;
      } else {
        console.log('El enlace no ha cambiado. No se realizaron acciones.');
      }
    })
    .catch(error => {
      console.error('Error al conectar con el servidor:', error);
    });
}

// Comprobar el enlace cada minuto (60,000 milisegundos)
setInterval(comprobarEnlace, 60000);

// #mount_0_0_Yx > div > div:nth-child(1) > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x78zum5.xdt5ytf.x1t2pt76 > div > div > div.x78zum5.xdt5ytf.x1iyjqo2.x1gvwcb.x1qjc9v5.xl56j7k > div > div > div > div > div > div > div:nth-child(2) > div > div.x1ey2m1c.x10l6tqk.x1d8287x.x6o7n8i.xl405pv.xh8yej3.x11uqc5h.x6s0dn4.xzt5al7.x78zum5.x1q0g3np > div:nth-child(2) > span > span > span > div