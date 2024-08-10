import * as DefaultSettingsUtils from "src/shared/utilities/default-settings-utils";

export class NPCRaceSettings {
    raceName: string;
    masculineFirst: string[];
    feminineFirst: string[];
    neutralFirst: string[];
    family: string[];

    constructor(notEmpty: boolean, raceName: string, defaultSettings?: boolean) {
        this.raceName = raceName;
        if(!notEmpty) {
            this.masculineFirst = [];
            this.feminineFirst = [];
            this.neutralFirst = [];
            this.family = [];
        } else if(defaultSettings) {
            const defaultNPCSettings = DefaultSettingsUtils.generateDefaultNPCNameSettings(raceName);
            this.masculineFirst = defaultNPCSettings.masculineFirst;
            this.feminineFirst = defaultNPCSettings.feminineFirst;
            this.neutralFirst = defaultNPCSettings.neutralFirst;
            this.family = defaultNPCSettings.family;
        }
    }
}


export{}
