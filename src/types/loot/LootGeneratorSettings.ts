import { ITEM_LIST } from "src/shared/default-settings/DefaultSetting";

export class LootGeneratorSettings {
    itemList: any;
    excludedSources: string[];
    fullSourceList: string[];

    constructor(defaultSettings?: boolean) {
        if(defaultSettings) {
            this.excludedSources = [];
            LootGeneratorSettings.setItemList(this, ITEM_LIST);
        }
    }

    static setItemList(settings: LootGeneratorSettings, itemList: any) {
        settings.itemList = itemList;
        LootGeneratorSettings.pullOutSourcesFromList(settings);
    }

    static getIncludedSources(fullSourceList: string[], excludedSourceList: string[]): string[] {
        return fullSourceList.filter((source: string) => {
            return !excludedSourceList.contains(source);
        });
    }

    private static pullOutSourcesFromList(settings: LootGeneratorSettings) {
        settings.fullSourceList = [];
        for(const rarity in settings.itemList) {
            const sourcesInRarity = settings.itemList[rarity];
            for(const source in sourcesInRarity) {
                if(!settings.fullSourceList.contains(source)) {
                    settings.fullSourceList.push(source);
                }
            }
        }
    }
}

export{}