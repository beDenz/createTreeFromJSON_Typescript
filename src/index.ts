import classnames from "classnames";
import { link } from 'fs';



const item:tepmlateObject = {

    name: "name",
    attr: "attributes",
    temp: 1,
    childs: [
                {
                name: "name",
                attr: "attributes",
                temp: 2,
                childs: [
                    {
                        name: "name",
                        attr: "attributes",
                        temp:3,
                        childs: []
                    },
                    {
                        name: "name",
                        attr: "attributes",
                        temp: 4,
                        childs: [
                            {
                                name: "name",
                                attr: "attributes",
                                temp:5,
                                childs: []
                            },
                            {
                                name: "name",
                                attr: "attributes",
                                temp: 6,
                                childs: []
                            }
                        ]
                    },
                    {
                        name: "name",
                        attr: "attributes",
                        temp:7,
                        childs: []
                    }
                ]
                },
                {
                    name: "name",
                    attr: "attributes",
                    temp: 8,
                    childs: []
                },
                {
                    name: "name",
                    attr: "attributes",
                    temp: 9,
                    childs: []
                }
    ]
}

interface tepmlateObject {
     name: string;
     attr: string;
     childs?: tepmlateObject[];
     temp: number;
}

class Tree {
    constructor() {
    }

    public sayHello() {
        console.log("hello");
    }

    public createTree():any {
        let temp:any = document.createElement("h2");
        temp.innerHTML = "Hello";
       // console.log(temp);
        return temp;
    }

    public readTree(object:any):any {

        let ulInner:HTMLUListElement = document.createElement('ul');
            ulInner.className = "ulInner";

        let span:HTMLSpanElement = document.createElement('span');
            span.className ='drawTree__title';
        let div:HTMLDivElement = document.createElement('div');
            div.className='display-flex tempBlock';
        let li:HTMLLIElement = document.createElement('li');
            li.className='drawTree__item';

           const itemInterfaceMenu:string[] = ['add', 'delete', 'edit'];
          //  const id:string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

        for (let key in object) {
                            
               if (key === "name") {                      
                        
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
                   
                       
                        span.textContent = object[key] + object.temp;
                                        
                        div.appendChild(span);

                        const itemInterface:HTMLUListElement = document.createElement('ul');
                            itemInterface.className = "itemInterface margin-left-15px";

                            itemInterfaceMenu.forEach((item:string) => {
                            const itemInterface__item:HTMLLIElement = document.createElement('li');
                            itemInterface__item.innerHTML = item;
                            itemInterface__item.className = "itemInterface__item ";
                            itemInterface.appendChild(itemInterface__item);
                            });

                        div.appendChild(itemInterface);

                        li.appendChild(div);

                }         

                if (Array.isArray(object[key]) && (object[key].length > 0))  object[key].forEach((item:tepmlateObject) =>ulInner.appendChild(this.readTree(item)));
            }
 
        if (ulInner.childNodes.length > 0) li.appendChild(ulInner);

      
     //   return ulMain; //TODO: почему нельзя сразу вернуть ui.appendChild(li).
     return li;
    }

    public tempFunc(object:any):any {
        let ulMain:HTMLUListElement = document.createElement('ul');
            ulMain.className = "ulMain";


            const xxx:any = this.readTree(object);

            ulMain.appendChild(xxx);

            return ulMain;

    }
}

const myTree:Tree = new Tree;
const treeview:any = document.getElementById('treeview');

if (treeview) treeview.appendChild(myTree.tempFunc(item));


