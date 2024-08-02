document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task-input');
    const taskDate = document.getElementById('task-date');
    const taskDesc = document.getElementById('task-desc');
    const toggleDescBtn = document.getElementById('toggle-desc-btn');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const message = document.getElementById('message');

    
    flatpickr(taskDate, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        altInput: true,
        altFormat: "F j, Y h:i K"
    });

    
    loadTasks();

    toggleDescBtn.addEventListener('click', function() {
        if (taskDesc.style.display === 'none') {
            taskDesc.style.display = 'block';
            toggleDescBtn.textContent = 'Remover Descrição';
        } else {
            taskDesc.style.display = 'none';
            toggleDescBtn.textContent = 'Adicionar Descrição';
        }
    });

    addTaskBtn.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDateValue = taskDate.value;
        const taskDescValue = taskDesc.style.display === 'none' ? '' : taskDesc.value.trim();

        if (taskText !== '' && taskDateValue !== '') {
            const task = {
                text: taskText,
                date: taskDateValue,
                desc: taskDescValue
            };

            // Adicionar tarefa à lista
            const li = createTaskElement(task);
            taskList.appendChild(li);

           
            saveTask(task);

            // Exibir mensagem de confirmação
            message.textContent = 'Sua tarefa foi salva.';
            setTimeout(() => {
                message.textContent = '';
            }, 3000);

            taskInput.value = '';
            taskDate.value = '';
            taskDesc.value = '';
            taskDesc.style.display = 'none';
            toggleDescBtn.textContent = 'Adicionar Descrição';
        } else {
            // Exibir mensagem de erro se o campo estiver vazio
            message.textContent = 'Por favor, preencha todos os campos obrigatórios.';
            setTimeout(() => {
                message.textContent = '';
            }, 3000);
        }
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${task.text}</strong><br><small>${task.date}</small>${task.desc ? `<p>${task.desc}</p>` : ''}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.addEventListener('click', function() {
            taskList.removeChild(li);
           
            deleteTask(task);
        });
        li.appendChild(deleteBtn);
        return li;
    }

    function saveTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = createTaskElement(task);
            taskList.appendChild(li);
        });
    }

    function deleteTask(task) {
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks = tasks.filter(t => t.text !== task.text || t.date !== task.date || t.desc !== task.desc);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});
