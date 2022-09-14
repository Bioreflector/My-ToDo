const formToDo = document.formToDo
const todolist =document.querySelector('.todo-list')
const {addInput,searchInput ,addTodoBtn ,searchTodoBtn} = formToDo
const defaultUrl = "http://localhost:3000/todolist"

addTodoBtn.addEventListener('click' , addTodo)

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
    todolist.innerHTML = ""
    if(responce.ok){
        rander()
    }  
}
function deleteTodo(){
    console.log("delete")
}

function createTodolist(item){
    const li = document.createElement("li")
    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    console.log(deleteButton)
    li.innerText = item.text
    li.insertAdjacentElement("afterend" , deleteButton)
    return li
}

async function rander(){
    const response = await fetch(defaultUrl)
    const arrTodo = await response.json()
    const list = arrTodo.map(item => createTodolist(item))
    list.forEach(item => todolist.insertAdjacentElement("beforeend" , item))
}

