const input_1 = document.querySelector('.form-input-1'), //поле ввода страниц
      input_2 = document.querySelector('.form-input-2'), //поле ввода лимита
      btn = document.querySelector('.form-button'), //кнопка "запрос"
      message = document.querySelector('.message-text'), //поле для сообщений
      result = document.querySelector('.result-list'); //поле для списка картинок

//кнопка для очистки localStorage
document.querySelector('.btn-clear').addEventListener('click', () => {
    localStorage.clear();
    console.log(localStorage.getItem(`item_0`));
});

let input_1_error, input_2_error, //флаги проверок для полей ввода
    li, item;

message.innerHTML = ''; //очищаем поле сообщений

//проверка localStorage на записи предыдущего запроса
if (localStorage.getItem(`number`)) {
    //вывод значений из предыдущего запроса
    for (i = 0; i < localStorage.getItem(`number`); i++) {
        item = JSON.parse(localStorage.getItem(`item_${i}`));
        //формирование нового элемента списка картинок (автор, картинка, размер, ссылка на оригинал)
        li = document.createElement('li');
        li.innerHTML = `<div class="result-list__author">${item.author}</div>
                        <img class="result-list__img" src="${item.download_url}">
                        <div class="result-list__size">${item.width}x${item.height}</div>
                        <div class="result-list__link">оригинал: <a href="${item.download_url}">${item.download_url}</a></div>`;
        result.append(li);
    };
};

//кнопка "запрос"
btn.addEventListener('click', () => {
    //обнуление флагов проверок полей ввода
    input_1_error = input_2_error = false;
    //проверка ввода номера страницы
    if ((input_1.value === '') || (typeof Number(input_1.value) != "number") || (Number(input_1.value) < 1) || (Number(input_1.value) > 10)) {
        input_1_error = true;
        messageText = 'Номер страницы вне диапазона 1..10';
    };
    //проверка ввода лимита
    if ((input_2.value === '') || (typeof Number(input_2.value) != "number") || (Number(input_2.value) < 1) || (Number(input_2.value) > 10)) {
        input_2_error = true;
        messageText = 'Лимит вне диапазона 1..10';
    };
    //проверка ввода 2-х полей
    if (input_1_error && input_2_error) {
        message.innerHTML = 'Номер страницы и лимит вне диапазона 1..10';
    } else if (input_1_error || input_2_error) {
        message.innerHTML = messageText;
    } else {
        //отправка запроса
        fetch(`https://picsum.photos/v2/list?page=${input_1.value}&limit=${input_2.value}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            for (i = 0; i < data.length; i++) {
                //создание нового элемента списка (автор, картинка, размер, ссылка на оригинал)
                li = document.createElement('li');              
                li.innerHTML = `<div class="result-list__author">${data[i].author}</div>
                                <img class="result-list__img" src="${data[i].download_url}">
                                <div class="result-list__size">${data[i].width}x${data[i].height}</div>
                                <div class="result-list__link">оригинал: <a href="${data[i].download_url}">${data[i].download_url}</a></div>`;
                result.append(li);
                //запись данных в localStorage
                localStorage.setItem(`item_${i}`, JSON.stringify(data[i]));
            };
            //запись количества элементов в localStorage
            localStorage.setItem(`number`, i);
        })
        .catch(() => {
            message.innerHTML = 'Ошибка загрузки данных';
        });
    };
});