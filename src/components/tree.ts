import {tepmlateObject, funcConstuctorInterface} from "../service/interfaces";
import { EditInterface } from "./editinterface";


export class Tree {

    private _object:tepmlateObject;

    private _funcConstuctor:funcConstuctorInterface = {
        add: (id:string):void => this._addItem(id),
        delete: (id:string):void => this._deleteItem(id),
        edit: (id:string):void => this._editItem(id)
    }
    private _editInteface:EditInterface;

    private _rerenderJsonObject:Function = () => {};


    constructor(objectTree:tepmlateObject) {
    
        this._object = objectTree;
        //this._object = {... objectTree};
        this._editInteface = new EditInterface;
   
    }

    private _createTree(object:tepmlateObject):HTMLElement {

        /*
         *  Метод обходит входящий массив и строит по его структуре дерево  
         */

        let ulInner:HTMLUListElement = document.createElement('ul');
            ulInner.className = "ulInner item-open";

        const element:HTMLElement = this._createElement(object.name, object.id, object.childs.length).li;                      

        if (object.childs.length > 0) object.childs.forEach((item:tepmlateObject) => ulInner.appendChild(this._createTree(item)));
            
 
        if (ulInner.childNodes.length > 0) element.appendChild(ulInner);

     return element;
    }

    private _createItemInterfaceMenu(id:string) {

        /**
         *  Создание интерфейс кнопок
         */

        const itemInterfaceMenu:string[] = ['add', 'delete', 'edit'];
        
        const itemInterface:HTMLUListElement = document.createElement('ul');
            itemInterface.className = "itemInterface margin-left-15px";
            itemInterfaceMenu.forEach((item:string) => {
    
        const itemInterface__item:HTMLLIElement = document.createElement('li');
            itemInterface__item.innerHTML = item;
            itemInterface__item.className = "itemInterface__item";
            itemInterface__item.addEventListener("click", () => this._funcConstuctor[item](id));              
            itemInterface.appendChild(itemInterface__item);
        });
        return itemInterface;
}

    private _objectIterator(id:string, object:any = this._object, parentObject:tepmlateObject | undefined = undefined):any {

        /*
         *  Поиск объетка по его ID, возвращает объект содержащий искомый объект и его "родителя" 
         */

        let result:tepmlateObject | undefined;        

        if (object.id === id) return {object: object, parent:parentObject};

        parentObject = object
        
        object.childs.some((item:any) => result = this._objectIterator(id, item, parentObject));

        return result;
    }

    private _addItem(id:string):void {
        
        /**
         * 
         * Добавление новго обьекта
         * 
         */
        const object:any = this._createElement('default name');

        const item:tepmlateObject = this._objectIterator(id).object;

        item.childs.push(object.object);

        // Запуск перерисовки 

        this.rerender();  
        this._rerenderJsonObject(JSON.stringify(this._object));
    }

    private _deleteItem(id:string):void {

        /*
         *  Метод удаления объекта
         *  корневой элемент удалить нельзя, да и в этом нет смысла
         */

        if(this._objectIterator(id).parent) {

            this._objectIterator(id).parent.childs = this._objectIterator(id).parent.childs.filter((item:any) => item.id !== id);
        } else console.log("This is main element"); 

        this.rerender();
        this._rerenderJsonObject(JSON.stringify(this._object));

    }

    private _editItem(id:string):void {

        /**
         * 
         * Метод вызывает окно редактирования элемента
         * 
         */

        const editWindow:HTMLElement = this._editInteface.createEditInterface(this._objectIterator(id).object);
        document.body.appendChild(editWindow);

        this.rerender();
        this._rerenderJsonObject(JSON.stringify(this._object));
}
    private _createElement(name:string, id:string = this._createID(), numberOfChildren:number = 0):any {

        /**
         *  Метод создает элементы дерева
         */
     
        const span:HTMLSpanElement = document.createElement('span');
            span.className ='drawTree__title';
            span.textContent = name;

        const div:HTMLDivElement = document.createElement('div');
            div.className='display-flex tempBlock';

        const li:HTMLLIElement = document.createElement('li');
            li.className='drawTree__item';
            li.id = id;

        const spanButton:HTMLSpanElement = document.createElement('span');
            spanButton.className ='drawTree__button';
            numberOfChildren > 0 ? spanButton.textContent = "-": spanButton.textContent = "*";
            spanButton.addEventListener("click", (e) => {
           
            const target = e.target as HTMLElement;

            if (target.parentElement) {
               if (target.parentElement.nextElementSibling) 
               {                                  
                   target.parentElement.nextElementSibling.classList.toggle('item-open');
                   target.textContent === "-" ? target.textContent = "+" : target.textContent = "-";      
               }
           } 
       });

        
        div.appendChild(spanButton);  
        div.appendChild(span);
        div.appendChild(this._createItemInterfaceMenu(id));      

        li.appendChild(div);

        return { li, object: this._createSubObject(name, id)};
    }

    private _createSubObject(name:string, id:string):tepmlateObject {
        return { name, id, attributes: [], childs: []}
    }

    private _createID():string {
        // Генератор уникального ID
        const id:string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return id;
    }

    public set object(object:tepmlateObject) {
        this._object = object;
    }

    public drawTree(object:tepmlateObject = this._object):HTMLElement {

        /*
        * Метод создает корневой блок и добавляет в себя дерево объектов
        */

        let ulMain:HTMLUListElement = document.createElement('ul');
            ulMain.className = "ulMain";

        if (object) {
            const readyTree:HTMLElement = this._createTree(object);
            ulMain.appendChild(readyTree);
        }          

            return ulMain;
    }

    public rerender() {
        
        /*
         * Метод перерисовыет DOM, вызывается при изменнении объекта
         */

        const render = document.getElementById("treeview");
        if (render) {            
            render.children[1].remove();
           setTimeout(()=>{
               render.appendChild(this.drawTree());
            }, 1);
        }

    }

    public set rerenderJsonObject(func:Function) {
        this._rerenderJsonObject = func;
    }

    public editInterfaceSetRender() {
        this._editInteface.rerender = () => {
            this.rerender();
            this._rerenderJsonObject(JSON.stringify(this._object));
        }
    }

}