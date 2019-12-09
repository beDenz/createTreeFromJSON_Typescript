import {tepmlateObject} from "../service/interfaces";


export class Jsonview {

    private _object:tepmlateObject;
    private _json:string;

    constructor(objectTree:any) {
        this._object = objectTree;
        this._json = JSON.stringify(this._object);
        this.drawJson(this._json);
    }

    public set json(object:tepmlateObject) {
        this._json = JSON.stringify(object);
    }    

    public drawJson(jsonString:string):void {
        const jsonDiv:HTMLElement = document.createElement('div');
        if (jsonString) jsonDiv.innerText = jsonString;
        const json:HTMLElement | null = document.getElementById('json');
        if (json) json.appendChild(jsonDiv);
    }

    public rerender(object:string = this._json) {
        
        /*
         * Метод перерисовыет DOM, вызывается при изменнении объекта
         */

        const render = document.getElementById("json");
        if (render) {            
            render.children[1].remove();
           setTimeout(()=>{
               this.drawJson(object);
            }, 1);
        }

    }
}

