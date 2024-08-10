import * as DefaultSettingsUtils from "src/shared/utilities/default-settings-utils";

export class InnGeneratorSettings {
    prefixes: string[];
    innType: string[];
    nouns: string[];
    desc: string[];
    rumors: string[];

    constructor(defaultSettings?: boolean) {
        if(defaultSettings) {
            const defaultInnSettings = DefaultSettingsUtils.generateDefaultInnSettings();
            this.prefixes = defaultInnSettings.prefixes;
            this.innType = defaultInnSettings.innType;
            this.nouns = defaultInnSettings.nouns;
            this.desc = defaultInnSettings.desc;
            this.rumors = defaultInnSettings.rumors;
        }
    }


}


export{}
