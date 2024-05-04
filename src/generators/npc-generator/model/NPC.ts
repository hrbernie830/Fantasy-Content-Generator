export class NPC {
    public gender?: string;
    public race?: string;
    public firstName?: string;
    public familyName?: string;
    public funFact?: string;
    static RACE_OPTIONS: string[] = ["Human", "Elf", "Dwarf", "Halfling", "Goblin", "Random"];

    public getGenderOrDefault(defaultString: string) {
        return this.getOrDefault(this.gender, defaultString);
    }

    public getRaceOrDefault(defaultString: string) {
        return this.getOrDefault(this.race, defaultString);
    }

    public getFirstNameOrDefault(defaultString: string) {
        return this.getOrDefault(this.firstName, defaultString);
    }

    public getFamilyNameOrDefault(defaultString: string) {
        return this.getOrDefault(this.familyName, defaultString);
    }

    public getFunFactOrDefault(defaultString: string) {
        return this.getOrDefault(this.funFact, defaultString);
    }


    private getOrDefault(field: string | undefined, defaultString: string): string {
        return field ? field: (defaultString ? defaultString : 'missing');
    }
}


export{}