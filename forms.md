# Верстка форм
:::warning
Раздел в процессе обсуждения. Материал можно рассматривать как рекомендацию, но не как четкое руководство.
:::

## Общие сведения
- [Элемент `<form>` на MDN](https://developer.mozilla.org/ru/docs/Web/HTML/Element/form) + [другие элементы](https://developer.mozilla.org/ru/docs/Web/HTML/Element/form#See_also)

## Примеры и соглашения
Единой структуры для всех форм нет, слишком много частностей. Но имеется ряд рекомендаций, которым нужно следовать. Все зависит от сложности дизайна и функционала формы.

### Разметка
Практически всегда элементы формы (поля ввод, кнопки) должны быть обернуты в тэг `<form>`.

У тега `<form>` обязательно должен быть атрибут `action`. Если URL для него не определен, используйте `action="#"`. Даже когда нужно послать данные аяксом по какому-то URL, то стоит создать форму, прописать ей этот URL в атрибут `action` и брать его в JS для отправки данных.

Пример верстки формы поиска попроще:

```html
<div class="search">
    <form class="form search__form" action="/search.php">
        <div class="form__row">
            <input type="search" class="form__input form__input_search">
            <button class="form__btn form__btn_find">Найти</button>
        </div>
    </form> 
</div>
```

Пример верстки формы поиска посложнее (например, дизайн более замороченный):

```html
<div class="search">
    <form class="form search__form" action="/search.php">
        <div class="form__row">
            <div class="form__control">
                <input type="search" class="form__input form__input_search">
            </div>
            <div class="form__control">
                <button class="form__btn form__btn_find">Найти</button>
            </div>
        </div>
    </form> 
</div>
```

## Отправка на сервер
Должен быть `method`.

Нужны `name` филдам.

## Валидация и ошибки
Класс для ошибок.

Плагин для валидации.

HTML5 возможности.

## Подписи к элементам ввода
Подписи к элементам можно сделать с помощью тега [`label`](https://developer.mozilla.org/ru/docs/Web/HTML/Element/label). Использовать его предпочтительнее, чем атрибут `placeholder`.

Задача `label` — активировать элемент ввода при клике. Этого можно добиться или вложив элемент ввода внутрь или через атрибут `for`:

```html
<!-- Вложили элемент ввода в label -->
<label>
    Поиск:
    <input type="search" class="form-input form-input_search">
</label>

<!-- Использовали атрибут `for` -->
<label for="searchField">Поиск:</label>
<input id="searchField" type="search" class="form-input form-input_search">
```

## Автозаполнение
По-умолчанию браузер пытается заполнить элементы формы самостоятельно. Это хорошо, упрощает жизнь пользователю. Но иногда это бывает не нужно.

Чтобы убрать автозаполнение, используйте атрибут `autocomplete="off"` для формы или элемента ввода.

