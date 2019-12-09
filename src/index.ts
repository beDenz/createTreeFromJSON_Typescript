import { Tree } from "./components/tree";
import { Jsonview } from "./components/jsonview";
import { tepmlateObject } from "./service/interfaces";
import { FileService } from "./components/fileservice";


// Начальный объект

let item:tepmlateObject = {

    name: "name1",
    id: "p1mpk3f7tpce4idr7cn3qq",
    attributes: {},
    childs: [
                {
                name: "name2",
                id: "cis9rl4wzxjpkwnjk5q6e",
                attributes: {},
               
                childs: [
                    {
                        name: "name3",
                        id: "6tmca7e30o3cd1qswhako",
                        attributes: {},
                      
                        childs: []
                    },
                    {
                        name: "name4",
                        id: "w4heojiuko8ecsxcqb1xs",
                        attributes: {},
                      
                        childs: [
                            {
                                name: "name5",
                                id: "8iiucha1zlyowlqjq08kem",
                                attributes: {},
                                
                                childs: []
                            },
                            {
                                name: "name6",
                                id: "vooykgx2czh5r6b436kr62",
                                attributes: {},
                                
                                childs: []
                            }
                        ]
                    },
                    {
                        name: "name7",
                        id: "d8milnv79v9cfjbfa9r4fq",
                        attributes: {},
                       
                        childs: []
                    }
                ]
                },
                {
                    name: "name8",
                    id: "izt56iisi5jykildjz10np",
                    attributes: {},
                 
                    childs: []
                },
                {
                    name: "name9",
                    id: "cw267dhpuuk9mgsw40cvb",
                    attributes: {},
                   
                    childs: []
                }
    ]
}

// Инициализация
const myTree:Tree = new Tree(item);
const myJson:Jsonview = new Jsonview(item);
const newFileService = new FileService;

const treeview:HTMLElement | null = document.getElementById('treeview');
if (treeview) treeview.appendChild(myTree.drawTree());

myTree.rerenderJsonObject = myJson.rerender.bind(myJson);
myTree.editInterfaceSetRender();

/*
    Здесь получилось не очень красиво с точки зрения "чистоты" классов
    Мне требовалось сделать одновременное отображение и графического дерева и JSON формата
    Для этого требовалось организовать "наблюдение" за объектом, и при его мутации обновлять 
    его вид. object.watch() - кривой, object.observe() - подошел бы, но его больше не поддерживают,
    остается только proxy, но с ней я знаком только по документации, и чтобы ей воспользоваться пришлось
    бы переписывать много кода, на это уже не было времени. Больше вариантов я не нашел, поэтому оставил
    этот костыль. 
*/



const downloadButton = document.getElementById("download");
if (downloadButton) downloadButton.addEventListener("click", (e) =>  { e.preventDefault(), newFileService.download(JSON.stringify(item))});

const fileInput:HTMLElement | null = document.getElementById("fileupload");

if (fileInput) fileInput.addEventListener('change', (e) => {
                                                            newFileService.readFile(e).then(res => {
                                                                item = { ...JSON.parse(res as string)};                                                               
                                                                myJson.json = item;
                                                                myTree.object = item;
                                                            });
                                                            myTree.rerender();
                                                            myJson.rerender();
                                                        }, false);

