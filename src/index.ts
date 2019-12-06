import classnames from "classnames";


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
     childs: tepmlateObject[];
     temp: number;
   // [key:string]:tepmlateObject[keyof tepmlateObject];
    }


class Tree {

    private _object:tepmlateObject | undefined;

    constructor() {

      //  console.log(JSON.stringify(item));
    }

    private _readTree(object:any):HTMLElement {

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
                   
                       
                        span.textContent = object[key].toString() + object.temp;
                                        
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

                if (Array.isArray(object[key]) && (object[key].length > 0))  object[key].forEach((item:tepmlateObject) => ulInner.appendChild(this._readTree(item)));
            }
 
        if (ulInner.childNodes.length > 0) li.appendChild(ulInner);

      
     //   return ulMain; //TODO: почему нельзя сразу вернуть ui.appendChild(li).
     return li;
    }

    public drawTree(object:any):any {
        let ulMain:HTMLUListElement = document.createElement('ul');
            ulMain.className = "ulMain";

        if (object) {
            const readyTree:HTMLElement = this._readTree(object);
            ulMain.appendChild(readyTree);
        }
            

            return ulMain;

    }
}

const myTree:Tree = new Tree;
const treeview:any = document.getElementById('treeview');

if (treeview) treeview.appendChild(myTree.drawTree(item));



const fileInput:any = document.getElementById("fileupload");

if (fileInput) fileInput.addEventListener('change', readFile, false);

function readFile(upload:any) {
    
    const target:HTMLInputElement = upload.target as HTMLInputElement;
  

    let reader = new FileReader();

    if (target && target.files) {
    
                reader.readAsText(target.files[0]);

                reader.onload = function() {
                    const result:string = reader.result as string;
                    //console.log( typeof reader.result);
                    console.log(JSON.parse(result));
                };

                reader.onerror = function() {
                    console.log(reader.error);
                };
 
   }
      
   
 
  
}