import mysql from 'mysql2/promise';
import express from 'express';
const app = express();

app.use(express.json());

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'dbapi',
});

connection.connect((err) => {
    if(err){
        console.log('Algo deu errado!');
    }else{
        console.log('Conexão bem sucedida!');
    }
})

app.get ('/pessoas', async (request, response) => {
    console.log('Pegando pessoas');
    try{
        const [results, fields] = await connection.execute('SELECT id, nome, idade FROM Pessoas');
        return response.status(200).send(results);
    }catch (e){
        return response.status(500).send(e);
    }
});

app.get('/pessoas/:id', async (request, response)=>{
    console.log('Pegando pessoa...');
        try{
            const [results, fields] = await connection.execute('SELECT id, nome, idade FROM Pessoas WHERE id = ?',
                [request.params.id]);
            console.log('results', results);
            if(results.length === 0){
                return response.status(404).send({mensagem: "Pessoa não encontrada!"});
            }
            return response.status(200).send(results[0]);
        }catch (e){
            return response.status(500).send(e);
        }
});

app.post('/pessoas', async (request, response) =>{
    console.log('Criando pessoa');
    if(request.body?.nome === undefined || request.body?.idade === undefined){
        return response.status(400).send({mensagem: 'Sem dados para adicionar'});
    }
    try{
        const [results, fields] = await connection.execute('INSERT INTO Pessoas (nome, idade) VALUES (?, ?)',
            [request.body.nome, request.body.idade]);
        if(results.affectedRows === 0){
            return response.status(404).send({mensagem: 'Pessoa não encontrada'});
        }
        const pessoaCriada = {
            id: results.insertId,
            nome: request.body.nome,
            idade: request.body.idade
        };
        return response.status(201).send(pessoaCriada);
    }catch (e){
        return response.status(500).send(e);
    }
});

app.put('/pessoas/:id', async (request, response)=>{
    console.log('Atualizando pessoa');
    if(request.body?.nome === undefined || request.body?.idade === undefined){
        return response.status(400).send({mensagem: 'Sem dados para adicionar'});
    }
    try{
        const [rows] = await connection.execute('SELECT * FROM Pessoas WHERE id = ?', [request.params.id]);
        if (rows.length === 0) {
            return response.status(404).send('Pessoa não encontrada!');
        }
        const [results, fields] = await connection.execute('UPDATE Pessoas SET nome = ?, idade = ? WHERE id = ?',
            [request.body.nome, request.body.idade, request.params.id])
        if(results.changedRows === 0){
            return response.status(400).send({mensagem: 'Erro ao atualizar.'});
        }
        const pessoaEditada = {
            id: request.params.id,
            nome: request.body.nome,
            idade: request.body.idade
        };
        return response.status(200).send(pessoaEditada);
    }catch (e){
        return response.status(500).send(e);
    }
});

app.delete('/pessoas/:id', async (request, response)=>{
    console.log('Deletando pessoa');
    try{
        const [results, fields] = await connection.execute('DELETE FROM Pessoas WHERE id = ?', [request.params.id]);
        if(results.affectedRows === 0){
            return response.status(404).send({mensagem: 'Pessoa não encontrada'});
        }
        return response.status(200).send({mensagem: 'Pessoa deletada com sucesso!'});
    }catch (e){
        return response.status(500).send(e);
    }
});

export default app;