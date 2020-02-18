// configuração de credenciais.
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'postgres',
  define: {
    timestamps: true,
    underScored: true,
    underScoredAll: true,
  },
};
