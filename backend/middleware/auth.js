const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'secret';

const authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token ausente' });
  }
  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};

const authorize = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Acesso negado' });
  }
  next();
};

module.exports = { authenticate, authorize };
