var loginForm=document.getElementById('cp-login-form')
var username=document.getElementById('username')
var password=document.getElementById('password')
loginForm.addEventListener('submit',function(e){
  e.preventDefault()
  fetch('/admin/login',{
   headers: { 'content-type': 'application/json' },
   method: 'POST',
   credentials: 'include',
   body: JSON.stringify({
     username: username.value,
     password:password.value
   })
 })
    .then(res=>res.json())
    .then(res=>{
      if (res.err) {
        swal("Error!", res.err.errMsg, "error");
      }else if(res.rediect){
        window.location=res.rediect
      }
    })
})
