
console.log('Javascipt running')
fetch('http://puzzle.mead.io/puzzle').then((res)=>
{
res.json().then((data)=>{


  console.log(data)
})

})
const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg=document.querySelector('#msg1')
msg.textContent=' Message'
weatherform.addEventListener('submit',(e)=>{
  e.preventDefault()
console.log('testing')
console.log(search.value)

})
