require("dotenv").config();

const bd = require("./basededados");
const port = process.env.port;
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        msg: "Home Controle de Envio de Documento"
    })
})

app.get("/setores", async (req, res) => {
    const cliente = await bd.listarSetor();
    res.json(cliente);
})

app.get("/setores/:id", async (req, res) => {
    const cliente = await bd.consultarSetor(req.params.id);
    res.json(cliente);
})

app.post("/setores", async (req, res) => {
    await bd.cadastrarSetor(req.body);
    res.sendStatus(201);
})

app.patch("/setores/:id", async (req, res) => {
    await bd.atualizarSetor(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/setores/:id", async (req, res) => {
    await bd.deletarSetor(req.params.id);
    res.sendStatus(204);
})


app.post("/documentos", async (req, res) => {
    await bd.cadastrarDocumento(req.body);
    res.sendStatus(201);
})

app.get("/documentos/:id", async (req, res) => {
    const cliente = await bd.consultarDocumento(req.params.id);
    res.json(cliente);
})

app.get("/documentos", async (req, res) => {
    const cliente = await bd.listarDocumento();
    res.json(cliente);
})

app.patch("/documentos/:id", async (req, res) => {
    await bd.atualizarDocumento(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/documentos/:id", async (req, res) => {
    await bd.deletarDocumento(req.params.id);
    res.sendStatus(204);
})

app.post("/enviarDocumento/", async (req, res) => {
    await bd.enviarDocumento(req.body);
    res.sendStatus(201);
})

app.post("/receberDocumento/", async (req, res) => {
    if (req.body.setor_envio_id != req.body.setor_recebe_id & req.body.setor_envio_id != null){
        await bd.receberDocumento(req.body);
        res.sendStatus(201);
    }else{
        res.sendStatus(400);
    }
    
})

app.get("/tramitacaoDocumento", async (req, res) => {
    const cliente = await bd.listarTramitacaoDocumento();
    res.json(cliente);
})

//Em desenvolvimento a validação antes de enviar um documento
app.post("/enviarDocumentoRegra/", async (req, res) => {
    cliente = await bd.enviarDocumentoRegra(req.body);
    if (cliente = true){
        res.sendStatus(201);
    }else {
        res.sendStatus(400);
    }
})

app.listen(port);

console.log("Backend OK");