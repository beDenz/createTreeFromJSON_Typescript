
export function readFile(upload:any):any {
    
    const target:HTMLInputElement = upload.target as HTMLInputElement;  

    let reader = new FileReader();

    if (target && target.files) {                
                reader.readAsText(target.files[0]);

                reader.onload = function() {
                    const result:string = reader.result as string;
                    const json:HTMLElement | null = document.getElementById('json');
                   // if (json) myJson.drawJson(result);
                };

                reader.onerror = function() {
                    console.log(reader.error);
                }; 
   }

}