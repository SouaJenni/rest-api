const express = require("express");
const app = express();
const porta = 3000;

app.use(express.json());

app.listen(porta, ()=>{
    console.log("Servidor rodando na porta 3000");
});

const pessoas = [
    { nome: "João", idade: 37, id: "1" },
    { nome: "Marcos", idade: 83, id: "2" },
    { nome: "Claudia", idade: 45, id: "3" },
    { nome: "Eliza", idade: 23, id: "4" },
    { nome: "Lola", idade: 19, id: "5" }
];

app.get('/pessoas', (request, response)=>{
    return response.status(200).send(pessoas);
});

app.get('/pessoas/:id', (request, response)=>{
    pessoas.find((p) => {
        if(p.id === request.params.id){
            return response.status(200).send(p);
        }
    });
    return response.status(404).send("Pessoa não encontrada.");
});

app.post('/pessoas', (request, response) =>{
    if(request.body === undefined){
        return response.send("Sem dados para adicionar");
    }
    for (let i = 0; i < pessoas.length; i++) {
        if(pessoas[i].id === request.body.id) {
            return response.send("Este usuário já existe");
        }
    }
    pessoas.push(request.body);
    return response.status(200).send(pessoas);
});

app.put('/pessoas/:id', (request, response)=>{
    pessoas.find((p) => {
        if (p.id === request.params.id) {
            p = {...p, ...request.body};
            return response.status(200).send(p);
        } else {
            return false;
        }
    });
    response.status(404).send("Pessoa não encontrada.");
});

app.delete('/pessoas/:id', (request, response)=>{
    let index = pessoas.findIndex(pessoa=> pessoa.id === request.params.id)
    if (index !== -1) {
        pessoas.splice(index, 1);
        return response.status(200).send(pessoas);
    }
    response.status(404).send("Pessoa não encontrada.");
});