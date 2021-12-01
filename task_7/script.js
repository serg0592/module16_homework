const btn = document.querySelector('.form__button'), //кнопка
      input = document.querySelector('.form__input'), //поле ввода
      listTitleText = document.querySelector('.list-title'), //заголовок списка + сообщения
      userListText = document.querySelector('.user-list'); //список

//обработчик кнопки
btn.addEventListener('click', () => {
    let userID = input.value; //ввод id
    //проверка пустого ввода
    if (userID === '') {
        listTitleText.innerHTML = '↑ введите id пользователя';
    } else {
        //запрос данных
        fetch(`https://jsonplaceholder.typicode.com/users/${userID}/todos`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //проверка существования пользователя
            if (data.length === 0) {
                listTitleText.innerHTML = `Пользователь с указанным id не найден`;
                userListText.innerHTML = ''; //очистка списка
            } else {
                //формирование нового списка
                listTitleText.innerHTML = `Список задач пользователя <strong>${userID}</strong>`; //заголовок списка
                userListText.innerHTML = ''; //очистка списка
                for (i = 0; i < data.length; i++) {
                    //создание нового элемента списка
                    var li = document.createElement('li');
                    //проверка свойства "completed"
                    if (data[i].completed) {                    
                        li.innerHTML = `${data[i].id} : <s>${data[i].title}</s>`; //зачеркнутый текст задачи
                    } else {
                        li.innerHTML = `${data[i].id} : ${data[i].title}`; //простой текст задачи                    
                    };
                    userListText.append(li);
                };
            };            
        })
        .catch(() => {
            console.log('error');
        });
    };    
});