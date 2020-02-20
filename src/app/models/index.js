import Sequelize from 'sequelize';

import User from './User';
import Recipients from './Recipients';

import databaseConfig from './config/database';

const models = [User, Recipients];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => {
      return model.init(this.connection);
    });
  }
}

export default new Database();
