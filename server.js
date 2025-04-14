import mysql from 'mysql2/promise';
import express from 'express';
const app = express();

app.use(express.json());

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'PASSWORD',
    database: 'dbapi',
});

connection.connect((err) => {
    console.log('Conexão bem sucedida!')
})

app.get ('/pessoas', async (request, response) => {
    console.log('Pegando pessoas');
    const [results, fields] = await connection.execute('SELECT id, nome, idade FROM Pessoas');
    console.log(results);
    return response.status(200).send(results);
});

app.get('/pessoas/:id', (request, response)=>{
    console.log('Pegando pessoa...', id);
    const pessoa = pessoas.find((p) => p.id === request.params.id);
    if(pessoa){
        return response.status(200).send(pessoa);
    }
    console.log('Pessoa não encontrada');
    return response.status(404).send({mensagem: 'Pessoa não encontrada'});
});

app.post('/pessoas', (request, response) =>{
    console.log('Criando pessoa');
    if(request.body?.nome === undefined || request.body?.idade === undefined){
        console.log('Sem dados para adicionar');
        return response.status(400).send({mensagem: 'Sem dados para adicionar'});
    }
    pessoas.push({...request.body, id: `${pessoas.length + 1}`});
    return response.status(200).send(pessoas);
});

app.put('/pessoas/:id', (request, response)=>{
    console.log('Atualizando pessoa');
    const pessoa = pessoas.find((p) => p.id === request.params.id);
    if(pessoa){
        Object.assign(pessoa, request.body);
        return response.status(200).send(pessoa);
    }
    console.log('Pessoa não encontrada');
    response.status(404).send({mensagem: 'Pessoa não encontrada'});

});

app.delete('/pessoas/:id', (request, response)=>{
    console.log('Deletando pessoa');
    let index = pessoas.findIndex(pessoa=> pessoa.id === request.params.id);
    if (index !== -1) {
        pessoas.splice(index, 1);
        return response.status(200).send(pessoas);
    }
    console.log('Pessoa não encontrada');
    response.status(404).send({mensagem: 'Pessoa não encontrada'});
});

export default app;