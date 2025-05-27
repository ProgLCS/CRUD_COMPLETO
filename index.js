const express = require('express')
const mysql = require('mysql2')

const app = express()

app.use(express.json())

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'loja'
})
// PARTE DE PRODUTOS
app.post('/produtos', (req, res) => {
    const  {nome, preco, quantidade}= req.body
   

    conexao.query(
        'INSERT INTO produtos (nome, preco, quantidade) VALUES (?,?,?)',
        [
            nome,
            preco, 
            quantidade, 
        ],
        () => {
            res.status(201).send('Consulta cadastrada com sucesso!')
    })
})


app.get('/produtos', (req, res) => {
    conexao.query('SELECT * FROM  produtos', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscas produtos')
        }
        
        res.status(200).send(results)
    })
})


app.delete('/produtos/:id', (req, res)=>{
    const {id}= req.params;
    conexao.query('DELETE FROM produtos WHERE id = ?', [id],(err, results)=>{
        if(err){
            return res.status(500).send(' Erro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send( 'Produto não encontrado');
        }
        
        res.status(200).send('Produto deletado com sucesso');
    });
    
});


app.put('/produtos/:id', (req, res)=>{
    const { id } = req.params;
    const{nome, preco, quantidade}= req.body;
    
    const query = 'UPDATE produtos SET NOME = ?, preco = ?, quantidade= ? where id= ?';
    conexao.query(query, [nome, preco,quantidade, id], (err, results)=>{
        if(err) {
            return res.status(500).send('Erro ao atualizar');
        }
        
        if ( results.affectedRows === 0){
            return res.status(404).send('Produto não encontrado');
        } 
        
        res.send('Produto atualizado com sucesso');
    });
});
// PARTE DE FUNCIONARIOS
app.post('/funcionarios', (req, res) => {
    const {nome, funcao, salario}= req.body
   

    conexao.query(
        'INSERT INTO funcionarios (nome, funcao, salario) VALUES (?,?,?)',
        [
            nome,
            funcao, 
            salario, 
        ],
        () => {
            res.status(201).send('Consulta de Funcionário cadastrada com sucesso!')
    })
})


app.get('/funcionarios', (req, res) => {
    conexao.query('SELECT * FROM  funcionarios', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscar funcionario')
        }
        
        res.status(200).send(results)
    })
})

app.delete('/funcionarios/:id', (req, res)=>{
    const {id}= req.params;
    conexao.query('DELETE FROM funcionarios WHERE id = ?', [id],(err, results)=>{
        if(err){
            return res.status(500).send(' Erro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send( 'Funcionário não encontrado');
        }
        
        res.status(200).send('Funcionário deletado com sucesso');
    });
    
});

app.put('/funcionarios/:id', (req, res)=>{
    const { id } = req.params;
    const{nome, funcao, salario}= req.body;
    
    const query = 'UPDATE funcionarios SET nome = ?, funcao = ?, salario= ? where id= ?';
    conexao.query(query, [nome, funcao ,salario, id], (err, results)=>{
        if(err) {
            return res.status(500).send('Erro ao atualizar');
        }
        
        if ( results.affectedRows === 0){
            return res.status(404).send('Funcionário não encontrado');
        } 
        
        res.send('Produto atualizado com sucesso');
    });
});

app.listen(3000, () => {
    console.log("Servidor backend rodando em http://localhost:3000")
})