import { BaseGeneratedItem } from "src/types/base/BaseGeneratedItem";

export class Inn extends BaseGeneratedItem {
    public description?: string;
    public rumors?: string[];

    constructor(name: string, description: string, rumors: string[]) {
        super(name);
        this.description = description.charAt(0).toUpperCase() + description.slice(1);
        this.rumors = rumors;
    }
}


export{}