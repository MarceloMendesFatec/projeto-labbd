// API REST da LOJA
import express from 'express'
import sql from 'mssql'
import { sqlConfig } from '../sql/config.js'

const router = express.Router()

router.get('/', (req, res) => {
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .execute('SP_S_EST_VEICULO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err)
        })
    } catch (err) {
        console.error(`Erro ao conectar: ${err.message}`)
    }
})
/***************************************
 * POST /
 * Insere um novo veículo
 ***************************************/
router.post('/', (req, res) => {
    sql.connect(sqlConfig).then(pool => {
        const { placa, nome, descricao, fabricacao, preco } = req.body
        return pool
            .request()
            .input('PLACA', sql.Char(7), placa)
            .input('NOME', sql.VarChar(50), nome)
            .input('DESCRICAO', sql.VarChar(200), descricao)
            .input('FABRICACAO', sql.Date, fabricacao)
            .input('PRECO', sql.Numeric, preco)
            .output('CODIGOGERADO', sql.Int)
            .execute('SP_I_EST_VEICULO')
    }).then(dados => {
        res.status(200).json(dados.output)
    }).catch(err => {
        res.status(400).json(err.message)
    })
})


/**********************************************
 * PUT //
 * Altera um veículo existente
 **********************************************/
router.put("/", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
      const {codigo, placa, nome, descricao, fabricacao, preco} = req.body
          return pool
          .request()
          .input('CODIGO', sql.Int, codigo)
          .input('PLACA', sql.Char(7), placa)
          .input('NOME', sql.VarChar(50), nome)
          .input('DESCRICAO', sql.VarChar(200), descricao)
          .input('FABRICACAO', sql.Date, fabricacao)
          .input('PRECO', sql.Numeric, preco)
          .execute('SP_U_EST_VEICULO')
        }).then(dados => {
          res.status(200).json('Veículo alterado com sucesso!')
      }).catch(err => {
          res.status(400).json(err.message) //bad request
      })
  })
/**********************************************
 * DELETE //:placa
 * Apaga um veículo pela paca
 **********************************************/
router.delete("/:placa", (req, res) => {
    sql.connect(sqlConfig).then(pool => {
      const placa = req.params.placa
          return pool.request()
          .input('PLACA', sql.Char(7), placa)
          .execute('SP_D_EST_VEICULO')
        }).then(dados => {
          res.status(200).json('Veículo excluído com sucesso!')
      }).catch(err => {
          res.status(400).json(err.message) //bad request
      })
  })

/**********************************************
 * GET //:placa
 * Lista um único veículo pela placa
 **********************************************/
router.get("/:placa", (req, res) => {
    const placa = req.params.placa
    try {
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .input('FILTRO', sql.Char(7), placa)
                .execute('SP_S_EST_VEICULO')
        }).then(dados => {
            res.status(200).json(dados.recordset)
        }).catch(err => {
            res.status(400).json(err) //bad request
        })
    } catch (err) {
        console.error(err)
    }
})

export default router
