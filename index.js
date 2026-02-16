import express from 'express';

const host = 'localhost';
const porta = 3000;

const server = express(); //oferecendo ao desenvolvedor um servidor HTTP de modo expresso

//definir a biblioteca que irá processar os parâmetros da url
server.use(express.urlencoded({extended:true}));

//recheando o servidor com funcionalidades

server.get("/", (requisicao, resposta) => {
    resposta.writeHead(200, {'Content-Type' : 'text/html'});
    resposta.write(`
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
    `);
    resposta.end();

    
});

server.get("/calculoSalario", (requisicao, resposta) => {
     resposta.writeHead(200, {'Content-Type' : 'text/html'});


    //Variáveis de entrada do usuário
    let idade = requisicao.query.idade;
    let sexo = requisicao.query.sexo;
    let salarioBase = +requisicao.query.salarioBase;
    let anoContratacao = requisicao.query.anoContratacao;
    let matricula = requisicao.query.matricula;

    const anoAtual = 2026;

    let reajuste, desconto, acrescimo, novoSalario;

    //Verificando Erros
    if (idade < 16) {
        resposta.write(` <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Erro.</title>
        </head>

        <body>
            <h3>Erro. Idade deve ser maior que 16. </h3>
        </body>
        </html>`);
        resposta.end();
    }

    if (anoContratacao < 1960) {
        resposta.write(` <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Erro.</title>
        </head>

        <body>
            <h3>Erro. O ano de contratação deve ser após 1960. </h3>
        </body>
        </html>`);
        resposta.end();
    }

    if (salarioBase <= 0) {
        resposta.write(` <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Erro.</title>
        </head>

        <body>
            <h3>Erro. O salário deve ser um número válido. </h3>
        </body>
        </html>`);
        resposta.end();
    }

    if (matricula <= 0){
         resposta.write(` <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Erro.</title>
        </head>

        <body>
            <h3>Erro. A matrícula deve ser um número maior que 0. </h3>
        </body>
        </html>`);
        resposta.end();
    }

    //Código de reajuste

    let tempoTrabalhado = anoAtual - anoContratacao;

    if (idade >= 18 && idade < 40) {
        switch(sexo){
            case 'm':case'M': 
                reajuste = (salarioBase * 10) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 10;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 17;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                    
                break;
            
            case 'f':case'F':
                reajuste = (salarioBase * 8) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 11;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 16;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                break;
        }
    }

    else if (idade < 69) {
        switch(sexo){
          case 'm':case'M': 
                reajuste = (salarioBase * 8) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 5;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 15;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                    
                break;
            
            case 'f':case'F':
                reajuste = (salarioBase * 10) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 7;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 14;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                break;
        }
    }

    else if (idade < 99) {
        switch(sexo){
          case 'm':case'M': 
                reajuste = (salarioBase * 15) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 15;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 13;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                    
                break;
            
            case 'f':case'F':
                reajuste = (salarioBase * 17) / 100;
                if (tempoTrabalhado <= 10){
                    desconto = 17;
                    novoSalario = salarioBase + reajuste - desconto;
                }
                else {
                    acrescimo = 12;
                    novoSalario = salarioBase + reajuste + acrescimo;
                }
                break;
        }
    }

    resposta.write(` <DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Salário reajustado</title>
        </head>

        <body>
            <h3>Dados do usuário: </h3>
            <h4>Idade: ${idade}</h4>
            <h4>Sexo: ${sexo}</h4>
            <h4>Salário Base: ${salarioBase}</h4>
            <h4>Ano de Contratação: ${anoContratacao}</h4>
            <h4>Matrícula: ${matricula}</h4>
            <h2>Seu salário reajustado é: R$${novoSalario}</h3>
        </body>
        </html>`);
    resposta.end();
});



server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
})