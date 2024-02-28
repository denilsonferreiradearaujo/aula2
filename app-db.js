// Import do framework express
const express = require("express");
const app = express();
app.use(express.json());

// Realizando consultas no Banco de dados tabela clientes
app.get ("/clientes", async (req, res) =>{
    const clientes = await selectCliente();
    return res.json(clientes);
})


// Conexão com o Banco de dados _______________________________________________________________________________
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
    console.log("Conectou no my SQL");
    global.connection = con;
    return con;
};

// Selecionando todos os registro da tabela clientes
async function selectCliente() {
    const conn = await connect();
    const [rows] = await conn.query('select * from clientes;');
    return rows;
};



// Inicia o servidor na porta informada
app.listen(3000, ()=>{
    console.log("Servidor respondendo no porta 3000")
});
