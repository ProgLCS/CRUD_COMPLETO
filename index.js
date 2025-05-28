const express = require ('express')
const mysql = require ('mysql2')
const app = express()



app.get('/',(req,res)=>{
    res.send("Servidor iniciado, sistema de cadastro de treinamentos pronto!")
})

const treinamento = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'centro_treinamento'
    
})


app.use(express.json())

app.post('/sessoes', (req,res)=>{
    const sessoes={aluno, personal, tipo_treino, data, horario, observacoes}= req.body

    if (!aluno || typeof aluno != 'string' || aluno.trim() == '') {
        return res.status(400).send('Cadastre corretamente o Aluno, preencha todos os campos com as informações correta');
    }

    if (!personal || typeof personal != 'string' || personal.trim() == '') {
        return res.status(400).send('Cadastre corretamente o Personal, preencha todos os campos com as informações correta');
    }
    
    if (!tipo_treino || typeof tipo_treino != 'string' || tipo_treino.trim() == '') {
        return res.status(400).send('Atenção, cadastre o treino corretamente');
    }
    
    if (!data || typeof data != 'string' || data.trim() == '') {
        return res.status(400).send('Atenção, preencha a data corretamente');
    }
    
    if (!horario || typeof horario != 'string' || horario.trim() == '') {
        return res.status(400).send('Atenção, não se esqueça do horário!');
    }



    treinamento.query(
        'INSERT INTO sessoes (aluno,personal,tipo_treino,data,horario,observacoes) VALUE( ?, ?, ?, ?, ?, ?)',
        [sessoes.aluno, sessoes.personal,sessoes.tipo_treino, sessoes.data, sessoes.horario, sessoes.observacoes],
        ()=>{
            res.status(201).send('A sessão foi agendada com sucesso, aguardamos ansiosamente pelo começo!')
        }
    )
})

app.get('/sessoes', (req,res)=>{
    treinamento.query('SELECT * FROM sessoes',(err, results)=>{
        if(err){
            return res.status(500).send('Erro no cadastro');
        }
        res.json(results);
    });
});

app.put('/sessoes/:id', (req, res)=>{
    const { id } = req.params;
    const{aluno, personal, tipo_treino, data, horario, observacoes}= req.body ;

    const query = ' UPDATE sessoes SET aluno= ?, personal= ?, tipo_treino= ?, data= ?, horario= ?, observacoes=? WHERE id=?';
    treinamento.query(query,[aluno, personal, tipo_treino, data, horario, observacoes, id], (err, results)=>{
        if(err){
            return res.status(500).send('Erro na atualização! Verifique os dados novamente.');

        }

        if (results.affectedRows === 0){
            return res.status(404).send('Não encontramos o cadastro desejado');

        }

        res.send ("Cadastro atualizado com sucesso!");
    });


});

app.delete('/sessoes/:id', (req, res)=>{
const {id}= req.params;
    treinamento.query('DELETE FROM sessoes WHERE id = ?',[id],(err,results)=>{
        if (err){
            return res.status (500).sned ('Erro ao deletar');

        }

        if (results.affectedRows === 0) {
            return res.status(404).send('Sessao não encontrada');
        }

        res.status(200).send('Sessão deletada com sucesso!');
    });
});

// PARTE DA ASSINATURA ◙◙◙◙◙

app.post('/assinatura', (req, res) => {
    const  {nome, duracao_meses, preco, descricao}= req.body
   
    if (!nome || typeof nome != 'string' || nome.trim() == '') {
        return res.status(400).send('Cadastre corretamente o nome do aluno , preencha todos os campos com as informações correta');
    }

    if (!duracao_meses || typeof duracao_meses != 'string' || duracao_meses.trim() == '') {
        return res.status(400).send('Cadastre corretamente a duração da assinatura, preencha todos os campos com as informações correta');
    }
    
    if (!preco || typeof preco != 'number' ) {
        return res.status(400).send('Atenção, cadastre o valor corretamente');
    }
    



    treinamento.query(
        'INSERT INTO assinatura (nome, duracao_meses, preco, descricao) VALUES (?,?,?,?)',
        [
            nome,
            duracao_meses,
            preco, 
            descricao, 
        ],
        () => {
            res.status(201).send('Plano cadastrado com sucesso')
    })
})

app.get('/assinatura', (req, res) => {
    treinamento.query('SELECT * FROM  assinatura', (err, results) => {
        if (err) {
            res.status(500).send('Erro ao buscas assinatura')
        }
        
        res.status(200).send(results)
    })
})

app.delete('/assinatura/:id', (req, res)=>{
    const {id}= req.params;
    treinamento.query('DELETE FROM assinatura WHERE id = ?', [id],(err, results)=>{
        if(err){
            return res.status(500).send(' Erro ao deletar');
        }
        if (results.affectedRows === 0) {
            return res.status(404).send( 'Assinatura não encontrado');
        }
        
        res.status(200).send('Assinatura deletado com sucesso');
    });
    
});

app.put('/assinatura/:id', (req, res)=>{
    const { id } = req.params;
    const{nome, duracao_meses, preco, descricao}= req.body;
    
    const query = 'UPDATE assinatura SET nome = ?, duracao_meses=?, preco = ?, descricao= ? WHERE id= ?';
    treinamento.query(query, [nome, duracao_meses,preco, descricao, id], (err, results)=>{
        if(err) {
            return res.status(500).send('Erro ao atualizar');
        }
        
        if ( results.affectedRows === 0){
            return res.status(404).send('Plano não encontrado');
        } 
        
        res.send('Plano atualizado com sucesso');
    });
});

app.listen(3000, ()=> {
    console.log("Servidor backend online http://localhost:3000")
})


// CREATE DATABASE IF NOT EXISTS centro_treinamento;

USE centro_treinamento;

CREATE TABLE IF NOT EXISTS sessoes(
id INT AUTO_INCREMENT PRIMARY KEY,
aluno VARCHAR(100),
personal VARCHAR(100),
tipo_treino VARCHAR(50),
data DATE,
horario TIME,
observacoes TEXT
);

CREATE TABLE IF NOT EXISTS assinatura(
id INT AUTO_INCREMENT PRIMARY KEY,
nome VARCHAR (100),
duracao_meses VARCHAR (100),
preco  decimal(10,2),
descricao VARCHAR (200)
);
//
