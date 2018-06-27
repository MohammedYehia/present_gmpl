const subDropDown = document.querySelectorAll('.subLink');
const mainDropDown = document.querySelectorAll('.mainLink');
console.log(mainDropDown);
const displaySubDiv = (array, value) => {
  console.log(array);
  array.forEach((node) => {
    node.style.display = value;
    node.addEventListener('click', (e) => {
    });
  });
};
displaySubDiv(subDropDown, 'none');
mainDropDown.forEach((node) => {
  node.addEventListener('click', (e) => {
    if (!node.visible) {
      node.visible = true;
      console.log(Array.prototype.slice.call(node.children).splice(1));
      displaySubDiv(Array.prototype.slice.call(node.children).splice(1), 'block');
      node.classList.add('active');
    } else {
      node.visible = false;
      displaySubDiv(Array.prototype.slice.call(node.children).splice(1), 'none');
      node.classList.remove('active');
    }
  });
});
