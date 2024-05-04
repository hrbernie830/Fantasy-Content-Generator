export class Inn {
    public name?: string;
    public description?: string;
    public rumors?: string[];

    constructor(name: string, description: string, rumors: string[]) {
        this.name = name;
        if(description) {
            this.description = description.charAt(0).toUpperCase() + description.slice(1);
        }
        
        this.rumors = rumors;
    }
}


export{}