const plans = [];

function generateId() {
  return plans.length ? plans[plans.length - 1].id + 1 : 1;
}

module.exports = {
  create(data) {
    const plan = { id: generateId(), ...data };
    plans.push(plan);
    return plan;
  },
  findAll() {
    return plans;
  },
  findById(id) {
    return plans.find(p => p.id === Number(id));
  },
  update(id, data) {
    const plan = this.findById(id);
    if (!plan) return null;
    Object.assign(plan, data);
    return plan;
  },
  remove(id) {
    const index = plans.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      plans.splice(index, 1);
      return true;
    }
    return false;
  }
};
