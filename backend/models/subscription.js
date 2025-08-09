class Subscription {
  constructor({ userId, plan, startDate = new Date(), endDate = null, status = 'active' }) {
    this.userId = userId;
    this.plan = plan;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
  }
}

module.exports = Subscription;
