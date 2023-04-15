/*
Criando o usuário com limitações de acesso ao SGBD
O acesso do usuário será apenas de conectar no BD e executar as procedures.
Verifique em Propriedades da Conexão se o acesso é permitido via usuário SQL.
*/
USE MASTER
GO

--DROP LOGIN labbd;
CREATE LOGIN user_loja WITH PASSWORD = 'fatec123';
GO

GRANT CONNECT SQL TO user_loja;
GO

USE LOJA
GO

--DROP USER user_loja
CREATE USER user_loja FOR LOGIN user_loja;
GO

GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Inserir TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Alterar TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Deletar TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_ConsultarTodos TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_ConsultarPorId TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Inserir TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Alterar TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Deletar TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_ConsultarTodos TO user_loja;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_ConsultarPorId TO user_loja;