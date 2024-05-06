import { NPCRaceSettings } from "./NPCRaceSettings";

export class NPCGeneratorSettings {
    human: NPCRaceSettings;
    elf: NPCRaceSettings;
    dwarf: NPCRaceSettings;
    halfling: NPCRaceSettings;
    goblin: NPCRaceSettings;

    constructor(defaultSettings?: boolean) {
        if(defaultSettings) {
            this.human = new NPCRaceSettings("Human", true);
            this.elf = new NPCRaceSettings("Elf", true);
            this.dwarf = new NPCRaceSettings("Dwarf", true);
            this.halfling = new NPCRaceSettings("Halfling", true);
            this.goblin = new NPCRaceSettings("Goblin", true);
        }
    }


}


export{}
