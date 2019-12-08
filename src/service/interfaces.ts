export interface tepmlateObject {
    name: string;
    id: string;
    attributes: any;
    childs: tepmlateObject[];
  // [key:string]:tepmlateObject[keyof tepmlateObject];
   }

export interface funcConstuctorInterface {
   [key:string] : (id:string) => void;
}