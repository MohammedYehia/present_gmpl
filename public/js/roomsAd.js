const box = document.querySelectorAll('.box');

box.forEach((item) => {
  item.onclick = (e) => {
    if (item.classList.contains('selected')) {
      window.location = '/bookings';
    } else {
      box.forEach((element) => {
        element.classList.remove('selected');
      });
      item.classList.add('selected');
    }
  };
});
