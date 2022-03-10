'use strict';

const toDoList = {
    taskListBlock: document.querySelector('.todo_list'),
    task: document.querySelector('.task'),
    buttonAdd: document.querySelector('.add'),
    allDeleteButton: document.querySelector('.buttons_delete'),
    allRecoverButton: document.querySelector('.buttons_recover'),


    init () {
        // localStorage.clear();
        this.render();

        this.buttonAdd.addEventListener('click', () => {
            this.addTask();
        });

        this.task.addEventListener('keyup', event => {
            if (event.code === 'Enter') {
                this.addTask();
            };
        });

        this.taskListBlock.addEventListener('click', event => {
            if (event.target.tagName === 'BUTTON') {
                this.changeBlockItem(event.target);
            }
        });

        this.allDeleteButton.addEventListener('click', () => {
            this.allDelete();
        });

        this.allRecoverButton.addEventListener('click', () => {
            this.allRecover();
        });
    },

    changeBlockItem(buttonEl) {
        const parentButton = buttonEl.parentElement;
        const localStorageItem = localStorage.getItem(parentButton.id);
        let newLocalStorageItem = '';

        parentButton.classList.toggle('todo_list_item_delete');

        switch (buttonEl.textContent) {
            case 'Удалить':
                buttonEl.textContent = 'Восстановить';
                newLocalStorageItem = localStorageItem.replace('Удалить', 'Восстановить');
                localStorage.setItem(parentButton.id, newLocalStorageItem);
                break;
            case 'Восстановить':
                buttonEl.textContent = 'Удалить';
                newLocalStorageItem = localStorageItem.replace('Восстановить', 'Удалить');
                localStorage.setItem(parentButton.id, newLocalStorageItem);
                break;
        }
    },

    addTask () {
        if (this.task.value === '') return;

        let key = document.querySelectorAll('.todo_list_item').length + 1;
        key = 'task' + key.toString();

        let val = `{"text":"${this.task.value}","textButton":"Удалить"}`;

        localStorage.setItem(key, val);

        this.renderItem(key, val);

        this.task.value = '';
    },

    render () {
        let order = [];

        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let val = localStorage.getItem(key);

            order.push([key, val]);
        };

        for (let el of order.sort()) {
            this.renderItem(el[0], el[1])
        }
    },

    renderItem(id, data) {
        data = JSON.parse(data);

        let itemDelete = '';
        if (data.textButton === 'Восстановить') {
            itemDelete = ' todo_list_item_delete';
        }

        this.taskListBlock.insertAdjacentHTML('beforeend', `
            <li class="todo_list_item${itemDelete}" id="${id}">
                ${data.text} 
                <button class="todo_list_button">${data.textButton}</button> 
            </li>
        `);
    },

    allDelete() {
        const allTasks = document.querySelectorAll('.todo_list_button');

        for (let el of allTasks) {
            if (el.textContent === 'Удалить') {
                this.changeBlockItem(el);
            }
        }
    },

    allRecover() {
        const allTasks = document.querySelectorAll('.todo_list_button');

        for (let el of allTasks) {
            if (el.textContent === 'Восстановить') {
                this.changeBlockItem(el);
            }
        }
    },
};

toDoList.init();
