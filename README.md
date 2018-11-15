**ДЗ — «БЕМ»**
----

Запуск проекта:

 - ``npm i``
 - ``npm start`` 

 localhost:3000

---
Проект создан при помощи create-react-app

Структура 
 src:
 - assets
   - fonts  
   - img  
   - json 
 - blocks (Блоки реакт компонентов)
    - block
        - block.js 
        - block.scss 
        - _mod 
        - _type 
  - scripts (Глобальные скрипты)
  - styles (Глобальные стили)
  - index.js
  - serviceWorker.js
  
  ---
  Классы написаны при помощи @bem-react/classname.  Оставил классы JsClassName  для связи элементов с js.
  
  @bem-react/core используется у компонента кнопки — 
  src/blocks/btn/btn.js и у компонента карточки — src/blocks/card/card.js
  
   @bem-react/di используется для компонента камеры — src/blocks/camera
   
  Определяется тип устройства и загружаются нужные файлы для компонента внутри карточки
  
