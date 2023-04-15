import dotenv from 'dotenv/config'

export const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // Apenas para o Azure
    trustServerCertificate: true // Mantenha true apenas para servidores locais
  }
}

/*
O código acima é uma exportação de uma constante denominada "sqlConfig",
 que contém as configurações necessárias para conectar a uma base de dados SQL. 
 Os valores das propriedades "user", "password", "database" e "server" são extraídos das variáveis de ambiente
  "DB_USER", "DB_PWD", "DB_NAME" e "DB_SERVER", respectivamente. 

  A propriedade "pool" tem os valores de "max", "min" e "idleTimeoutMillis" 
  configurados para definir o número máximo de conexões simultâneas com o banco de dados,
  o número mínimo de conexões e o tempo máximo de espera para uma conexão, respectivamente.


  A propriedade "options" contém duas outras propriedades: 
  "encrypt" é configurado como falso, somente para ser utilizado no Azure e 
  "trustServerCertificate" é configurado como verdadeiro, apenas para servidores locais.


Sendo assim, o código acima é essencial para qualquer conexão com banco de dados SQL e 
é altamente customizável para atender às necessidades do usuário.*/ 