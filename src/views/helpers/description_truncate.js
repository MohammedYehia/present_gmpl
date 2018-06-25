module.exports = (str) => {
  if (str.length <= 100) {
    return str;
  }
  return str.slice(0, 100).concat('...');
};
