export interface tepmlateObject {
    name: string;
    id: string;
    attr: string;
    childs: tepmlateObject[];
    temp: number;
  // [key:string]:tepmlateObject[keyof tepmlateObject];
   }

export interface funcConstuctorInterface {
   [key:string] : (id:string) => void;
}