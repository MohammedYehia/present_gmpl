const box = document.querySelectorAll('.box');

box.forEach((item) => {
  item.onclick = (e) => {
    item.classList.toggle('selected');
  };
});
