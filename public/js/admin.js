const subDropDown =document.querySelectorAll('.subDropDown')
const mainDropDown =document.querySelectorAll('.mainDropDown')

const displaySubDiv = (array,value)=>{
  array.forEach(node=>{
    node.style.display=value
    node.addEventListener('click',e=>{
    })
  })
}
displaySubDiv(subDropDown,'none');
mainDropDown.forEach(node=>{
  node.addEventListener('click',e=>{
    if(!node.visible){
      node.visible=true
      displaySubDiv(Array.prototype.slice.call(node.parentNode.children).splice(1),'block');
      node.classList.add('active')
    }else{
      node.visible=false
      displaySubDiv(Array.prototype.slice.call(node.parentNode.children).splice(1),'none');
      node.classList.remove('active')
    }
  })
})
