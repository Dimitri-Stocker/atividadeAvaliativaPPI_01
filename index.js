import express from 'express';

const host = 'localhost';
const porta = 3000;

const server = express(); //oferecendo ao desenvolvedor um servidor HTTP de modo expresso

//definir a biblioteca que irá processar os parâmetros da url
server.use(express.urlencoded({extended:true}));

//recheando o servidor com funcionalidades

server.get("/", (requisicao, resposta) => {
    resposta.send(`
        <head> <title> Reajuste Salarial </title> </head>
        <h1>Cálculo de Reajuste Salarial </h1>
        <h2>Para realizar o cálculo do reajuste salarial do funcionário, siga as instruções: </h2>
            <ol>
                <li>No final da URL, insira "/calculoSalario" </li>
                <li>Depois, digite o símbolo "?", digite "idade=" e a idade do funcionário. Ex: idade=20 </li>
                <li>Digite o símbolo "&", e insira o sexo do funcionário. Deve ser M ou F. Ex: sexo=F</li>
                <li>Novamente digite o símbolo "&" e o comando salarioBase. Ex: salarioBase=2000 </li>
                <li>O próximo comando deve ser anoContratacao. Ex: anoContratacao=1998 </li>
                <li>Finalmente, insira a matrícula do funcionário. Ex: matricula=12345 </li>
                <li>A URL completa deverá ficar como no exemplo: "reajuste-salarial.vercel.app/calculoSalario?idade=20&sexo=F&salarioBase=2000&anoContratacao=1998&matricula=12345</li>
            </ol>`);
});

server.get("/calculoSalario", (requisicao, resposta) => {
    //Variáveis de entrada do usuário
    let idade = +requisicao.query.idade;
    let sexo = requisicao.query.sexo;
    let salarioBase = +requisicao.query.salarioBase;
    let anoContratacao = +requisicao.query.anoContratacao;
    let matricula = +requisicao.query.matricula;

    const anoAtual = 2026;

    let reajuste, desconto, acrescimo, novoSalario;

    //Verificando Erros
    if (idade < 16 || isNaN(idade)) {
        resposta.send(`
            <head><title>Erro.</title></head>
            <h3>Erro no campo Idade. Confira se a idade foi inserida e se o valor digitado não é uma letra ou um número menor que 16.</h3>`);
    }

    if (anoContratacao < 1960 || isNaN(anoContratacao)) {
        resposta.send(`
            <head><title>Erro.</title></head>
            <h3>Erro no campo anoContratacao. Confira se o ano de contratação do funcionário foi inserido e se o valor digitado não é uma letra ou uma data menor que 1960. </h3>`);
    }

    if (salarioBase <= 0 || isNaN(salarioBase)) {
        resposta.send(`
             <head><title>Erro.</title></head>
             <h3>Erro no campo salarioBase. Confira se o salário do funcionário foi inserido e se o valor digitado não é uma letra ou um número menor que 0. </h3>`);
    }

    if (matricula <= 0 || isNaN(matricula)){
         resposta.send(`
            <head><title>Erro.</title></head>
             <h3>Erro no campo matricula. Confira se a matrícula do funcionário foi inserida e se o valor digitado não é uma letra ou um número menor que 0. </h3>`);
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

            default: resposta.send(`
                 <head><title>Erro.</title></head>
                <h3>Opção inválida. Sexo deve ser F ou M.</h3>`);
                break;
        }
    }

    else if (idade < 70) {
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

            default: resposta.send(`
                 <head><title>Erro.</title></head>
                <h3>Opção inválida. Sexo deve ser F ou M.</h3>`);
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

            default: resposta.send(`
                 <head><title>Erro.</title></head>
                <h3>Opção inválida. Sexo deve ser F ou M.</h3>`);
                break;
        }
    }

    resposta.send(`
        <head>
            <title>Salário reajustado</title>
        </head>

            <h3>Dados do usuário: </h3>
            <h4>Idade: ${idade}</h4>
            <h4>Sexo: ${sexo}</h4>
            <h4>Salário Base: ${salarioBase}</h4>
            <h4>Ano de Contratação: ${anoContratacao}</h4>
            <h4>Matrícula: ${matricula}</h4>
            <h2>Seu salário reajustado é: R$${novoSalario}</h3>
        `);
    
});

server.listen(porta, host, () => {
    console.log(`Servidor escutando em http://${host}:${porta}`);
})