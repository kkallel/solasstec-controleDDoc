async function connect (){

    if (global.connection)
        return global.connection.connect();

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: process.env.CONNECTION_STRING
    });


    const cliente = await pool.connect();
    console.log("Pool de conexão criado");

    cliente.release();

    global.connection = pool;
    return pool.connect();

}

connect();


async function consultarSetor (id){
    const cliente = await connect();
    const sql = "SELECT * FROM \"Setor\" WHERE ID=$1";
    const res = await cliente.query(sql, [id]);
    return res.rows;
}

async function cadastrarSetor (setor){
    const cliente = await connect();
    const sql = "INSERT INTO \"Setor\" (\"sigla\", \"descSetor\") VALUES ($1, $2)";
    const valores = [setor.sigla, setor.descSetor];
    await cliente.query(sql, valores);
}

async function atualizarSetor (id, setor){
    const cliente = await connect();
    const sql = "UPDATE \"Setor\" SET sigla=$1, \"descSetor\"=$2 WHERE id=$3";
    const valores = [setor.sigla, setor.descSetor, id];
    await cliente.query(sql, valores);
}

async function deletarSetor (id){
    const cliente = await connect();
    const sql = "DELETE FROM \"Setor\" WHERE id=$1";
    const valores = [id];
    await cliente.query(sql, valores);
}

async function listarSetor (){
    const cliente = await connect();
    const sql = "SELECT * FROM \"Setor\"";
    const res = await cliente.query(sql);
    return res.rows;
}

async function cadastrarDocumento (documento){
    const cliente = await connect();
    const sql = "INSERT INTO \"Documento\" (\"nroDocumento\", titulo, \"descDocumento\", \"dataDocumento\", \"pathArquivoPDF\", \"tipoDocumento_id\") VALUES ($1, $2, $3, $4, $5, $6)";
    const valores = [documento.nroDocumento, documento.titulo, documento.descDocumento, documento.dataDocumento, documento.pathArquivoPDF, documento.tipoDocumento_id];
    await cliente.query(sql, valores);
}

async function consultarDocumento (id){
    const cliente = await connect();
    const sql = "SELECT * FROM \"Documento\" WHERE ID=$1";
    const res = await cliente.query(sql, [id]);
    return res.rows;
}

async function listarDocumento (){
    const cliente = await connect();
    const sql = "SELECT * FROM \"Documento\"";
    const res = await cliente.query(sql);
    return res.rows;
}

async function atualizarDocumento (id, documento){
    const cliente = await connect();
    const sql = "UPDATE \"Documento\" SET \"nroDocumento\"=$1 , titulo=$2, \"descDocumento\"=$3, \"dataDocumento\"=$4, \"pathArquivoPDF\"=$5, \"tipoDocumento_id\"=$6 WHERE id=$7";
    const valores = [documento.nroDocumento, documento.titulo, documento.descDocumento, documento.dataDocumento, documento.pathArquivoPDF, documento.tipoDocumento_id, id];
    await cliente.query(sql, valores);
}

async function deletarDocumento (id){
    const cliente = await connect();
    const sql = "DELETE FROM \"Documento\" WHERE id=$1";
    const valores = [id];
    await cliente.query(sql, valores);
}

async function enviarDocumento (tramitacaoDoc){
    const cliente = await connect();
   
    const res = await cliente.query("select now()");
    const horaEnvio = res.rows[0].now;
    
    const sql = "INSERT INTO \"TramitacaoDocumento\" (documento_id, setor_envio_id, \"dataHoraEnvio\") VALUES ($1, $2, $3)";
    const valores = [tramitacaoDoc.documento_id, tramitacaoDoc.setor_envio_id, horaEnvio];
    await cliente.query(sql, valores);
}

async function receberDocumento (tramitacaoDoc){
    const cliente = await connect();
   
    const res = await cliente.query("select now()");
    const data = res.rows[0].now;
    
    const sql = "INSERT INTO \"TramitacaoDocumento\" (documento_id, setor_envio_id, \"dataHoraEnvio\", setor_recebe_id, \"dataHoraRecebimento\") VALUES ($1, $2, $3, $4, $5)";
    const valores = [tramitacaoDoc.documento_id, tramitacaoDoc.setor_envio_id, data, tramitacaoDoc.setor_recebe_id, data];
    await cliente.query(sql, valores);
}

async function listarTramitacaoDocumento (){
    const cliente = await connect();
    const sql = "SELECT * FROM \"TramitacaoDocumento\"";
    const res = await cliente.query(sql);
    return res.rows;
}

module.exports = {
    listarSetor,
    consultarSetor,
    cadastrarSetor,
    atualizarSetor,
    deletarSetor,
    cadastrarDocumento,
    consultarDocumento,
    listarDocumento,
    atualizarDocumento,
    deletarDocumento,
    enviarDocumento,
    receberDocumento,
    listarTramitacaoDocumento
}