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

По возможности используем [guard clause](https://refactoring.guru/ru/replace-nested-conditional-with-guard-clauses):

```js
// Плохо, лишний `else`
const assertString = (str) => {
    if (typeof str === 'string') {
        return true;
    } else {
        return false;
    }
}

// Хорошо. То же самое, но код чище
const assertString = (str) => {
    if (typeof str !== 'string') {
        return false;
    }

    return true;
}
```

## Тернарный оператор
Тернарный оператор:

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
