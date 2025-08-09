function checkPlan(feature) {
  return function (req, res, next) {
    const plan = (req.user && req.user.plan) || 'free';
    const features = {
      free: [],
      basic: ['upload'],
      premium: ['upload', 'correcoes', 'perfil']
    };
    if (features[plan] && features[plan].includes(feature)) {
      return next();
    }
    return res.status(403).json({ error: 'Plano não permite essa funcionalidade' });
  };
}

module.exports = { checkPlan };
