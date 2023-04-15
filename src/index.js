import express from 'express'
import cors from 'cors'

const app = express()
const port = 4000

app.use(cors()) //Habilita o CORS
app.use(express.urlencoded({extended: true}))
app.use(express.json()) // Parse JSON
/* Rotas do Veículo */
// app.use('/api/veiculos', rotasVeiculos)

/* Rotas públicas */
app.use('/', express.static('public'))

/* Rota default da API */
app.get('/api', (req, res) => {
    res.status(200).json({
        mensagem: 'API 100% funcional!',
        versao: '1.0.1'
    })
})

/* Rota para tratar erros 404 */
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

app.listen(port, function(){
    console.log(`🚀Servidor rodando na porta ${port}`)
})