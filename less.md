# LESS

## Именование файлов
Файлы стилей (CSS, LESS, SASS и пр.) именуются маленькими буквами через `-` (kebab-case):

```bash
# Плохо
TopMenuStyle.less
Media.less
top_menu.less

# Хорошо
top-menu.less
media.less
```

## Отступы
Отступы нужны перед `{` и после `:`

```less
// Плохо:
.hader{
    padding:0 20px;
}

// Хорошо:
.header {
    padding: 0 20px;
}
```

Каждый элемент и модификатор блока нужно отделять пустой строкой:

```less
// Плохо, элементам тесновато:
.menu {
    padding: 0 20px;
    &__item {
        color: #000;
    }
    &__link {
        color: #F00;
    }
}

// Хорошо, элементам просторно и удобно:
.menu {
    padding: 0 20px;

    &__item {
        color: #000;
    }

    &__link {
        color: #F00;
    }
}
```

Перед каждым блоком так же должен быть отступ:

```less
// Плохо, блоки слиплись:
.header {
    padding: 0 20px;
}
.menu {
    background: #CCC;   
}

// Хорошо, блоки отделены пустой строкой:
.header {
    padding: 0 20px;
}

.menu {
    background: #CCC;   
}
```
## Строки
Каждое правило должно быть на отдельной строке:

```less
// Плохо, стили для псевдоэлементов на одной строке:
.header {
    &::before, &::after {
        // ...
    }
}

// Хорошо:
.header {
    &::before,
    &::after {
        // ...
    }
}
```

## Именование
Если название блока, элемента или модификатора состоит из нескольких слов, то они разделяются дефисом `-`:

```less
// Плохо:
.topMenu {}
.top_menu {}

// Хорошо:
.top-menu {}
```

Важно, чтобы название БЭМ-сущности сохранялось целиком. Нельзя делить название с помощью ссылки на родительский селектор `&`:

```less
/* Плохо: */
.profile {
    &__card {
        &:extend(.clearfix all);

        &-text { /* Так нельзя! Это уже другой элемент. */
        }
    }
} 

/* Хорошо: */
.profile {
    &__card {
        &:extend(.clearfix all);
    }

    &__card-text { /* Так можно. */
    }
}
```

Важно понимать, что в примере выше `profile__card` и `profile__card-text` — разные элементы блока `profile`. Каждый из них принадлежит только блоку `profile`. Элемент не может принадлежать другому элементу и это нужно отражать в коде.

К тому же в процессе поддержки при поиске `__card-text` по проекту ничего не найдется.

## Единицы измерения
Первый `0` в величинах меньше `1` опускается:

```less
// Плохо:
.text {
    font-size: 0.8em;
}

// Хорошо:
.text {
    font-size: .8em;
}
```

## Переменные
Переменные нужно объявлять до импорта файлов, в которых они могут использоваться:

```less
@fa-grey: #707070;
@fa-pink: #f20090;

@import (reference) '../../common/less/fonts';

/* Объявленные выше переменные используются в импортируемых ниже файлах */
@import './menu';
```
Переменные, необходимые только в определенном файле или модуле не нужно выносить в общий файл с миксинами и переменными, общими для всех модулей.

## Порядок свойств
Код читается проще, когда свойства сгруппированы по смыслу. Так, если мы видим `position: absolute`, то ожидаем следом увидеть конкретные значения для `top`, `right` и т.д. Если они указаны где-то дальше, то их можно пропустить.

```less
// Плохо, разнобой в свойствах:
.some-class {
    position: absolute;
    margin: 0;
    font-size: 1.6rem;
    left: 20px;
    background: #f00;
    font-weight: bold;
    top: 3px;
}

// Хорошо, свойства собраны по смыслу:
.some-class {
    position: absolute;
    top: 3px;
    left: 20px;
    margin: 0;
    font-weight: bold;
    font-size: 1.6rem;
    background: #f00;
}

```

Рекомендуется такая последовательность групп свойств:

