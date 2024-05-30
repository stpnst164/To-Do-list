// Запросить список todos с jsonplaceholder - DONE
// Отобразить список с ID, title и кнопкой Completed - DONE
// При клике на Completed todo помечается как выполненная
// (CSS: text-decoration: line-through); - DONE
//Есть строка поиска, которая отфильтровывает 
//список по title(через функцию debounce) - 
//Есть loader при загрузке списка с сервера(можно использовать любой loader CSS) - DONE

document.body.onload = function() {
    let preloader = document.getElementById('page-preloader');

    setTimeout(function() {
        async function getResponse() {
            let response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');
            let content = await response.json();
            console.log(content);
        
            let list = document.querySelector('.tasks-list');
        
            for(let key in content) {
                list.innerHTML += `
                <div class="tasks-title-id">
                    <li class="task-id">ID: ${content[key].id}</li>
                    <li class="task-title">Title: ${content[key].title}</li>
                </div>
                <button onclick="updateStatus(this)" class="task-button">
                    <span>Completed</span>
                </button>
                `;
            }
        
            preloader.style.display = 'none';
        }
        getResponse();


        if( !preloader.classList.contains('done')) {
            preloader.classList.add('done');
        }
    }, 2000);
}


function updateStatus(selectedTask) {
    let taskName = selectedTask.previousElementSibling;
    if(taskName.classList.contains('completed')) {
        taskName.classList.remove('completed');
    } else {
        taskName.classList.add('completed');
    }
    console.log(selectedTask);
}


//?
const debounce = (func, timeout) => {
    let timer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, timeout);
    };
};

//?
const searchInput = document.getElementById('searchInput');

//?
searchInput.addEventListener('input', debounce(function() {
    const searchValue = searchInput.value.toLowerCase();
    const tasks = document.querySelectorAll('.tasks-title-id');
    tasks.forEach(task => {
        const title = task.querySelector('.task-title').textContent.
        toLowerCase();
        if (title.includes(searchValue)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}, 300));