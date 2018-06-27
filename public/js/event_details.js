const register = document.querySelector('#register');
const courseId = document.querySelector('#courseId').textContent;
const eventTitle = document.querySelector('#eventTitle').textContent;
register.onclick = (e) => {
  verifyStart('', '', '', `course/${courseId}`, eventTitle);
};
