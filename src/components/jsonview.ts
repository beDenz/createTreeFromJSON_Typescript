import {tepmlateObject} from "../service/interfaces";


export class Jsonview {

    private _object:tepmlateObject | undefined;
    private _json:string;

    constructor(objectTree:any) {
        this._object = { ...objectTree};
        this._json = JSON.stringify(this._object);
        this.drawJson(this._json);

    }

    public set json(object:any) {
        this._json = JSON.stringify(this._object);
    }

    public drawJson(jsonString:string):void {
        const jsonDiv:HTMLElement = document.createElement('div');
        if (jsonString) jsonDiv.innerText = jsonString;
        const json:HTMLElement | null = document.getElementById('json');
        if (json) json.appendChild(jsonDiv);
    }
}