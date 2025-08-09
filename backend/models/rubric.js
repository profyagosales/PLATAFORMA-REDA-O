class Rubric {
  constructor(banca, criteria = []) {
    this.banca = banca;
    this.criteria = criteria; // each: { name, weight, description }
  }

  calculate(scores = {}) {
    let total = 0;
    let weightSum = 0;
    this.criteria.forEach(c => {
      const score = parseFloat(scores[c.name]) || 0;
      total += score * c.weight;
      weightSum += c.weight;
    });
    return weightSum ? total / weightSum : 0;
  }

  generateReport(scores = {}, comments = {}) {
    const criteriaReport = this.criteria.map(c => ({
      criterion: c.name,
      weight: c.weight,
      description: c.description,
      score: parseFloat(scores[c.name]) || 0,
      comment: comments[c.name] || ''
    }));

    return {
      banca: this.banca,
      criteria: criteriaReport,
      finalGrade: this.calculate(scores)
    };
  }
}

module.exports = Rubric;
