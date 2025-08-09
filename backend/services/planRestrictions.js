const PLAN_LIMITS = {
  free: { submissions: 1, corrections: 0 },
  premium: { submissions: Infinity, corrections: Infinity }
};

function canSubmit(plan, submissionsCount) {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  return submissionsCount < limits.submissions;
}

function canRequestCorrection(plan, correctionsCount) {
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free;
  return correctionsCount < limits.corrections;
}

module.exports = { PLAN_LIMITS, canSubmit, canRequestCorrection };
