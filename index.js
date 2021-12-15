const inputItem = document.createElement('input');

class Todos {
    constructor() {
        this.formInput = document.querySelector('.form-input');
        this.list = document.querySelector('.todo-list');
        this.counter = document.querySelector('.counter');
        this.footer = document.querySelector('.footer');
        this.allCompletedBtn = document.querySelector('.form i');
        this.allBtn = document.querySelector('.all');
        this.activeBtn = document.querySelector('.active');
        this.completedBtn = document.querySelector('.completed');
        this.clearCompleted = document.querySelector('.clear-completed');
        this.isAllTodosCompleted = false;
        this.isTodoItemCompleted;
        this.type = 'all';
        this.array = [];
        this.init()
    }

    init() {
        this.formInput.addEventListener('keydown', e => {
            if (e.key === 'Enter' && e.target.value.trim().length !== 0) {
                const array = [...this.array, { value: e.target.value, id: new Date().toISOString(), completed: false }];
                e.target.value = '';
                this.setTodos(array);
            }
        })
        this.allCompletedBtn.addEventListener('click', () => {
            if(this.isAllTodosCompleted) {
                this.setTodos(this.array.map(item => {
                    return { ...item, completed: false}
                }))
            } else {
                this.setTodos(this.array.map(item => {
                    return { ...item, completed: true}
                }))
            }     
        })
        this.completedBtn.addEventListener('click', e => {
            this.setType(e.target.className);
        })
        this.activeBtn.addEventListener('click', e => {
            this.setType(e.target.className);
        })
        this.allBtn.addEventListener('click', e => {
            this.setType(e.target.className);
        })
        this.clearCompleted.addEventListener('click', () => {
            this.setTodos(this.array.filter(item => item.completed !== true));
        });
    }

    setTodos(newArr) {
        this.array = newArr;
        this.updateCounter();
        this.displayElements();
        this.render();
        this.isTodoItemCompleted = this.array.some(todoItem => todoItem.completed);
        this.showClearCompletedBtn();
        this.isAllTodosCompleted = this.array.every(todoItem => todoItem.completed);
        this.checkIsAllCompleted();
    }

    setType(newType) {
        this.type = newType;
        this.render();
    }

    filteredArray() {
        if(this.type === 'completed') {
            return this.array.filter(item => item.completed === true);
        } else if (this.type === 'active') {
            return this.array.filter(item => item.completed === false);
        } else {
            return this.array;
        }
    }

    showClearCompletedBtn() {
        if(this.isTodoItemCompleted) {
            this.clearCompleted.classList.add('inline')
            this.clearCompleted.classList.remove('none');
        } else {
            this.clearCompleted.classList.add('none');
            this.clearCompleted.classList.remove('inline')
        }
    }

    completeTodo(id) {
        const newArr = this.array.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    completed: !item.completed
                }
            }
            else return item;
        })
        this.setTodos(newArr);
    }

    checkIsAllCompleted() {
        this.allCompletedBtn.classList[this.isAllTodosCompleted ? "add" : 'remove']('dark-opacity');
    }

    displayElements() {
        if (this.array.length) {
            this.footer.classList.add('block');
            this.allCompletedBtn.classList.add('block');
        } else {
            this.footer.classList.remove('block');
            this.allCompletedBtn.classList.remove('block');
        }
    }

    updateTodoItem(itemId, newValue) {
        let array = this.array.map(todo => {
            if(todo.id === itemId) {
                return {
                    ...todo, 
                    value: newValue
                }
            } else {
                return todo
            }
        })
        this.setTodos(array);
    }

    changeTodoContent(li, todoContent, item) {
        li.innerHTML = '';
        inputItem.classList.add('style-block');
        inputItem.value = todoContent.textContent;
        inputItem.setAttribute('class', 'input-edit') 
        li.appendChild(inputItem);
        li.classList.add('default-padding');
        inputItem.focus();
        inputItem.addEventListener('keydown', e => {
            if(e.key === 'Enter') {
                this.updateTodoItem(item.id, e.target.value) 
            }
        })
        inputItem.addEventListener('blur', e => {
            this.updateTodoItem(item.id, e.target.value) 
        })
    }

    updateCounter() {
        let activeTodos = this.array.filter(item => item.completed === false);
        this.counter.textContent = activeTodos.length === 1 
            ? `${activeTodos.length} item left` 
            : `${activeTodos.length} items left`;
    }

    render() {
        this.list.innerHTML = '';
        this.filteredArray().forEach(item => {

            const li = document.createElement('li');
            const checkbox = document.createElement('input');
            const todoContent = document.createElement('span');
            const removeBtn = document.createElement('button');
            const label = document.createElement('label');
            label.htmlFor = item.id;
            checkbox.setAttribute('type', 'checkbox');
            checkbox.setAttribute('class', 'input-checkbox');
            checkbox.setAttribute('id', 'item-checkbox');
            li.setAttribute('id', item.id);
            li.setAttribute('class', 'list-item')
            todoContent.innerText = item.value;
            todoContent.setAttribute('class', 'todo-content')
            removeBtn.classList.add('delete');
            li.appendChild(checkbox);
            li.appendChild(label);
            li.appendChild(todoContent);
            li.appendChild(removeBtn);
            this.list.appendChild(li);

            checkbox.addEventListener('change', () => {
                this.completeTodo(item.id);
            })
    
            label.addEventListener('click', () => {
                this.completeTodo(item.id);
            })
    
            if (item.completed) {
                checkbox.setAttribute("checked", true);
                todoContent.classList.add('toggle-checkbox');
            } 
            else {
                checkbox.removeAttribute("checked")
                todoContent.classList.remove('toggle-checkbox');
            }
    
            li.addEventListener('dblclick' , () => {
                this.changeTodoContent(li, todoContent, item);
            })

            removeBtn.addEventListener('click', () => {
                const filteredArray = this.array.filter(todo => todo.id != item.id);
                this.setTodos(filteredArray);
            });
        })
    }
}
new Todos();




 



 

