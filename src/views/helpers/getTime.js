export default (t) => {
  if (t) return t.toLocaleTimeString().substr(0, 5);
}
