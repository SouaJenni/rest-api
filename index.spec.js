const request = require("supertest");
const app = require('./server.js');

const pessoas = [
    { nome: "João", idade: 37, id: "1" },
    { nome: "Marcos", idade: 83, id: "2" },
    { nome: "Claudia", idade: 45, id: "3" },
    { nome: "Eliza", idade: 23, id: "4" },
    { nome: "Lola", idade: 19, id: "5" }
];

describe('My first test', ()=>{
    it('should check if get people', async ()=>{
        const response = await request(app).get('/pessoas');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            { nome: "João", idade: 37, id: "1" },
            { nome: "Marcos", idade: 83, id: "2" },
            { nome: "Claudia", idade: 45, id: "3" },
            { nome: "Eliza", idade: 23, id: "4" },
            { nome: "Lola", idade: 19, id: "5" }
        ])
    })
    it('should get an empty object', async ()=>{
        const response = await request(app).get('/pessoas/:id');
        expect(response.body).toEqual({});
        expect(response.statusCode).toEqual(404);
    })
    it('should get person by id', async ()=>{
        const response = await request(app).get('/pessoas/2');
        expect(response.body).toEqual({ nome: "Marcos", idade: 83, id: "2" });
        expect(response.statusCode).toEqual(200);
    })
    it('should check if create a person', async ()=>{
        const response = await request(app).post('/pessoas').send({ nome: "Augusto", idade: 22, id: "6"})
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual([
            { nome: "João", idade: 37, id: "1" },
            { nome: "Marcos", idade: 83, id: "2" },
            { nome: "Claudia", idade: 45, id: "3" },
            { nome: "Eliza", idade: 23, id: "4" },
            { nome: "Lola", idade: 19, id: "5" },
            { nome: "Augusto", idade: 22, id: "6"}
        ]);
    })
    it('should check if user is undefined', async ()=>{
        const response = await request(app).post('/pessoas').send(undefined);
        expect(response.body).toEqual("Sem dados para adicionar");
        expect(response.statusCode).toEqual(400);
    })
});