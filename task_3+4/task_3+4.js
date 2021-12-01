const select = document.querySelector('.select'), //список
      message = document.querySelector(".message-text"), //сообщения

      yearText = document.querySelector('.body-answer__year'), //поле "год"
      
      quarterText = document.querySelector('.body-answer__quarter'), //группа полей "квартал"
      quarterText_1 = document.querySelector('.body-answer__quarter-1'), //поле "квартал"
      quarterText_2 = document.querySelector('.body-answer__quarter-2'),
      quarterText_3 = document.querySelector('.body-answer__quarter-3'),
      quarterText_4 = document.querySelector('.body-answer__quarter-4'),
      
      salesText = document.querySelector('.body-answer__sales'), //группа полей "продажи"
      salesText_1 = document.querySelector('.body-answer__sales-1'), //поле "продажи"
      salesText_2 = document.querySelector('.body-answer__sales-2'),
      salesText_3 = document.querySelector('.body-answer__sales-3'),
      salesText_4 = document.querySelector('.body-answer__sales-4'),

      linkNode = document.querySelector('.body-answer__link'); //поле "ссылка"

let url = "https://my.api.mockaroo.com/revenue_2017-2019.json?key=fd36b440",
    trendUrl;

function useRequest (inUrl) {
    //экземпляр класса XHR
    let xhr = new XMLHttpRequest();
    //метод инициализации запроса
    xhr.open(`GET`, inUrl); 
    //обрабртчик ответа
    xhr.onload = function() {
        if (xhr.status != 200) {
            message.textContent = 'статус' + xhr.status;
        } else {
            let result;
            if (select.options[0].selected) {
                message.textContent = "<- Выберите год";
                //скрываем поля
                yearText.style.visibility = quarterText.style.visibility = 
                    salesText.style.visibility = linkNode.style.visibility = 'hidden';
            } else if (select.options[1].selected) {
                //результат запроса
                result = JSON.parse(xhr.response); 
                //нужный элемент
                displayResult(result[0]);
                //очищаем поле для сообщений 
                message.textContent = ''; 
                //формируем ссылку на график
                linkNode.innerHTML = `<a class="trendLink" href="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'],datasets:[{label:'Выручка за ${result[0].year}г.',data:[${result[0].sales.q1},${result[0].sales.q2},${result[0].sales.q3},${result[0].sales.q4}]}]}}">ГРАФИК</a>`;
            } else if (select.options[2].selected) {
                result = JSON.parse(xhr.response);
                displayResult(result[1]);
                message.textContent = '';
                linkNode.innerHTML = `<a class="trendLink" href="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'],datasets:[{label:'Выручка за ${result[1].year}г.',data:[${result[1].sales.q1},${result[1].sales.q2},${result[1].sales.q3},${result[1].sales.q4}]}]}}">ГРАФИК</a>`;
            } else if (select.options[3].selected) {
                result = JSON.parse(xhr.response);
                displayResult(result[2]);
                message.textContent = '';
                linkNode.innerHTML = `<a class="trendLink" href="https://quickchart.io/chart?c={type:'bar',data:{labels:['Кв.1','Кв.2','Кв.3','Кв.4'],datasets:[{label:'Выручка за ${result[2].year}г.',data:[${result[2].sales.q1},${result[2].sales.q2},${result[2].sales.q3},${result[2].sales.q4}]}]}}">ГРАФИК</a>`;
            };
        };
    };
    //обработчик ошибки
    xhr.onerror = function() {
        message.textContent = 'Ошибка:' + xhr.status;
    };
    //отправить запрос
    xhr.send(); 
}

function displayResult (apiData) {
    //проявляем таблицу
    yearText.style.visibility = 'visible';
    quarterText.style.visibility = 'visible';
    salesText.style.visibility = 'visible';
    linkNode.style.visibility = 'visible';
    //заполняем таблицу
    yearText.textContent = apiData.year;
    salesText_1.textContent = apiData.sales.q1;
    salesText_2.textContent = apiData.sales.q2;
    salesText_3.textContent = apiData.sales.q3;
    salesText_4.textContent = apiData.sales.q4;
}

document.querySelector(".btn").addEventListener('click', () => {
    useRequest (url);
});