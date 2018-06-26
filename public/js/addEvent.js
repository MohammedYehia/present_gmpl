// const addEvent=document.getElementById('addEvent')
// const eventTitle=document.getElementById('eventTitle')
// const eventTime=document.getElementById('eventTime')
// const eventRoom=document.getElementById('eventRoom')
// const eventDiscription=document.getElementById('eventDiscription')
// const eventImage=document.getElementById('eventImage')


// addEvent.addEventListener('submit',function(e){
//   e.preventDefault()
//   // const formData = new FormData();
//   // formData.append('file',{
//   //   uri:eventImage.value
//   // })
//   console.log(eventImage.value)
//   fetch('/admin/addevent',{
//    headers: {
//     'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//     'Content-Type': 'multipart/form-data'
//     },
//    method: 'POST',
//    credentials: 'include',
//    body: JSON.stringify({
//      eventTitle: eventTitle.value,
//      eventTime: eventTime.value,
//      eventRoom: eventRoom.value,
//      eventDiscription: eventDiscription.value,
//      eventImage:eventImage.value
//    })

//   //  body:formData
//  }).then(res=>console.log(res))

//     .then(res=>{
//       if (res.err) {
//         swal("Error!", res.err.errMsg, "error");
//       }else if(res.rediect){
//         window.location=res.rediect
//       }
//     })
// })
