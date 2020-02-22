import * as yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      street: yup.string().required(),
      complement: yup.string(),
      number: yup.string().required(),
      zipcode: yup.string().required(),
      state: yup
        .string()
        .required()
        .max(2),
      city: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const { name, street, zipcode } = req.body;

    const recipientExists = await Recipients.findOne({
      where: { name, street, number: req.body.number, zipcode },
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
      zipcode,
    });
  }

  async index(req, res) {
    const recipients = await Recipients.findAll();

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = yup.object().shape({
      name: yup.string(),
      zipcode: yup.string(),
      number: yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Update Fails' });
    }

    const { id } = req.params;
    const recipientId = await Recipients.findByPk(id);

    if (!recipientId) {
      return res.status(400).json({ erro: 'Recipient not found!!' });
    }
    await recipientId.update(req.body);

    return res.json({ recipientId });
  }

  async delete(req, res) {
    const { id } = req.params;
    const recipientId = await Recipients.findByPk(id);

    if (!recipientId) {
      return res.status(400).json({ erro: 'Recipient not found!!' });
    }
    await recipientId.destroy();

    return res.send({ message: `the id:${id} was deleted` });
  }
}

export default new RecipientsController();
