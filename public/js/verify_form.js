const createForm = (room_name, start_at, end_at, referrer, courseName) => {
  const formdata = JSON.parse(localStorage.getItem('form')) || '';
  if(referrer === 'bookings'){
      return `
      <h5> حجز ${formdata.room_name || room_name}</h5>
      <p> يوم ${new Date(start_at).toLocaleDateString()} </p>
      <p> من ${trimTime(start_at)} </p>
      <p>حتى ${trimTime(end_at)} </p>
      <input type="text" value='${formdata.event_title || ''}' 'name="event_title" placeholder="عنوان الحدث" id="eventTitle">
      <input type="text" value='${formdata.name || ''}'  name="name" placeholder="الاسم كاملاً" id="name">
      <input type="email" value='${formdata.email || ''}'  name="email" placeholder="البريد الالكتروني" id="email">
      <input type="text" value='${formdata.phone || ''}' name="phone" id="phone" required placeholder="رقم جوال للتواصل">
    ` 
  }else{
    return `
      <h4> تسجيل في  ${courseName}</h4>
      <input type="text" value='${formdata.name || ''}'  name="name" placeholder="الاسم كاملاً" id="name">
      <input type="email" value='${formdata.email || ''}'  name="email" placeholder="البريد الالكتروني" id="email">
      <input type="text" value='${formdata.phone || ''}' name="phone" id="phone" required placeholder="رقم جوال للتواصل">
    ` 
  }
}

const trimTime = (time) => {
  time = new Date(time);
  return (time.getHours()<10 ? ('0'+time.getHours()):time.getHours())+':'+ (time.getMinutes()<10 ? ('0'+time.getMinutes()):time.getMinutes());
}

const verifyStart = (start, end, resource, referrer) => {
  const form = document.createElement("form");
      form.classList.add('swal-form'); 
      if(resource){
        form.innerHTML = createForm(resource.title,start,end,referrer,'');
      }else{
        form.innerHTML = createForm('','','',referrer, 'addacourseanme');
      }     
  const obj = {
    content: form,
    buttons: {
      cancel: {
        text: 'الغاء',
        value: false,
        visible: true
      },
      confirm: {
        text: 'ارسال',
        value: true,
        closeModal: false
      }
    }
  }
  swal(obj).then((value) => {
    if (value) {
      const data = {
        name: document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        referrer
      }   
      if(referrer === 'bookings'){
        data.event_title =  document.querySelector('#eventTitle').value,
        data.start_at= start;
        data.end_at= end;
        data.room_id= resource.id;
        data.room_name= resource.title;
      }
      localStorage.setItem('form', JSON.stringify(data))
      fetch('/phone/verification/start', {
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data)
      }).then(res=>res.json())
      .then((res) => {
            if (res.err) {
              swal('error', res.err, 'error')
            } else if (res.msg.includes('invalid')) {
              swal({
                title: 'خطأ',
                text: 'الرقم المدخل غير صحيح، يرجى المحاولة مرة اخرى',
                icon: 'error',
                buttons: {
                  cancel: {
                    text: 'الغاء',
                    value: false,
                    visible: true
                  },
                  confirm: {
                    text: 'حاول مرة اخرى!',
                    value: true
                  }
                }
              }).then(result =>{
                if(result){
                  if(resource){
                    verifyStart(start, end, resource, referrer);
                  }else{
                    verifyStart('', '', '', referrer);
                  }
                }
              })
            } else if (res.msg.includes('تم ارسال الرسالة بنجاح الى')) {
              // form check code
              if(resource){
                verifyCode(res,start, end, resource, referrer);
              }else{
                verifyCode(res,'', '', '', referrer);
              }
            } else {
              swal('error', res.msg, 'error')
            }
          });
    }
  });
};

const verifyCode = (response, start, end, resource, referrer) => {
  if (response.secondsToExp > 0) {
    let timer = setInterval(()=> {
      const msg = document.querySelector('.swal-text');
      if (msg) {
        response.secondsToExp--;
        msg.textContent = verifyMsg.replace(/#1/, response.secondsToExp);
      }
      if (response.secondsToExp == 0) {
        clearInterval(timer);
        swal({
          title: 'انتهاء صلاحية الكود',
          content: '<p> انتهت صلاحية كود التفعيل، هل ترغب في ارسال كود جديد؟</p>',
          buttons: {
            cancel: {
              text: 'الغاء',
              value: false,
              visible: true
            },
            confirm: {
              text: 'نعم',
              value: true
            }
          },
        }).then((value)=>{
          if (value){
            if(resource){
              verifyStart(start, end, resource, referrer);
            }else{
              verifyStart('', '', '', referrer);
            }
          }
        });
      }
    }, 1000);

    const verifyMsg = 'صلاحية كود التفعيل تنتهي خلال #1 ثواني';
    swal({
    title: response.msg,
    text: verifyMsg.replace(/#1/, response.secondsToExp),
    content: {
      element: 'input',
      attributes: {
        placeholder: 'ادخل كود التفعيل هنا!'
      }
    },
    buttons: {
      confirm: {
        text: 'ارسل الكود',
        closeModal: false
      },
      cancel: {
        text: 'الغاء',
        value: false
      }
    }
    }).then((value) => {
        if (value === '') {
          swal('خطأ', 'الرجاء ادخال كود التفعيل', 'error')
          .then(res =>{
            if(resource){
              verifyCode(response,start, end, resource, referrer);
            }else{
              verifyCode(response,'', '', '', referrer);
            }
          });
        } else if (value) {
          fetch(`/api/v1/${referrer}`, {
            credentials: 'same-origin',
            headers: {
                'content-type': 'application/json',
              },
              method: 'POST',
              body: JSON.stringify({ code: value })
            }).then(res=>res.json())
              .then((res) => {
                if (res.err) {
                  swal('error', res.err, 'error')
                } else if (!res.success) {
                  swal({
                    title: 'خطأ',
                    text: 'كود التفعيل خاطئ، الرجاء المحاولة مرة اخرى',
                    icon: 'error',
                    buttons: {
                      cancel: {
                        text: 'الغاء',
                        value: false,
                        visible: true
                      },
                      confirm: {
                        text: 'حاول مرة أخرى!',
                        value: true
                      }
                    }
                  }).then(result =>{
                    if(result){
                      if(resource){
                        verifyCode(response,start, end, resource, referrer);
                      }else{
                        verifyCode(response,'', '', '', referrer);
                      }
                    }
                  })
                } else {
                  clearInterval(timer);
                  localStorage.removeItem('form');
                  swal({
                    title:'تم العملية بنجاح',
                    icon: 'success',
                    button: 'حسناً'
                  })
                  .then(() => {
                    window.location.reload();
                  });
                }
              });
        } else {
          clearInterval(timer);
          swal.close();
        }
      });
  }
};