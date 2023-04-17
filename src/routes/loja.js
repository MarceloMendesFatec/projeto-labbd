// API REST da LOJA
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'

const router = express.Router()

// lista todos os produtos 
router.get('/produtos', (_req, res) => {
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .execute("sp_Produtos_ConsultarTodos")
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
})
 // Post insere os produtos /*
 
router.post('/produtos', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {  nome, preco, status } = req.body
        return pool
            .request()
            .input("NOME", sql.VarChar(50), nome)
            .input("PRECO", sql.Decimal(10,2), preco)
            .input("STATUS", sql.VarChar(10), status)
            .execute("sp_Produtos_Inserir")
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})


//Put altera produto existente  */ 
router.put('/produtos', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {  nome, preco, status } = req.body
        return pool
            .request()
            .input("NOME", sql.VarChar(50), nome)
            .input("PRECO", sql.Decimal(10,2), preco)
            .input("STATUS", sql.VarChar(10), status)
            .execute("sp_Produtos_Alterar")      
    }).then(dados => {
        res.status(200).json('Produto alterado com sucesso!!')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})



// Delete, feito por nome */
router.delete('/:nome', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const nome = req.params.nome
        return pool.request()
            .input("NOME", sql.VarChar(50), nome)
            .execute("sp_Produtos_Deletar")           
    }).then(dados => {
        res.status(200).json('Deletado com sucesso')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})


/****************** TABELA 2 *************************/

// lista todos os pedidos
router.get('/Produtos', (_req, res) => {
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .execute("sp_Pedidos_ConsultarTodos")
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
})
 // Post dos pedidos/*
 
router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {  cliente, valortotal } = req.body
        return pool
            .request()
            .input('CLIENTE', sql.VarChar(50), cliente)
            .input('VALORTOTAL', sql.Decimal(10,2).default(0.0), valortotal)
           
            
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})


//Put, altera um  pedido existente  */ 
router.put('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const {  cliente, datapedido, valortotal, status, codigopedido, idProduto } = req.body
        return pool
            .request()
            .input('CLIENTE', sql.VarChar(50), cliente)
            .input('DATAPEDIDO', sql.Date(notnull), datapedido)
            .input('VALORTOTAL', sql.Decimal(10,2).default(0.0), valortotal)
            .input('STATUS', sql.VarChar(10), status)
            .input('CODIGOPEDIDO', sql.Int(unique), codigopedido)
            .input('IDPRODUTO', sql.Int(notnull), idProduto)
            .execute('sp_Pedidos_Alterar')  
            
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})



// Delete, feito pelo codigo do pedido */
router.delete('/:codigodopedido', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const nome = req.params.codigopedido
        return pool.request()
            .input('CODIGODOPEDIDO', sql.Int(unique), codigopedido)
            .execute('sp_Pedidos_Deletar')           
    }).then(dados => {
        res.status(200).json('Deletado com sucesso')
    }).catch(err => {
        res.status(400).json(err.message)
    })
})



export default router
