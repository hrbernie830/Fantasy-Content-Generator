import { BaseGeneratedItem } from "src/types/base/BaseGeneratedItem";

export class NPC extends BaseGeneratedItem {
    public gender?: string;
    public race?: string;
    public firstName?: string;
    public familyName?: string;
    public funFact?: string;
    static RACE_OPTIONS: string[] = ["Human", "Elf", "Dwarf", "Halfling", "Goblin", "Random"];

    constructor(gender?: string, race?: string, firstName?: string, familyName?: string, funFact?: string) {
        super("blank");
        this.gender = gender;
        this.race = race;
        this.firstName = firstName;
        this.familyName = familyName;
        this.funFact = funFact;
    }

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