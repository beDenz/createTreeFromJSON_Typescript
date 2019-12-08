import { Tree } from "./components/tree";
import { Jsonview } from "./components/jsonview";
import { tepmlateObject } from "./service/interfaces";
import { readFile } from "./service/service";

const item:tepmlateObject = {

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

const myTree:Tree = new Tree(item);

const treeview:HTMLElement | null = document.getElementById('treeview');

if (treeview) treeview.appendChild(myTree.drawTree());


const myJson:Jsonview = new Jsonview(item);


const fileInput:HTMLElement | null = document.getElementById("fileupload");

if (fileInput) fileInput.addEventListener('change', readFile, false);

