import { tepmlateObject} from "../service/interfaces";

/*
    Класс описывающий окно редактирования элемента
*/



export class EditInterface {

    private _rerender:Function = () => {};
    
    constructor() {}
    
        private _closeEditIterface() {
    
            const editInterface = document.getElementById("editIterface");
            
            if (editInterface) editInterface.remove();

            this._rerender();
    
        }

        private _createAttributeDiv(name:string = "", property:string = ""):HTMLElement {

            const attrInputName:HTMLInputElement = document.createElement('input');
                attrInputName.className = "edit-interface__input attribute-name";
                attrInputName.placeholder = "Enter attribute...";
                attrInputName.setAttribute("data-id", "attribute-name");
                attrInputName.value = name;
                attrInputName.minLength = 1;
                attrInputName.maxLength = 10;
               

            const attrInputProperty:HTMLInputElement = document.createElement('input');
                attrInputProperty.className = "edit-interface__input property";
                attrInputProperty.placeholder = "Enter property...";
                attrInputProperty.setAttribute("data-id", "attribute-property");
                attrInputProperty.value = property;
                attrInputProperty.minLength = 1;
                attrInputProperty.maxLength = 10;
            const span:HTMLElement = document.createElement('span');
                span.textContent = ":";

            const divAttr:HTMLElement = document.createElement('div');
                divAttr.className = "edit-interface__row display-flex flex-justify-space-between";
                divAttr.appendChild(attrInputName);
                divAttr.appendChild(span);
                divAttr.appendChild(attrInputProperty);

            return divAttr;
        }

        private _createNameDiv(name:string):HTMLElement {
            const nameLabel:HTMLLabelElement = document.createElement('label');
                nameLabel.htmlFor = "name";
                nameLabel.textContent = "Name:"

            const nameInput:HTMLInputElement = document.createElement('input');
                nameInput.className = "edit-interface__input name";
                nameInput.placeholder = "Enter name element...";
                nameInput.id = "element-name";
                nameInput.value = name;

            const divName:HTMLElement = document.createElement('div');
                divName.className = "edit-interface__row display-flex flex-align-center flex-justify-space-between";
                divName.appendChild(nameLabel);
                divName.appendChild(nameInput);

            return divName;
        }

        private _createHeaderDiv():HTMLElement {
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
                
            return headerDiv;
        }

        private _createSubmitButton() {
            const submitButton:HTMLButtonElement = document.createElement('button');
                submitButton.className = "edit-interface__submit-button btn margin-top-25px";
                submitButton.textContent = "Submit";
                submitButton.type = "submit";
            return submitButton;                
        }
        
        private _createWindowWithInputs(NameDiv:HTMLElement, attributes:any):HTMLElement {
            const windowWithInputs:HTMLElement = document.createElement('div');
                windowWithInputs.id = "formInputs";
                windowWithInputs.className = "margin-top-25px";
                windowWithInputs.appendChild(NameDiv);
       
                if (Object.keys(attributes).length > 0) {
                    for (let key in attributes) {
                        windowWithInputs.appendChild(this._createAttributeDiv( key, attributes[key]));
                    }
                };
                //else windowWithInputs.appendChild(this._createAttributeDiv());

              //  
            return windowWithInputs;
        }

        private _createAddAttributeBlockButton(windowWithInputs:HTMLElement):HTMLElement {

            const addAttributeBlockButton:HTMLElement = document.createElement('div');
                addAttributeBlockButton.textContent = "+";
                addAttributeBlockButton.className = "add-attribute-block-button btn margin-top-25px margin-0-auto";
                addAttributeBlockButton.addEventListener("click", () => windowWithInputs.appendChild(this._createAttributeDiv()));
            return addAttributeBlockButton;
        }

        private _createObjectfromEditWindow(array:NodeListOf<HTMLInputElement>):any {
                    
            let windowObject: any = {
                attributes: {}
            };
            let temp:string;

            array.forEach((item:HTMLInputElement) => {
                if (item.id === "element-name") windowObject.name = item.value 
                if (item.getAttribute("data-Id") === "attribute-name" && item.value !== "") temp = item.value;
                if (item.getAttribute("data-Id") === "attribute-property" && item.value !== "") windowObject.attributes[temp] = item.value;
            });

        return windowObject;
        }
        private _submitForm(e:Event, object:tepmlateObject) {
            e.preventDefault();    
                      
            const target = e.target as HTMLInputElement;
            const arrayOfInputs:NodeListOf<HTMLInputElement> = target.querySelectorAll('input');

            const thisObject:any = this._createObjectfromEditWindow(arrayOfInputs);              
            //object = { ...object, name: thisObject.name, attributes: {...object.attributes, ...thisObject.attributes} }; // TODO: ????
            object.name = thisObject.name;
            object.attributes = {...object.attributes, ...thisObject.attributes};
            this._closeEditIterface();
        }

        public createEditInterface(object:tepmlateObject) {   

            const windowWithInputs:HTMLElement = this._createWindowWithInputs(this._createNameDiv(object.name), object.attributes);

            const window:HTMLElement = document.createElement('form');
                window.className = "edit-interface padding-20";
                window.id = "editIterface";
                window.appendChild(this._createHeaderDiv());
                window.appendChild(windowWithInputs);

                window.appendChild(this._createAddAttributeBlockButton(windowWithInputs));
                
                window.appendChild(this._createSubmitButton());
                window.addEventListener("submit", (e) => this._submitForm(e, object));
    
            return window;
        }

        public set rerender(func:Function) {
            this._rerender = func;
        }
}