# Интерфейс для создания дерева элементов.

### Typescript/HTML/SCSS/CSS

https://bedenz.github.io/createTreeFromJSON_Typescript/

Данное приложение представляет собой интерфейс для созданий и редактирования "дерева" элементов без ограничения пл их количеству и глубины вложенности.
Каждый элемент имеет имя, уникальный Id, неограниченное количество атрибутов и так же потомков. 

В окне браузера одновременно отображается графическая реализация "дерева" и в формате JSON.

Интерфейс позволяет выгрузить составленное дерево в виде файла в формате JSON, и в дальнейшем их загружать. На данный момент приложение работает, только со своим типов входящего объекта. 
Интерфейс сразу же отображает последние изменения в дереве элементов и в JSON формате.

Само приложение написано на Typescript, без использования сторонних библиотек. Собирается приложение при помощи Webpack.


Для дальнейшего развития проекта возможно:
 - переработать верстку, сделав ее более привлекательной и адаптивной.
 - переработать классы, сделать их более "не зависимыми"
 - написать класс для работы непосредственно с самим объектом, не хранить его в глобальном скопе
 - подписать все манипуляци с объектом через прокси, что позволит более гибко подходить к наблюдению за ним, и разгрузить другие классы от лишнех связей
 - подключить простой backend для хранения объекты на постоянной основе
