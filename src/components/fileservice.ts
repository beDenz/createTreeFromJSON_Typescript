
/*
 * Класс для работы с файлами 
 * Простые функции загрузки/выгрузки json файла, без бэкенда, без хранения на сервере
 */


export class FileService {
        constructor() {
        }

        public download(data:string) {
            const file = new Blob([data], {type: 'text/plain'});
            const url = URL.createObjectURL(file);

            const a = document.createElement("a");          
                a.href = url;
                a.download = "tree.json";
                document.body.appendChild(a);
                a.click();

            setTimeout(function() {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);  
            }, 0); 
        }

        public readFile(upload:Event) {
            const target:HTMLInputElement = upload.target as HTMLInputElement;
            let reader = new FileReader();
            
            return new Promise((resolve, reject)=> {
                        if (target && target.files) reader.readAsText(target.files[0]);

                        reader.onerror = () => reject(console.log(reader.error));
                        reader.onload = () => {resolve(reader.result)};    
                    })}


    }