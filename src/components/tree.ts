import {tepmlateObject, funcConstuctorInterface} from "../service/interfaces";
import { EditInterface } from "./editinterface";


export class Tree {

    private _object:tepmlateObject;
    public funcConstuctor:funcConstuctorInterface = {
        add: (id:string):void => this._addItem(id),
        delete: (id:string):void => this._deleteItem(id),
        edit: (id:string):void => this._editItem(id)
    }

    constructor(objectTree:tepmlateObject) {
        
        this._object = {...objectTree};       

    }

    public get object():tepmlateObject {
        return this._object;
    }

    private _createTree(object:tepmlateObject):HTMLElement {

        let ulInner:HTMLUListElement = document.createElement('ul');
            ulInner.className = "ulInner";

        const element:HTMLElement = this._createElement(object.name, object.id).li;                      

        if (object.childs.length > 0) object.childs.forEach((item:tepmlateObject) => ulInner.appendChild(this._createTree(item)));
            
 
        if (ulInner.childNodes.length > 0) element.appendChild(ulInner);

     return element;
    }

    private _objectIterator(id:string, object:any = this._object, parentObject:tepmlateObject | undefined = undefined):any {

        let result:tepmlateObject | undefined;        

        if (object.id === id) return {object: object, parent:parentObject};
        parentObject = object
        
        object.childs.some((item:any) => result = this._objectIterator(id, item, parentObject));

        return result;
    }

    // TODO: изменить имена
    private _addItem(id:string):void {
 
        let element:HTMLElement | null = document.getElementById(id);
        let element2;
        const object:any = this._createElement('default name');
        const item:tepmlateObject = this._objectIterator(id).object;
        if (item && element) {
     
            item.childs.push(object.object);
            element2 = element.querySelector(".ulInner");
            if (element2) element2.appendChild(object.li) 
            else {
                const ulInner:HTMLElement = document.createElement('ul');
                      ulInner.className = "ulInner item-open";
                      ulInner.appendChild(object.li);
                element.appendChild(ulInner);

            }
        }
    }

    private _deleteItem(id:string):void {

        if(this._objectIterator(id).parent) {
            let element:HTMLElement | null = document.getElementById(id);
            if (element) element.remove();
            this._objectIterator(id).parent.childs = this._objectIterator(id).parent.childs.filter((item:any) => item.id !== id);
        } else console.log("This is main element");

    }

    private _editItem(id:string):void {
        console.log('edit', id);

        const editWindow:HTMLElement = this._createEditInterface(this._objectIterator(id).object);
        document.body.appendChild(editWindow);
}

    public drawTree(object:tepmlateObject = this._object):HTMLElement {
        let ulMain:HTMLUListElement = document.createElement('ul');
            ulMain.className = "ulMain";

        if (object) {
            const readyTree:HTMLElement = this._createTree(object);
            ulMain.appendChild(readyTree);
        }          

            return ulMain;
    }

