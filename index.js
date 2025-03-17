const express = require("express");
const {response, request} = require("express");
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
    response.send(pessoas);
});

app.get('/pessoas/:id', (request, response)=>{
    for (let i = 0; i <= pessoas.length; i++) {
        if (pessoas[i].id === request.params.id) {
            return response.send(`Nome: ${pessoas[i].nome}, Idade: ${pessoas[i].idade}`);
        }
    }
    response.send("Usuário não encontrado");
});

app.post('/pessoas', (request, response) =>{
    if(request.body !== undefined){
        for (let i = 0; i <= pessoas.length; i++) {
            if(request.body.id !== pessoas[i].id){
                pessoas.push(request.body);
                return response.json({pessoas});
            }
            return response.send("Este usuário já existe");
        }
    }
    return response.send("Sem dados para adicionar");
});

app.put('/pessoas/:id', (request, response)=>{
    for (let i = 0; i <= pessoas.length; i++) {
        if (pessoas[i].id === request.params.id) {
            pessoas[i].nome = request.body.nome;
            return response.send(`Nome: ${pessoas[i].nome}, Idade: ${pessoas[i].idade}`);
        }
    }
    return response.send("Usuário não encontrado");
});

app.delete('/pessoas/:id', (request, response)=>{
    for (let i = 0; i <= pessoas.length; i++) {
        if (pessoas[i].id === request.params.id) {
            delete pessoas[i];
            return response.json({pessoas});
        }
        return response.send("Usuário não encontrado");
    }
});