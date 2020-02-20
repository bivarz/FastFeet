// configuração de credenciais.
module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fastfeet',
  define: {
    timestamps: true,
    underScored: true,
    underScoredAll: true,
  },
};
