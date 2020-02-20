import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../models/config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token not provided' });
  }

  const [, token] = authHeader.split(' '); // deve haver um espaço aqui entre as aspas para não dar merda!

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: ' Token Invalido' });
  }
};
