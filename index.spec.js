import request from 'supertest';
import app from './server.js';

const pessoas = [
    { nome: "João", idade: 37, id: "1" },
    { nome: "Marcos", idade: 83, id: "2" },
    { nome: "Claudia", idade: 45, id: "3" },
    { nome: "Eliza", idade: 23, id: "4" },
    { nome: "Lola", idade: 19, id: "5" }
];

describe('My first test', ()=>{
    it('deve checar se está pegando o objeto pessoas', async ()=>{
        const response = await request(app).get('/pessoas');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(pessoas);
    })
    it('deve checar se a mensagem de erro é enviada', async ()=>{
        const response = await request(app).get('/pessoas/:id');
        expect(response.body).toEqual({mensagem: "Pessoa não encontrada"});
        expect(response.statusCode).toEqual(404);
    })
    it('deve retornar a pessoa correspondente ao id', async ()=>{
        const response = await request(app).get('/pessoas/2');
        expect(response.body).toEqual(pessoas[1]);
        expect(response.statusCode).toEqual(200);
    })
    it('deve checar se uma nova pessoa está sendo criada', async ()=>{
        const response = await request(app).post('/pessoas').send({nome: "Augusto", idade: 22, id: "6"});
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([...pessoas,
            { nome: "Augusto", idade: 22, id: "6"}]);
        console.log(response.body);
    })
    it('deve dar erro quando o body estiver vazio', async ()=>{
        const response = await request(app).post('/pessoas').send(undefined);
        expect(response.body).toEqual({mensagem: "Sem dados para adicionar"});
        expect(response.statusCode).toEqual(400);
    })
    it('deve dar erro se o id já está cadastrado', async ()=>{
        const response = await request(app).post('/pessoas').send({nome: "Fernanda", idade: 25, id: "4"});
        expect(response.body).toEqual({mensagem: "Este usuário já existe"});
        expect(response.statusCode).toEqual(400);
    })
    it('deve retornar a pessoa atualizada', async ()=>{
        const response = await request(app).put('/pessoas/3').send({nome: "Mariana", idade: 65});
        expect(response.body).toEqual({nome: "Mariana", idade: 65, id: "3"});
        expect(response.statusCode).toEqual(200);
    })
    it('deve retornar erro se a pessoa não foi encontrada', async ()=>{
        const response = await request(app).put('/pessoas/7');
        expect(response.body).toEqual({mensagem: "Pessoa não encontrada"});
        expect(response.statusCode).toEqual(404);
    })
    it('deve retornar a lista de pessoas sem a pessoa deletada', async ()=>{
        const response = await request(app).delete('/pessoas/3');
        expect(response.body).toEqual([
            { nome: "João", idade: 37, id: "1" },
            { nome: "Marcos", idade: 83, id: "2" },
            { nome: "Eliza", idade: 23, id: "4" },
            { nome: "Lola", idade: 19, id: "5" },
            {nome: "Augusto", idade: 22, id: "6"}
        ]);
        expect(response.statusCode).toEqual(200);
    })
    it('deve dar erro quando a pessoa não é encontrada', async ()=>{
        const response = await request(app).delete('/pessoas/7');
        expect(response.body).toEqual({mensagem: "Pessoa não encontrada"});
        expect(response.statusCode).toEqual(404);
    })
});