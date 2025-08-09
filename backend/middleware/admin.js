module.exports = function (req, res, next) {
  const user = req.user;
  if (user && (user.role === 'admin' || user.role === 'teacher')) {
    return next();
  }
  return res.status(403).json({ error: 'Acesso negado' });
};
