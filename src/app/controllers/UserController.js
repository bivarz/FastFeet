import * as yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required(),
      password: yup
        .string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({
        Erro: `${req.body.email} already registered`,
      });
    }
    const { id, name, email } = await User.create(req.body);
    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
