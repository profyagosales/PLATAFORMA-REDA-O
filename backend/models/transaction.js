class Transaction {
  constructor({ userId, subscriptionId, amount, status = 'pending', createdAt = new Date() }) {
    this.userId = userId;
    this.subscriptionId = subscriptionId;
    this.amount = amount;
    this.status = status;
    this.createdAt = createdAt;
  }
}

module.exports = Transaction;
