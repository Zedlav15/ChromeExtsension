const net = require('node:net');
const { send } = require('node:process');
const readline = require('readline-sync')

const server = net.createServer()

server.on('connection', (socket)=>{
    socket.on('data', (data)=>{
        console.log('Mensaje recibido desde el cliente:' + data)
        sendLink()
    })

    socket.on('error',(err)=>{
        console.log(err.message)
    })
})

server.listen(4000, ()=> {
    console.log('servidor esta escuchando en la puerta', server.address().port)
})

function sendLink() {
    var link = readline.question('Ingrese el link del envivo de facebook\t')
    if (line == "0"){
        socket.write('Cierre la extension')
    }else{
        socket.write("El link es el siguiente" + link)
    }
}