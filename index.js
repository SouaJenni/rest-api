const express = require("express");
const app = express();
const porta = 3000;

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta 3000");
});

app.get('/', (requisicao, resposta)=>{
    resposta.send("Olá, mundo!");
});

app.get('/abacaxi', (requisicao, resposta)=>{
    console.log(requisicao);
    resposta.send(`Olá, ${requisicao.query.nome}`);
});

app.get('/saudacao', (requisicao, resposta)=>{
    console.log(requisicao);
    if(requisicao.query.nome === "" || requisicao.query.nome === null || requisicao.query.nome === undefined){
        resposta.send(`Olá, estranho!`);
    }else {
        resposta.send(`Olá, ${requisicao.query.nome}!`);
    }
});