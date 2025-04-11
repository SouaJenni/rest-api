const express = require("express");
const app = express();

app.use(express.json());

const pessoas = [
    { nome: "João", idade: 37, id: "1" },
    { nome: "Marcos", idade: 83, id: "2" },
    { nome: "Claudia", idade: 45, id: "3" },
    { nome: "Eliza", idade: 23, id: "4" },
    { nome: "Lola", idade: 19, id: "5" }
];

app.get('/pessoas', (request, response)=>{
    console.log("Pegando pessoas");
    return response.status(200).send(pessoas);
});

app.get('/pessoas/:id', (request, response)=>{
    console.log("Pegando pessoa ", id);
    const pessoa = pessoas.find((p) => p.id === request.params.id);
    if(pessoa){
        return response.status(200).send(pessoa);
    }
    console.log("Pessoa não encontrada");
    return response.status(404).send({mensagem: "Pessoa não encontrada"});
});

app.post('/pessoas', (request, response) =>{
    console.log("Criando pessoa");
    if(request.body?.nome === undefined || request.body?.idade === undefined || request.body?.id === undefined){
        console.log("Sem dados para adicionar");
        return response.status(400).send({mensagem: "Sem dados para adicionar"});
    }
    for (let i = 0; i < pessoas.length; i++) {
        if(pessoas[i].id === request.body.id) {
            console.log("Este usuário já existe");
            return response.status(400).send({mensagem: "Este usuário já existe"});
        }
    }
    pessoas.push(request.body);
    return response.status(200).send(pessoas);
});

app.put('/pessoas/:id', (request, response)=>{
    console.log("Atualizando pessoa");
    const pessoa = pessoas.find((p) => p.id === request.params.id);
    if(pessoa){
        Object.assign(pessoa, request.body);
        return response.status(200).send(pessoa);
    }
    console.log("Pessoa não encontrada");
    response.status(404).send({mensagem: "Pessoa não encontrada"});

});

app.delete('/pessoas/:id', (request, response)=>{
    console.log("Deletando pessoa");
    let index = pessoas.findIndex(pessoa=> pessoa.id === request.params.id);
    if (index !== -1) {
        pessoas.splice(index, 1);
        return response.status(200).send(pessoas);
    }
    console.log("Pessoa não encontrada");
    response.status(404).send({mensagem: "Pessoa não encontrada"});
});

module.exports = app;