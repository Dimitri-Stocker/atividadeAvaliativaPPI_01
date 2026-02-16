import express from 'express';

const host = 'localhost';
const porta = 3000;




const server = express(); //oferecendo ao desenvolvedor um servidor HTTP de modo expresso


//recheando o servidor com funcionalidades

server.get('/', (requisicao, resposta) => {
    resposta.send(`
        <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Atividade avaliativa 1 - Node, Express, HTTP</title>
        </head>

        <body>
            <h1>Cálculo de Reajuste Salarial</h1>
            <h2>Olá, mundo! </h2>
        </body>

        </html>
    `)
});




server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
})