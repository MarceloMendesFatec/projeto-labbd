CREATE DATABASE LOJA;
GO
USE LOJA;
GO

CREATE TABLE Produtos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  preco DECIMAL(10,2) NOT NULL,
  status VARCHAR(10) CHECK (status IN ('disponivel', 'indisponivel')) -- Qualquer outra entrada sera rejeitada
);

CREATE TABLE Pedidos (
  id INT IDENTITY(1,1) PRIMARY KEY,
  cliente VARCHAR(50) NOT NULL,
  dataPedido DATE NOT NULL,
  valorTotal DECIMAL(10,2) DEFAULT 0.00,
  status VARCHAR(10) CHECK (status IN ('pendente', 'em andamento', 'concluído')),-- Qualquer outra entrada sera rejeitada
  codigoPedido INT UNIQUE,
  idProduto INT NOT NULL,
  FOREIGN KEY (idProduto) REFERENCES Produtos(id)
);

/* TABELA PRODUTOS

Procedure para inclusão de Produtos*/


CREATE OR ALTER PROCEDURE sp_Produtos_Inserir
  @nome VARCHAR(50),
  @preco DECIMAL(10,2),
  @status VARCHAR(10)
AS
SET NOCOUNT ON
BEGIN
  INSERT INTO Produtos (nome, preco, status)
  VALUES (@nome, @preco, @status)
END

EXEC sp_Produtos_Inserir 'Produto 1', 10.50, 'disponivel'
EXEC sp_Produtos_Inserir 'Produto 2', 20.75, 'indisponivel'
EXEC sp_Produtos_Inserir 'Produto 3', 30.00, 'disponivel'


/*Procedure para alteração*/

CREATE PROCEDURE sp_Produtos_Alterar
  @id INT,
  @nome VARCHAR(50),
  @preco DECIMAL(10,2),
  @status VARCHAR(10)
AS
BEGIN
  UPDATE Produtos SET nome = @nome, preco = @preco, status = @status
  WHERE id = @id
END

/*Procedure para deleção*/

CREATE PROCEDURE sp_Produtos_Deletar
  @id INT
AS
BEGIN
  DELETE FROM Produtos WHERE id = @id
END

/*Procedure para consulta de todos registros*/

CREATE PROCEDURE sp_Produtos_ConsultarTodos
AS
BEGIN
  SELECT * FROM Produtos
END

/*Procedure para consulta apenas um conjunto*/

CREATE PROCEDURE sp_Produtos_ConsultarPorId
  @id INT
AS
BEGIN
  SELECT * FROM Produtos WHERE id = @id
END

/* Procedure tabela 2*/

/* Procedure Inclusão */

CREATE PROCEDURE sp_Pedidos_Inserir
  @cliente VARCHAR(50),
  @dataPedido DATE,
  @valorTotal DECIMAL(10,2),
  @status VARCHAR(10),
  @codigoPedido VARCHAR(50),
  @idProduto INT
AS
BEGIN
  -- Verifica se o produto está disponível
  IF NOT EXISTS (SELECT id FROM Produtos WHERE id = @idProduto AND status = 'ativo')
  BEGIN
    -- Produto indisponível, lança uma exceção
    DECLARE @mensagem VARCHAR(100) = 'Não foi possível concluir seu pedido. Produto indisponível.'
    RAISERROR (@mensagem, 16, 1)
    RETURN
  END
  
  -- Produto disponível, insere o pedido na tabela
  INSERT INTO Pedidos (cliente, dataPedido, valorTotal, status, codigoPedido, idProduto)
  VALUES (@cliente, @dataPedido, @valorTotal, @status, @codigoPedido, @idProduto)
END


/*Procedure para alteração*/

CREATE PROCEDURE sp_Pedidos_Alterar
  @id INT,
  @cliente VARCHAR(50),
  @dataPedido DATE,
  @valorTotal DECIMAL(10,2),
  @status VARCHAR(10),
  @codigoPedido VARCHAR(50),
  @idProduto INT
AS
BEGIN
  UPDATE Pedidos SET cliente = @cliente, dataPedido = @dataPedido, valorTotal = @valorTotal, 
  status = @status, codigoPedido = @codigoPedido, idProduto = @idProduto
  WHERE id = @id
END

EXEC sp_Pedidos_Inserir 'Cliente A', '2023-04-17', 50.00, 'pendente', 423, 1;


/*Procedure de deleção*/

CREATE PROCEDURE sp_Pedidos_Deletar
  @id INT
AS
BEGIN
  DELETE FROM Pedidos WHERE id = @id
END


/*Procedure de consulta para todos registros*/

CREATE PROCEDURE sp_Pedidos_ConsultarTodos
AS
BEGIN
  SELECT * FROM Pedidos
END

/*Procedure de consulta para um registro*/

CREATE PROCEDURE sp_Pedidos_ConsultarPorId
  @id INT
AS
BEGIN
  SELECT * FROM Pedidos WHERE id = @id
END

/*funcao para retornar produtos indisponiveis*/

CREATE FUNCTION fn_Produtos_Indisponivel()
RETURNS TABLE
AS
RETURN
SELECT id, nome, preco, status
FROM Produtos
WHERE status = 'indisponivel';

/*para chamar ela */
SELECT * FROM fn_Produtos_Indisponivel();