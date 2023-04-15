/*
Criando o usuário com limitações de acesso ao SGBD
O acesso do usuário será apenas de conectar no BD e executar as procedures.
Verifique em Propriedades da Conexão se o acesso é permitido via usuário SQL.
*/
USE MASTER
GO

--DROP LOGIN labbd;
CREATE LOGIN labbd WITH PASSWORD = 'fatec123';
GO

GRANT CONNECT SQL TO LOJA;
GO

USE LOJA
GO

--DROP USER Labbd
CREATE USER labbd FOR LOGIN labbd;
GO

GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Inserir TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Alterar TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_Deletar TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_ConsultarTodos TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Produtos_ConsultarPorId TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Inserir TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Alterar TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_Deletar TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_ConsultarTodos TO labbd;
GRANT EXECUTE ON LOJA.dbo.sp_Pedidos_ConsultarPorId TO labbd;