// segue o mesmo padrão do usuário muda as ref
import Sequelize, { Model } from 'sequelize';

class Recipients extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        complement: Sequelize.STRING,
        number: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      { sequelize }
    );
    return this;
  }
}
export default Recipients;
