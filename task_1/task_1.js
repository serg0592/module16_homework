let counter = 0, newPos = 0,
    list = [],
    position = {}; //номер начала тэга <student> в xml-строке

//переменные для DOM-узлов
let listNode,
    studentNode,
    nameNode,
    firstNameNode,
    secondNameNode,
    ageNode,
    profNode,
    langAttrNode;

//xml-строка
const xmlString = `
<list>
<student>
<name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
</name>
<age>35</age>
<prof>teacher</prof>
</student>
<student>
<name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
</name>
<age>58</age>
<prof>driver</prof>
</student>
</list>
`;

//функция-конструктор для объектов "студент"
function Student(firstName, secondName, age, prof, lang) {
    this.name = firstName + ` ` + secondName;
    this.age = age;
    this.prof = prof;
    this.lang = lang;
}

//экземпляр класса DOMParser
const parser = new DOMParser();

//вычисление кол-ва нужных узлов в xml-строке
do { 
    if (xmlString.indexOf(`<student>`, newPos) > 0) {
        counter ++;
        position[`pos_${counter}`] = xmlString.indexOf(`<student>`, newPos);
        newPos = xmlString.indexOf(`<student>`, newPos) + 9;
        i = 1;
    } else {
        i = 0;
    }
} while (i != 0);

//парсинг xml
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

//получение DOM-узлов
listNode = xmlDOM.querySelector("list");

for (i = 1; i <= counter; i++) { //получение нужных DOM-узлов и данных из них
    if (studentNode = listNode.querySelector("student")) {
        nameNode = studentNode.querySelector("name");
        firstName = nameNode.querySelector("first").textContent;
        secondName = nameNode.querySelector("second").textContent;
        age = studentNode.querySelector("age").textContent;
        prof = studentNode.querySelector("prof").textContent;
        langAttrNode = nameNode.getAttribute("lang");

        //формирование массива объектов "студент"
        list[`student_${i}`] = new Student(firstName, secondName, age, prof, langAttrNode);
    };

    //удаление полученного DOM-узла
    studentNode.parentNode.removeChild(studentNode);
};
console.log(list);