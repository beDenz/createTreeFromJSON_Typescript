import { Tree } from "./components/tree";
import { Jsonview } from "./components/jsonview";
import { tepmlateObject } from "./service/interfaces";
import { readFile } from "./service/service";

const item:tepmlateObject = {

    name: "name",
    id: "p1mpk3f7tpce4idr7cn3qq",
    attr: "attributes",
    temp: 1,
    childs: [
                {
                name: "name",
                id: "cis9rl4wzxjpkwnjk5q6e",
                attr: "attributes",
                temp: 2,
                childs: [
                    {
                        name: "name",
                        id: "6tmca7e30o3cd1qswhako",
                        attr: "attributes",
                        temp:3,
                        childs: []
                    },
                    {
                        name: "name",
                        id: "w4heojiuko8ecsxcqb1xs",
                        attr: "attributes",
                        temp: 4,
                        childs: [
                            {
                                name: "name",
                                id: "8iiucha1zlyowlqjq08kem",
                                attr: "attributes",
                                temp:5,
                                childs: []
                            },
                            {
                                name: "name",
                                id: "vooykgx2czh5r6b436kr62",
                                attr: "attributes",
                                temp: 6,
                                childs: []
                            }
                        ]
                    },
                    {
                        name: "name",
                        id: "d8milnv79v9cfjbfa9r4fq",
                        attr: "attributes",
                        temp:7,
                        childs: []
                    }
                ]
                },
                {
                    name: "name",
                    id: "izt56iisi5jykildjz10np",
                    attr: "attributes",
                    temp: 8,
                    childs: []
                },
                {
                    name: "name",
                    id: "cw267dhpuuk9mgsw40cvb",
                    attr: "attributes",
                    temp: 9,
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

