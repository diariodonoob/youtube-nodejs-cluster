const express = require('express')
const cluster = require('cluster')
const numCpu = require('os').cpus().length


if (cluster.isMaster) {
    for(let i=0; i < numCpu; i++) {
        const worker = cluster.fork();
        worker.send(`Olá sou o master esse é meu id ${worker.id}`)
        worker.on('message', (msg) => console.log(`Mensagem do worker ${msg}`))
    }
} else {
    cluster.worker.on('message', (msg) => console.log(`Aqui é a mensagem do master recebendo no worker: ${msg}`))
    process.send(`Olá master, eu sou worker ${cluster.worker.id}`)
}

