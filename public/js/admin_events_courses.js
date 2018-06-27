console.log(1);
var deleteButtons = document.querySelectorAll('.deleteButton')
deleteButtons.forEach(item=>{
  item.addEventListener('click',(e)=>{
    console.log(item.id);
    e.preventDefault()
    swal({
    title: "هل انت متأكد من انك تريد حذف هذا العنصر؟",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    })
    .then((willDelete) => {
    if (willDelete) {
      fetch(e.target.id,{
       headers: { 'content-type': 'application/json' },
       method: 'POST',
       credentials: 'include',
     })
        .then(res=>res.json())
        .then(res=>{
          if (res.err) {
            swal("فشل!", res.err.errMsg, "error");
          }else if(res.rediect){
            window.location=res.rediect
          }
        })

    }
    });
      })
    })
