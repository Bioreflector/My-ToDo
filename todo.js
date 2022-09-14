const formToDo = document.formToDo
console.log(formToDo)
const {addInput,searchInput ,addСaseBtn ,searchСaseBtn} = formToDo

addСaseBtn.addEventListener('click' , addCase)

function addCase (event){
    event.preventDefault()
    console.log("addCase")
}