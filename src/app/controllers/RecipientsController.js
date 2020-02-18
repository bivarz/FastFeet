import * as yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street: yup.string().required(),
      complement: yup.string(),
      number: yup.string().required(),
      zip_code: yup.string().required(),
      state: yup
        .string()
        .required()
        .max(2),
      city: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { name, street, zip_code } = req.body;

    const recipientExists = await Recipients.findOne({
      where: { name, street, number: req.body.number, zip_code },
    });

    if (recipientExists)
      return res.status(400).json({ error: 'Recipient already exists.' });

    const { id, complement, number, state, city } = await Recipients.create(
      req.body
    );

    return res.json({
      id,
      name,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async index(req, res) {
    const recipients = await Recipients.findAll();

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      email: yup.string().email(),
      oldPassword: yup
        .string()
        .min(6)
        .max(12),
      password: yup
        .string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPass: yup
        .string()
        .when('password', (password, field) =>
          password ? field.required().oneOf([yup.ref('password')]) : field
        ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { email, oldPassword } = req.body;

    const user = await Recipients.findByPk(req.userId);

    if (email && email !== user.email) {
      const userExists = await Recipients.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User Already exists' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ erro: 'The password does not match' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new RecipientsController();
