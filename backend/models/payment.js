const payments = [];

function generateId() {
  return payments.length ? payments[payments.length - 1].id + 1 : 1;
}

module.exports = {
  create(data) {
    const payment = { id: generateId(), ...data };
    payments.push(payment);
    return payment;
  },
  findAll() {
    return payments;
  },
  findById(id) {
    return payments.find(p => p.id === Number(id));
  },
  update(id, data) {
    const payment = this.findById(id);
    if (!payment) return null;
    Object.assign(payment, data);
    return payment;
  },
  remove(id) {
    const index = payments.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      payments.splice(index, 1);
      return true;
    }
    return false;
  }
};
