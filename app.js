const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    //teste para verificar se a rota está funcionando

    let i = 0;
    if (i == 0) {
        res.status(200).send("App funcionando").end();
    }else {
        res.status(404).send("Erro").end();
    };
});

app.listen(8080, () => {
    console.log("Servidor respondendo na porta 8080");
});

const cursos = ['React native', 'JavaScript', 'NodeJs'];

// Retorna todos os cursos existentes
app.get("/cursos", async (req, res) => {
    return res.json(cursos);
});

app.get("/cursos/:index", (req, res) => {
    const {index} = req.params;
    console.log('Chegou aqui');
    return res.json(cursos[index]);
});

// Cria um novo cursos
app.post("/cursos", (req, res) => {
    const {nome} = req.body;
    cursos.push(nome);
    console.log(cursos)
    return res.json(cursos);
});

// Update - Atualizando um curso
app.put("/cursos/:index", (req, res) => {
    const {index} = req.params;
    const {nome} = req.body;

    cursos [index] = nome;

    console.log(cursos)
    return res.json(cursos);
});

// Excluindo - excluindo um curso
app.delete("/cursos/:index", (req, res) => {
    const {index} = req.params;

    const cursoDeletado = cursos[index];
    cursos.splice(index, 1)

    console.log(cursos)
    return res.json({message: `Curso de ${cursoDeletado} deletado com sucesso!`})
});