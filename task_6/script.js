const firstPromise = new Promise((resolve, reject) => {
    //timeout запроса
    setTimeout(() => {
        //генерация числа 1..100
        var number = Math.round(Math.random() * 100) + 1;
        console.log(number);
        //проверка числа на кратность 2
        if ((number % 2) === 0) {
            resolve(`${number}`);
        } else {
            reject(`${number}`);
        }
    }, 3000);
})

firstPromise
    .then((result) => {
        console.log(`Завершено успешно! Сгенерированное число -`, result);
    })
    .catch((error) => {
        console.log(`Завершено с ошибкой! Сгенерированное число -`, error);
    });