**ДЗ — «Мультимедиа»**

Сборка проекта: 
- Запуск видео-сервера — video-server 
  - npm i
  - npm start
- Сборщик 
   - npm i
   - gulp
   
   http://localhost:9000/camera.html 
     
- Страница с выводом потокового видео -   
  - src/pages/camera.twig
  - контент и стили - src/blocks/camera
  
- Скрипты - src/scripts/camera.js
  - для каждого элемента с классом js-camera создается экземпляр класса Camera
  - контроллеры вынесены в отдельный объект
  
Сделано:
- На странице 4 карточки с видео
- При клике на карточку видео разворачивается на весь экран
- Анимация происходит с помощью изменение свойств transform rotate и scale ( will-change при ховере )
- Чтобы свернуть видео можно нажать на ESC или на кнопку "Все камеры"
- Фильтры реализованы через css свойство filter contrast / brightness 
- Для управления фильтрами было добавлена 2 контроллера (input type="range")
- Анализ звука происходит при помощи анализа частот window.AudioContext
- Для построения графика была использована библиотека ChartJs (CDN)
- Для часто срабатывающих событий был добавлен дебаунс 