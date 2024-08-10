import { NPCRaceSettings } from "../../types/npc/NPCRaceSettings";
import * as DefaultSettingsUtils from "src/shared/utilities/default-settings-utils";

export class NPCGeneratorSettings {
    human: NPCRaceSettings;
    elf: NPCRaceSettings;
    dwarf: NPCRaceSettings;
    halfling: NPCRaceSettings;
    goblin: NPCRaceSettings;
    funFactList: string[];

    constructor(notEmpty: boolean, defaultSettings?: boolean) {
        this.human = new NPCRaceSettings(notEmpty, "Human", defaultSettings);
        this.elf = new NPCRaceSettings(notEmpty, "Elf", defaultSettings);
        this.dwarf = new NPCRaceSettings(notEmpty, "Dwarf", defaultSettings);
        this.halfling = new NPCRaceSettings(notEmpty, "Halfling", defaultSettings);
        this.goblin = new NPCRaceSettings(notEmpty, "Goblin", defaultSettings);

        if(!notEmpty) {
            this.funFactList = [];
        } else if(defaultSettings) {
            this.funFactList = DefaultSettingsUtils.generateDefaultNPCFunFactSettings();
        }
    }
}


export{}
