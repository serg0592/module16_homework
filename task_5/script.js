let visitorName, currentDate; //имя, дата
//приветствие
function greeting () {
    //проверка наличия данных в localStorage
    if (localStorage.getItem('lastVisitorName')) {
        //вывод сообщения о прошлом посещение
        alert (`Добрый день, ${localStorage.getItem('lastVisitorName')}! Последнее посещение 
                было ${localStorage.getItem('lastVisitDay')}.${localStorage.getItem('lastVisitMonth')}.${localStorage.getItem('lastVisitYear')}г.`);
    } else {
        visitorName = prompt('Добрый день! Введите ваше имя'); //запрос имени
        localStorage.setItem('lastVisitorName', visitorName);
        currentDate = new Date(); //запись текущей даты
        localStorage.setItem('lastVisitDay', currentDate.getDate()); //запись дня в localStorage
        localStorage.setItem('lastVisitMonth', currentDate.getMonth() + 1); //запись месяца (с корректировкой) в localStorage
        localStorage.setItem('lastVisitYear', currentDate.getFullYear()); //запись года в localStorage
    };
}

setTimeout(greeting, 3000); //вызов приветствия через 3 сек после загрузки страницы

//кнопка для очистки localStorage
document.querySelector('.btn-clear').addEventListener('click', () => {
    localStorage.clear();
});
