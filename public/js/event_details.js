const register = document.querySelector('#register');
const courseId = document.querySelector('#courseId').textContent;
register.onclick = (e) => {
  verifyStart('','','',`course/${courseId}`);
}