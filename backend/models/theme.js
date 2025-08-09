const themes = [];

function generateId() {
  return themes.length ? themes[themes.length - 1].id + 1 : 1;
}

module.exports = {
  create(data) {
    const theme = { id: generateId(), ...data };
    themes.push(theme);
    return theme;
  },
  findAll() {
    return themes;
  },
  findById(id) {
    return themes.find(t => t.id === Number(id));
  },
  update(id, data) {
    const theme = this.findById(id);
    if (!theme) return null;
    Object.assign(theme, data);
    return theme;
  },
  remove(id) {
    const index = themes.findIndex(t => t.id === Number(id));
    if (index !== -1) {
      themes.splice(index, 1);
      return true;
    }
    return false;
  }
};
