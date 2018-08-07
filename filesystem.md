# Работа с файловой системой

## Графика
Файлы именуются маленькими буквами без пробелов.

Имена файлов должны быть осмысленными. При чтении кода должно быть понятно, что в этом файле. Слова в названиях допускается разделять `-` или `_`:

```bash
# Плохо
Sidebar-Menu.png
splashPicture.png
Top Icon Footer.svg # вообще ад
bitmap.png # что тут лежит? Не понятно... Любой графический файл — это bitmap

# Хорошо
ico_sidebar-menu.png
bg_top-menu.png
bg_splash.png
bg_btn-primary.png
```

### Префиксы в именовании графики
Чтобы отличать содержимое файлов в именах используются префиксы:

```bash
ico_ # иконки, от слова icon
bg_  # фон, от слова background
```


### Расширение файлов
Используем трехбуквенные расширения:

```bash
# Плохо
bg_splash.jpeg

# Хорошо
bg_splash.jpg
```
