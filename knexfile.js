// Update with your config settings.

module.exports = {
  //por ser ambiente de dev nao vou utilizar variaveis de ambiente 

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port : 3306,
      user: 'root',
      password: '',
      database: 'desafio'
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  },

  test: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port : 3306,
      user: 'root',
      password: '',
      database: 'desafio_teste'
    },
    migrations: {
      directory: "./src/database/migrations"
    },
    useNullAsDefault: true
  }
};
