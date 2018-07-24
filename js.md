# JavaScript
:::tip
На разных проектах правила и настройки линтера могут отличаться. Здесь собрана золотая середина.
:::

## Отступы
Для отступов используем пробелы.

Ширина отступа — 4 пробела.

## Переменные
### var
`var` не используем там, где есть поддержка ES6+.

### const
`const` используем для именования переменных, которым далее в коде не будет присвоено другое значение:

```js
const elementId = '#productGallery';
```

`const` прекрасно подходит для DOM-элементов. Даже если на элемент навесится событие, добавится класс, изменится свойство и пр. В переменную сохраняется ссылка на объект и эта ссылка будет постоянна. Это же касается массивов и объектов:

```js
// Это все ок
const $btn = $('#myButton');
$btn.on('click', ...);
const myObj = {};
myObj.myProp = 'hello';
```

Константы в глобальном окружении модуля (файла) именуем КАПСЛОКОМ:

```js
const ENV = 'development';
const PI = 3.14;
```

### let
`let` используем для переменных, значение которых в коде будет меняться:

```js
let name; // Объявили переменную, значение будет присвоено позже
// ...
name = getName();
```

### Объявление
Каждая переменная объявляется на своей строке со своим ключевым словом. Так код будет удобнее поддерживать, проще удалять объявления переменных или менять `const` на `let`:

```js
// Плохо, пачка переменных с одним ключевым словом и на одной строке
let menu, height, width;

// Хорошо, каждая переменная на свой строке и со значением
const menu = $('#menu');
const height = 100;
const width = 500;
```

Когда переменных много, бывает очень сложно разобраться, где заканчивается блок объявлений:

```js
const firstNumber = randomize(firstFrom, firstTo),
    step = randomize(stepFrom, stepTo),
    progression = generateProgression(firstNumber, step, numbersQty),
    emptyIndex = randomize(0, numbersQty),
    rightAnswer = progression[emptyIndex],
    rightAnswerIndex = randomize(0, answersQty),
    answers = generateAnswers(
        answersQty,
        rightAnswer,
        rightAnswerIndex,
        generateAnswer.bind(null, rightAnswer)
    );
```

## Инкремент/декремент
Вместо `++` используем более явное `+= 1`.

`++` можно использовать только в шаге цикла `for` (но не в его теле):

```js
let sum = 0;
for (let i = 0; i <= 10; i++) { // тут `++` ок
    sum += 1; // А тут уже надо `+=`
}
```

Операторы инкремента/декремента слишком путанно работают. Нужно тратить драгоценные секунды, чтобы сообразить, что вернет оператор, если будет находится до/после переменной.

## Кавычки
Используем одинарные кавычки. Двойные можно применять, если не хватает одинарных (по возможности избегаем экранирования):

```js
// Плохо:
"use strict";
$("a[href^=\"http://\"");

// Хорошо:
'use strict';
$('a[href^="http://"');
```

## Переводы строк
В конце строки не должно быть лишних пробелов.

Каждая строка должна заканчиваться символом перевода строки, в том числе последняя. То есть в конце файла должна быть пустая строка.

Это стандарт в UNIX-системах для файлов. Важно при работе в консоли (например, при объединении файлов) и считается вообще хорошим тоном.


## Блоки кода
### Отступ первой строки
В блоке кода (между скобками `{` и `}`) не отступаем строку сверху:

```js
// Плохо
function showFirstPoint() {

    renderPoint($firstItem);
    $firstItem.addClass('active');

    const itemId = $firstItem.data('point-id');
    renderInfo(itemId);
}

// Хорошо
function showFirstPoint() {
    renderPoint($firstItem);
    $firstItem.addClass('active');

    const itemId = $firstItem.data('point-id');
    renderInfo(itemId);
}
```

Допускается и рекомендуется отбивать пустой строкой логически связанные строки кода.

## Условные конструкции
### if/else
Блок `else` нужно начинать на той же строке, на которой закрывается блок `if`:

```js
// Плохо
if (width < 1025) {
    // do this 
}
else {
    // do that 
}

// Хорошо
if (width < 1025) {
    // do this 
} else {
    // do that 
}
```

### Защитное условие (паттерн guard clause)
Используйте защитное условие для упрощения `if/else` (оно же граничный оператор или [guard clause](https://refactoring.guru/ru/replace-nested-conditional-with-guard-clauses)):

```js
// Плохо, большой блок кода вложен в if
function doSomething() {
    if (isEverythingGood()) {
        // Много кода в случае, когда все хорошо
        // ...
        // ...
        // ...

        return SOME_VALUE;
    } else {
        return ANOTHER_VALUE;
    }
}

// Хорошо, большой блок кода вне ифа
function doSomething() {
    if (!isEverythingGood()) {
        return ANOTHER_VALUE;
    }

    // Много кода в случае, когда все хорошо
    // ...
    // ...
    // ...

    return SOME_VALUE;
}
```

Если первым делом обработать исключительный случай, то потом можно не беспокоиться и писать основной код не вкладывая его в `if`. К тому же уйдет и `else`. Кода станет меньше, читать его будет проще.

### Тернарный оператор
Тернарный оператор — сокращенная форма записи `if/else`. В некоторых случаях код с ним станет проще и короче:

```js
// Плохо, слишком много кода
let stickyHeaderHeight;
if (windowWidth < 1025) {
    stickyHeaderHeight = headerHeight;
} else {
    stickyHeaderHeight = stickyHeight;
}

// Хорошо, кода гораздо меньше
const stickyHeaderHeight = windowWidth < 1025 ? headerHeight : stickyHeight;
```

### Предикаты
Предикат — выражение, которое возвращает `true` или `false`. Предикат отвечает на какой-то вопрос: «Список пустой?», «Прямоугольник высокий (ширина меньше высоты)?» и т. д.

В коде предикат должен начинаться с `is`:

```js
// Плохо
const greaterWidth = (width, height) => width < height;
const listEmpty = listItems => listItems.length = 0;

// Хорошо
const isImageTall = (width, height) => width < height;
const isListEmpty = listItems => listItems.length = 0;
```

При чтении кода будет сразу ясно, что `isListEmpty(menuItems)` — предикат и возвращает булево значение.

## Переменные с классами и айдишниками
Классы и айдишники нужно сохранять в переменные без точки и решетки:

```js
const closeInfoBtn = 'shopInfoClose';
const addressItem = 'js-address-item';
const menuItemActive = 'menu__item_active';
```

Обращаться к элементам можно будет так:

```js
$infoItem.on('click', '#' + closeInfoBtn, this.closeInfoBlock);
$addressContainer.on('click', '.' + addressItem, this.setPoint);
```

Таким образом мы сможем без труда использовать эти переменные в манипуляциях, где не нужны точки и решетки:

```js
$menuItem.removeClass(menuItevActive);
```

