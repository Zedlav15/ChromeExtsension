const net = require('node:net');

const options = {
    port: 4000,
    host: '127.0.0.1'
}

const client = net.createConnection(options)

client.on('connect', ()=>{
    console.log('Conexion exitosa')
    client.write('Este es un mensaje para el servidor')
})

client.on('error', (err)=>{
    console.log(err.message)
})