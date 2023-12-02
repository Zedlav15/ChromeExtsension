// background.js

  // Realizar la solicitud al servidor para establecer la conexión
  fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(data => {
      const linkR = data.link;
      console.log(linkR);
      // Obtener la pestaña actual
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        // Actualizar la pestaña con la nueva URL
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: url => { window.location.href = url; },
          args: [linkR]
        }, function() {
          console.log('Enlace abierto en la pestaña actual:', linkR);
        });
      });
    })
    .catch(error => {
      console.error('Error al conectar con el servidor:', error);
    });
