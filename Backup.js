var element = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[2]/div/div/div/div[1]/div/div/div[1]/div[1]/div/div/div/div[2]/div/div[3]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                    console.log(element);
                    if (element) {
                      element.click();
                      console.log('Clic en el elemento');
                      setTimeout(function(){
                        var element2 = document.evaluate("/html/body/div[1]/div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div/div[1]/div/div/div/div/div/div/div[2]/div/i/div/i", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                        console.log(element2);
                        if(element2){
                          element2.click();
                          console.log('clic en elemento 2')
                        }else{
                          console.log('Intentando en otro elemento');
                          var element3 = document.querySelector('div[aria-label="Reproducir"] i.x1b0d499.xaj1gnb');
                          console.log(element3);

                          if (element3) {
                            var clicEvent = new Event('click', { bubbles: true, cancelable: true });
                            element3.dispatchEvent(clicEvent);
                            console.log('Clic en elemento 3 con el nuevo clic event');
                          } else {
                            console.error("Error: no se encontró el elemento con la clase y atributos especificados.");
                          }
                        }
                      },3000);
                    } else {
                      console.error("Error: no se encontró elemento con xpath");
                    }