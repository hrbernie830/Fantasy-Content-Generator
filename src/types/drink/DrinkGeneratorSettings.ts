import * as DefaultSettingsUtils from "src/shared/utilities/default-settings-utils";

export class DrinkGeneratorSettings {
    adj: string[];
    nouns: string[];

    constructor(defaultSettings?: boolean) {
        if(defaultSettings) {
            const defaultSettings = DefaultSettingsUtils.generateDefaultDrinkSettings();
            this.adj = defaultSettings.adj;
            this.nouns = defaultSettings.nouns;
        }
    }
}


export{}
