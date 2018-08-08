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
// Плохо, пачка переменных с одним ключевым словом
let menu = $('#menu'),
    height = 100,
    width = 500;

// Хорошо, каждая переменная со своим ключевым словом
const menu = $('#menu');
let height = 100;
let width = 500;
```

Когда переменных много, бывает очень сложно разобраться, где заканчивается блок объявлений. Такой подход был популярен во времена `var`, но даже тогда у него было [достаточно](http://dropshado.ws/post/17210606192/varry-var-var) [критики](http://benalman.com/news/2012/05/multiple-var-statements-javascript/):

```js
// Плохо, одно ключевое слово на много переменных
const firstNumber = randomize(firstFrom, firstTo),
    step = randomize(stepFrom, stepTo),
    progression = generateProgression(firstNumber, step, numbersQty),
    emptyIndex = randomize(0, numbersQty),
    rightAnswer = progression[emptyIndex],
    rightAnswerIndex = randomize(0, answersQty),
    answers = generateAnswers(answersQty, rightAnswer);

// Хорошо, каждая переменная с ключевым словом
const firstNumber = randomize(firstFrom, firstTo);
const step = randomize(stepFrom, stepTo);
const progression = generateProgression(firstNumber, step, numbersQty);
const emptyIndex = randomize(0, numbersQty);
const rightAnswer = progression[emptyIndex];
const rightAnswerIndex = randomize(0, answersQty);
const answers = generateAnswers(answersQty, rightAnswer);
```

Почему так лучше:

- Код быстрее доходит. Сразу видно ключевое слово, не нужно глазами лезть вверх, чтобы узнать, `let` там или `const`.
- Не нужно следить, что в конце `;` или `,`.
- Проще добавлять и менять местами переменные.
- Не создается новых изменений в гите при замене `,` на `;` и наоборот. Об этом вообще не надо думать.

## Инкремент/декремент
Помимо увеличения переменной на единицу, операторы `++` и `--` возвращают разное значение в зависимости от расположения оператора:

```js
let a = 0;
let b = 0;
console.log(++a, b++); // 1, 0
```

Чтобы код оставался простым и понятным, операторы `++` и `--` должны использоваться _только для увеличения переменной на единицу_ и возвращаемое значение никак не должно влиять на код.

Код не должен зависеть от значения, которое возвращает инкремент/декремент:

```js
// Плохо: код зависит от возвращаемого значения декремента
let a = ++n;
a[i++] = n;
```

Переменную нужно изменять явно, вне выражения:

```js
// Плохо: декремент используется в выражении
let i = arr.length;
while (--i >= 0) {
    console.log(arr[i]);
}

// Хорошо: декремент изменяет индекс вне выражения
let index = arr.length - 1;
while(index >= 0) {
    console.log(arr[index]);
    index--;
}
```

В цикле `for` увеличение счетчика должно выполняться там, где это предусмотрено синтаксисом:

```js
// Плохо: i меняется в теле цикла, а не в позиции для счетчика;
// код зависит от возвращаемого значения декремента
for (var i = cls.length; i > 0;) {
    if (cls[--i] != className) { 
        // ...
    }
}

// Хорошо: i меняется в позиции счетчика цикла, как предусмотрено синтаксисом;
// код не зависит от возвращаемого значения декремента
for (var i = cls.length; i > 0; --i) {
    if (cls[i] != className) {
        ar[ar.length] = cls[i];
    }
}
```

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
Используем [строгое равенство и неравенство](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Операторы_сравнения#Операторы_равенства) (`===` и `!==`) не полагаясь на приведение типов:

```js
// Плохо: так isZero('') вернет true
const isZero = n => n == 0;

// Хорошо
const isZero = n => n === 0; // все ок
```

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
const greaterHeight = (width, height) => width < height;
const listEmpty = listItems => listItems.length === 0;

// Хорошо
const isImageTall = (width, height) => width < height;
const isListEmpty = listItems => listItems.length === 0;
```

При чтении кода будет сразу ясно, что `isListEmpty(menuItems)` — предикат и возвращает булево значение.

[Операторы сравнения](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Операторы_сравнения) `===`, `<`, `>` и т. д. возвращают либо `true`, либо `false`. Поэтому при использовании этих операторов достаточно вернуть результат выражения без использования `if/else`:

```js
// Плохо: много ненужного кода
function isListEmpty(listItems) {
    if (listItems.length === 0) {
        return true;
    } else {
        return false;
    }
}

// Хорошо: оператор сравнения `===` и так вернет нужное булево значение
const isListEmpty = listItems => listItems.length === 0;
```

:::tip Правило
Такая конструкция:

```js
if (ANYTHING) {
    return true;
} else {
    return false;
}
```

Равносильна такой:

```js
return ANYTHING;
```

Если `ANYTHING` вычисляется в `true`, то вернуть `true`; иначе вернуть `false` — это избыточно. Достаточно вернуть результат вычисления `ANYTHING`.
:::

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

