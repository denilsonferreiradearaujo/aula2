// Import do framework express
const express = require("express");
const app = express();
app.use(express.json());

// Rotas da aplicação _____________________________________________________________________________________________
// Realizando consultas no Banco de dados tabela clientes
app.get ("/clientes", async (req, res) =>{
    const clientes = await selectCliente();
    return res.json(clientes);
});

// Retorna o cliente com base ID informado
app.get ("/clientes/:id", async (req, res) =>{
    const {id} = req.params;
    const cliente = await selectOneCliente(id);
    return res.json(cliente);
});

// Criando um novo cliente no banco de dados
app.post ("/clientes", async (req, res) =>{
    const {nome, idade} = req.body;
    const result = await insertCliente({nome: nome, idade: idade});
    console.log(result);
    const clientes = await selectCliente();
    return res.json(clientes);
});

// Update - Atualizando os dados de um cliente
app.put ("/clientes/:id", async (req, res) =>{
    const {id} = req.params;
    const {nome, idade} = req.body;
    const result2 = await updateCliente(id, {nome: nome, idade: idade});
    console.log(result2);
    const clientes = await selectCliente();
    return res.json(clientes);
});

// Deleta cliente no banco de dados
app.delete ("/clientes/:id", async (req, res) =>{
    const {id} = req.params;
    const result = await deleteCliente(id);
    console.log(clientes);
    return res.status(200).json({message:`Registro excluido com sucesso!`});
});


// Conexão com o Banco de dados _____________________________________________________________________________________
async function connect () {
    if (global.conection && global.conection.state != 'disconnected'){
        return global.conection;
    };
    const mysql2 = require("mysql2/promise");
    const con = await mysql2.createConnection({
        host: 'localhost',
        port: '3306',
        database: 'db_clientes',
        user: 'root',
        password: '1234'
    });
    global.connection = con;
    return con;
};

// Funções ___________________________________________________________________________________________________________
// Selecionando todos os registro da tabela clientes
async function selectCliente() {
    const conn = await connect();
    const [rows] = await conn.query('select * from clientes;');
    return rows;
};

// Selecionando o registro da tabela pelo ID
async function selectOneCliente(id) {
    const conn = await connect();
    const sql = 'SELECT * FROM clientes WHERE id=?;';
    const values = id;
    const [rows] = await conn.query(sql, values);
    return rows;
};

// Inserindo o registro na tabela
async function insertCliente(cliente) {
    const conn = await connect();
    const sql = 'INSERT INTO clientes (nome, idade) VALUES (?,?);';
    const values = [cliente.nome, cliente.idade];
    return await conn.query(sql, values);
};

// Atualizando o registro na tabela
async function updateCliente(id, cliente) {
    const conn = await connect();
    const sql = 'UPDATE clientes SET nome=?, idade=? WHERE id=?';
    const values = [cliente.nome, cliente.idade, id];
    return await conn.query(sql, values);
};

// Excluindo um ID
async function deleteCliente(id){
    const conn = await connect();
    const sql = 'DELETE FROM clientes WHERE id=?;';
    return await conn.query(sql, [id]);
};


// Inicia o servidor na porta informada _____________________________________________________________________________________
app.listen(3000, ()=>{
    console.log("Servidor respondendo no porta 3000")
});


