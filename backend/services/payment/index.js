class PaymentGateway {
  constructor(provider) {
    this.provider = provider;
  }

  /**
   * Process a payment using the configured provider.
   * @param {Object} data - payment data
   * @param {Function} onSuccess - callback on success
   * @param {Function} onFailure - callback on failure
   */
  processPayment(data, onSuccess, onFailure) {
    // TODO: integrate provider SDK (PagSeguro, Stripe, etc.)
    try {
      // Simulate payment processing
      const result = { status: 'success', provider: this.provider, data };
      if (typeof onSuccess === 'function') {
        onSuccess(result);
      }
    } catch (err) {
      if (typeof onFailure === 'function') {
        onFailure(err);
      }
    }
  }
}

module.exports = PaymentGateway;
