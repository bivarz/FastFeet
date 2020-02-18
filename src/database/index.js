// Aqui fica a conexão com o BD e a importação dos models
import Sequelize from 'sequelize'; // responsável pela conexão  com o DB
import databaseConfig from '../config/database';
import User from '../app/models/User';
import Recipients from '../app/models/Recipients';

const models = [User, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}
export default new Database();
