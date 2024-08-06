export class BaseGeneratedItem {
    public name?: string;

    constructor(name: string) {
        this.name = name;
    }

    getName() {
        return this.name ? this.name : '';
    }
}
