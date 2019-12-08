import { tepmlateObject} from "../service/interfaces";


export class EditInterface {
    
    constructor() {}



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
    
            const divName:HTMLElement = document.createElement('div');
                divName.className = "edit-interface__row display-flex flex-align-center flex-justify-space-between";
                divName.appendChild(nameLabel);
                divName.appendChild(nameInput);
    
            const addAttributeBlockButton:HTMLElement = document.createElement('div');
                addAttributeBlockButton.textContent = "+";
                addAttributeBlockButton.className = "add-attribute-block-button btn margin-top-25px margin-0-auto";
                addAttributeBlockButton.addEventListener("click", () => windowWithInputs.appendChild(this._createAttributeDiv()));            
                            
            const submitButton:HTMLButtonElement = document.createElement('button');
                submitButton.className = "edit-interface__submit-button btn margin-top-25px";
                submitButton.textContent = "Submit";
                submitButton.type = "submit";
    
            const windowWithInputs:HTMLElement = document.createElement('div');
                windowWithInputs.id = "formInputs";
                windowWithInputs.className = "margin-top-25px";
                windowWithInputs.appendChild(divName);
                windowWithInputs.appendChild(this._createAttributeDiv());
            
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

        }
    
        private _closeEditIterface() {
    
            const editInterface = document.getElementById("editIterface");
            
            if (editInterface) editInterface.remove();
    
        }


        private _createAttributeDiv():HTMLElement {
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


}