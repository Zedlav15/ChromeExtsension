document.getElementById("activateButton").addEventListener("click", function() {
    //Se guarda el link a procesar en una variable
    var linkR = document.getElementById("inputLink").value;

    // Obtener la pestaña actual
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // Actualizar la pestaña con la nueva URL
        chrome.tabs.update(tabs[0].id, { url: linkR }, function(tab) {
            // Esperar a que la página se cargue
            chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                if (info.status === 'complete' && tabId === tab.id) {
                    chrome.tabs.onUpdated.removeListener(listener);
                    // Inyectar el script para hacer clic en el botón de "Me gusta"
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: function() {
                            console.log('Intentando ejecutar XPath');
                            var xpath = '//*[contains(@class, "x1o1ewxj x3x9cwd x1e5q0jg x13rtm0m x1ey2m1c xds687c xg01cxk x47corl x10l6tqk x17qophe x13vifvy x1ebt8du x19991ni x1dhq9h x1wpzbip")]'; // Reemplaza "x9f619" con la clase que estás buscando
                            var likeButton = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
                            if (likeButton) {
                                likeButton.click();
                            }
                        },
                    });
                }
            });
        });
    });
});
