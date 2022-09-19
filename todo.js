const formToDo = document.formToDo
const todolist =document.querySelector('.todo-list')
const {addInput,searchInput ,addTodoBtn} = formToDo
const defaultUrl = "http://localhost:3000/todolist"
let changedTextTodo='';

addTodoBtn.addEventListener('click' , addTodo)
searchInput.addEventListener('input' , search)
rander()

    async function addTodo(event){
    event.preventDefault()
    const text = addInput.value
    addInput.value = ""
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
    const span = document.createElement('span')
    const btnBox = document.createElement('div')
    li.insertAdjacentElement('beforeend' , span)
    li.insertAdjacentElement('beforeend' , btnBox)
    const deleteButton = document.createElement("button")
    const editButton = document.createElement("button")
    const saveButton = document.createElement("button")
    saveButton.classList.add('save-todo-btn')
    deleteButton.innerText = "Delete"
    editButton.innerText = 'Edit'
    saveButton.innerText = 'Save'
    deleteButton.addEventListener('click' , () => deleteTodo(item.id))
    editButton.addEventListener('click' , editTodo)
    saveButton.addEventListener('click' , getValueTodo)
    saveButton.addEventListener('click' , () => saveTodo(item.id))
    span.innerText = item.text
    btnBox.insertAdjacentElement('beforeend' , saveButton)
    btnBox.insertAdjacentElement('beforeend' , editButton)
    btnBox.insertAdjacentElement('beforeend' , deleteButton)
    return li
}

async function rander(){
    const response = await fetch(defaultUrl)
    const arrTodo = await response.json()
    todolist.innerHTML = ""
    const list = arrTodo.map(item => createTodolist(item))
    list.forEach(item => todolist.insertAdjacentElement("beforeend" , item))
}


async function search(){
    const response = await fetch(defaultUrl)
    const arrTodo = await response.json()
    todolist.innerHTML = ""
    const findingTodo = arrTodo.filter((item) =>{
        if(item.text.includes(searchInput.value)) return item
    })
    const list = findingTodo.map(item => createTodolist(item))
    list.forEach(item => todolist.insertAdjacentElement("beforeend" , item))
}
function editTodo(event){
    const {target} = event
    target.disabled = true
    const parent = target.closest('li')
    const saveBtn = parent.querySelector('.save-todo-btn')
    const textTodo = parent.querySelector('span')
    textTodo.classList.add('todo-text-edit')
    saveBtn.classList.add('enable-save-todo-btn')
    textTodo.contentEditable = true
}
async function saveTodo(id){
    const text = changedTextTodo
    const responce = await fetch(`${defaultUrl}/${id}`,{
        method: "PUT",
        headers: {
            Accept:'application/json',
            'Content-Type':'application/json',
           
        },
        body: JSON.stringify({text})
       })
       if(responce.ok){
        rander()
    }  
}

function getValueTodo(event){
    const {target} = event
    const parent = target.closest('li')
    const textTodo = parent.querySelector('span')
    changedTextTodo =  textTodo.textContent
}