    private _createElement(name:string, id:string = this._createID()):any {
     
        let span:HTMLSpanElement = document.createElement('span');
            span.className ='drawTree__title';
            
        let div:HTMLDivElement = document.createElement('div');
            div.className='display-flex tempBlock';

        let li:HTMLLIElement = document.createElement('li');
            li.className='drawTree__item';

       const itemInterfaceMenu:string[] = ['add', 'delete', 'edit'];

       let spanButton:HTMLSpanElement = document.createElement('span');
            spanButton.className ='drawTree__button';
            spanButton.textContent = "+";
            spanButton.addEventListener("click", (e) => 
       {
           
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

        span.textContent = name;
                    
        div.appendChild(span);

        const itemInterface:HTMLUListElement = document.createElement('ul');
            itemInterface.className = "itemInterface margin-left-15px";
            itemInterfaceMenu.forEach((item:string) => {
        
        const itemInterface__item:HTMLLIElement = document.createElement('li');
            itemInterface__item.innerHTML = item;
            itemInterface__item.className = "itemInterface__item";
            itemInterface__item.addEventListener("click", () => this.funcConstuctor[item](id));              
            itemInterface.appendChild(itemInterface__item);
        });

        div.appendChild(itemInterface);
        
        li.id = id;

        li.appendChild(div);


        return { li, object: this._createSubObject(name, id)};
    }

    private _createSubObject(name:string, id:string):tepmlateObject {
        return { name, id, attributes: [], childs: []}
    }

    private _createID():string {
        const id:string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        //console.log(id); 
        return id;
    }

    private _createEditInterface(object:tepmlateObject) {


        const title:HTMLElement = document.createElement('h3');
            title.textContent = "Edit element";
            title.className = "edit-interface__title";
        
        const editInterfaceCloseButton:HTMLElement = document.createElement('div');
            editInterfaceCloseButton.className = "edit-interface__closeButton btn";
            editInterfaceCloseButton.id = "editInterfaceCloseButton";
            editInterfaceCloseButton.textContent = "x";
            editInterfaceCloseButton.addEventListener("click", this._closeEditIterface);


        const headerDiv:HTMLElement = document.createElement('div');
            headerDiv.className = "edit-interface__header display-flex";
            headerDiv.appendChild(title);
            headerDiv.appendChild(editInterfaceCloseButton);


        const nameLabel:HTMLLabelElement = document.createElement('label');
            nameLabel.htmlFor = "name";
            nameLabel.textContent = "Name:"

        const nameInput:HTMLInputElement = document.createElement('input');
            nameInput.className = "edit-interface__input name";
            nameInput.placeholder = "Enter name element...";
            nameInput.id = "element-name";
            nameInput.value = object.name;

        function createAttributeDiv():HTMLElement {
                    const attrInputName:HTMLInputElement = document.createElement('input');
                        attrInputName.className = "edit-interface__input attribute-name";
                        attrInputName.placeholder = "Enter attribute...";
                        attrInputName.id = "attribute-name"; // TODO: убрать
                        attrInputName.setAttribute("myId", "attribute-name");
                    const attrInputProperty:HTMLInputElement = document.createElement('input');
                        attrInputProperty.className = "edit-interface__input property";
                        attrInputProperty.placeholder = "Enter property...";
                        attrInputProperty.id = "attribute-property"; // TODO: убрать
                        attrInputProperty.setAttribute("myId", "attribute-property");
                    const span:HTMLElement = document.createElement('span');
                        span.textContent = ":";
    
                    const divAttr:HTMLElement = document.createElement('div');
                        divAttr.className = "edit-interface__row display-flex flex-justify-space-between";
                        divAttr.appendChild(attrInputName);
                        divAttr.appendChild(span);
                        divAttr.appendChild(attrInputProperty);

                    return divAttr;
        }

        const divName:HTMLElement = document.createElement('div');
            divName.className = "edit-interface__row display-flex flex-align-center flex-justify-space-between";
            divName.appendChild(nameLabel);
            divName.appendChild(nameInput);

        const addAttributeBlockButton:HTMLElement = document.createElement('div');
            addAttributeBlockButton.textContent = "+";
            addAttributeBlockButton.className = "add-attribute-block-button btn margin-top-25px margin-0-auto";
            addAttributeBlockButton.addEventListener("click", () => windowWithInputs.appendChild(createAttributeDiv()));            
                        
        const submitButton:HTMLButtonElement = document.createElement('button');
            submitButton.className = "edit-interface__submit-button btn margin-top-25px";
            submitButton.textContent = "Submit";
            submitButton.type = "submit";

        const windowWithInputs:HTMLElement = document.createElement('div');
            windowWithInputs.id = "formInputs";
            windowWithInputs.className = "margin-top-25px";
            windowWithInputs.appendChild(divName);
            windowWithInputs.appendChild(createAttributeDiv());
        
        const window:HTMLElement = document.createElement('form');
            window.className = "edit-interface padding-20";
            window.id = "editIterface";
            window.appendChild(headerDiv);
            window.appendChild(windowWithInputs);
            window.appendChild(addAttributeBlockButton);
            window.appendChild(submitButton);
            window.addEventListener("submit", (e) =>  {    
                e.preventDefault();    
                  
                const target = e.target as HTMLInputElement;
                const arrayOfInputs:NodeListOf<HTMLInputElement> = target.querySelectorAll('input');
                const createObjectfromEditWindow = (array:NodeListOf<HTMLInputElement>):any => {
                
                    let windowObject: any = {
                        attributes: {}
                    };
                    let temp:string;

                    array.forEach((item:HTMLInputElement) => {
                        if (item.id === "element-name") windowObject.name = item.value 
                        if (item.id === "attribute-name") temp = item.value;
                        if (item.id === "attribute-property") windowObject.attributes[temp] = item.value;
                    });

                return windowObject;
                }  
                const thisObject:any = createObjectfromEditWindow(arrayOfInputs);              
                //object = { ...object, name: thisObject.name, attributes: {...object.attributes, ...thisObject.attributes} };
                object.name = thisObject.name;
                object.attributes = {...object.attributes, ...thisObject.attributes};
                this._closeEditIterface();
                })

        return window;


        //const temp = document.getElementById('mywindow');

        //if (temp) temp.appendChild(window);
    }

    private _closeEditIterface() {

        const editInterface = document.getElementById("editIterface");
        
        if (editInterface) editInterface.remove();

    }


    

}