```less
.some-class {
    // Миксины
    .align();  

    // Генерируемое содержимое
    content: '';

    // Позиционирование
    position: absolute; 
    // Расположение от верха и по часовой стрелке
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;

    // Блочная модель
    // `display` не нужен для плавающих элементов (float), абсолютно
    // или фиксированно спозиционированных (position: absolute|fixed|sticky)
    display: block;
    width: 100%;
    height: 5rem;
    padding: .6rem;
    margin: 2rem;

    // Свойства текста 
    .font(3);
    color: #000;
    text-transform: uppercase;

    // Внешний вид
    background: url(../images/loader.gif) no-repeat center;
    background-color: @color-white;
    opacity: .5;

    // ...
}
```

## Переопределение и дополнение отступов
Если нужно дополнить или переопределить отступы для медиа-выражения (например, для десктопа задан отступ слева и нужно изменить его для мобилы), то изменяем только необходимые значения, не переписывая свойство целиком:

```less
// Задача: для @mobile обнулить левый отступ и добавить правый 3rem.

label {
    padding: 0 0 0 10px;

    // Плохо: переопределены все значения, в том числе верхние и нижние,
    // которые к задаче не относятся
    @media @mobile {
        padding: 0 0 0 3rem;
    }

    // Хорошо: переопределены только необходимые значения
    @media @mobile {
        padding-left: 0;
        padding-right: 3rem;
    }
}
```

## Псевдоэлементы `before` и `after`
Сначала объявляются общие стили для обоих псевдоэлементов, потом для `before`, потом для `after`:

```less
// Не правильно: общие стили не вынесены, after расположен перед before
.lines {
    background: #f00;

    &::after {
        content: '';
        height: 2px;
        background: #fff;
        position: absolute;
        width: 100%;
        bottom: 0;
    }

    &::before {
        content: '';
        height: 2px;
        background: #fff;
        position: absolute;
        top: 0;
        width: 100%;
    }   
}

// Правильно
.lines {
    background: #f00;

    &::before,
    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background: #fff;
    }   

    &::before {
        top: 0; 
    }   

    &::after {
        bottom: 0;
    }   
}
```

## Кавычки
Используем одинарные кавычки вместо двойных:

```less
// Плохо
@import "vars";
@mobile: ~"(max-width: 767px)";

// Хорошо
@import 'vars';
@mobile: ~'(max-width: 767px)';
```

## Флексбоксы
Для флексбоксов используем полифил [flexibility](https://github.com/jonathantneal/flexibility). Версия 2.0.1 бажит. Возможно в следующих версиях проблему решат, но пока лучше использовать версию [1.0.6](https://github.com/jonathantneal/flexibility/releases/tag/v1.0.6).

Версия 2.x работает через модули, версии 1.x нужно подключать руками.

Для работы flexibility нужно прописывать свойство -js-display: flex дополнительно. В коде этого делать не рекомендуется, лучше подключить плагин [PostCSS Flexibility](https://github.com/7rulnik/postcss-flexibility), который будет работать аналогично автопрефиксеру и сам добавит свойство с префиксом:

```less
// Плохо
.footer-links {
    -js-display: flex;
    display: flex;
}

// Хорошо
.footer-links {
    display: flex; /* подключили в сборщике плагин PostCSS Flexibility */
}
```

PostCSS Flexibility анализирует комментарии. Такой код плагин пропустит и -js-display: flex; не добавится:

```less
.footer-links {
    /* flexibility-disable */
    display: flex;
}
```

Нужно иметь ввиду, что Вебпак при минификации (запуск `webpack -p` или вызов `UglifyJsPlugin`) переводит все лоадеры в режим сжатия. А в режиме сжатия `less-loader` удаляет комментарии.

Комментарии нам нужны в последующей обработке CSS, поэтому нужно явно отключить компрессию для `less-loader`-a:

```js
loader: ExtractTextPlugin.extract("style", 'css!postcss!less?compress=false')
```

