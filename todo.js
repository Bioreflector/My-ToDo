const formToDo = document.formToDo
const todolist =document.querySelector('.todo-list')
const {addInput,searchInput ,addTodoBtn ,searchTodoBtn} = formToDo
const defaultUrl = "http://localhost:3000/todolist"

addTodoBtn.addEventListener('click' , addTodo)
rander()

    async function addTodo(event){
    event.preventDefault()
    const text = addInput.value
    const responce = await fetch(defaultUrl,
        {
        method: "POST",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
           
        },
        body: JSON.stringify({text})
        }
    )
    if(responce.ok){
        rander()
    }  
}
async function deleteTodo(id){
   const responce = await fetch(`${defaultUrl}/${id}`,{
    method: "DELETE"
   })
   rander()
}

function createTodolist(item){
    const li = document.createElement("li")
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.addEventListener('click' , () => deleteTodo(item.id))
    console.log(deleteButton)
    li.innerText = item.text
    li.insertAdjacentElement('beforeend' , deleteButton)
    return li
}

async function rander(){
    const response = await fetch(defaultUrl)
    const arrTodo = await response.json()
    todolist.innerHTML = ""
    const list = arrTodo.map(item => createTodolist(item))
    list.forEach(item => todolist.insertAdjacentElement("beforeend" , item))
}

