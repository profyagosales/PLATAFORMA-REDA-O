const essays = [];

class Essay {
  constructor({ filename, originalName, date, theme, status }) {
    this.filename = filename;
    this.originalName = originalName;
    this.date = date;
    this.theme = theme;
    this.status = status;
  }

  static create(data) {
    const essay = new Essay(data);
    essays.push(essay);
    return essay;
  }

  static all() {
    return essays;
  }
}

module.exports = Essay;
