import { Loot } from "../../../types/loot/Loot";
import { BaseGeneratorService } from "src/features/components/base-generator/base-generation-service";
import { LootGeneratorSettings } from "../../../types/loot/LootGeneratorSettings";
import * as FileUtils from '../../../shared/utilities/file-utils';

export class LootGeneratorService extends BaseGeneratorService {
    GENERATE_NOTE_HIDDEN = true;

    CR_4_D100_MAPPING = {}

    ITEM_VALUE_MAPPING = {"Legendary": 100000, "Very Rare": 22500, "Rare": 2250, "Uncommon": 200, "Common": 70}

    generateItem(lootSettings: LootGeneratorSettings, settings?: any): Loot {
        const randomNumber = Math.random() * 100;
        const gpValue = settings.cr ? this.getTotalGP(settings.cr, randomNumber) : 0;
        const retVal = new Loot('LOOT VALUE');
        retVal.getMapping()["Remaining GP"] = gpValue;
        this.addItemsAsLoot(retVal);
        this.fillItemMapping(retVal, lootSettings);

        return retVal;
    }
    generateLootNoteSheet(fileLocation: string, loot: Loot) {
        const currentdate = new Date(); 
        const datetime = '' + currentdate.getFullYear() + (currentdate.getMonth()+1) + currentdate.getDate() + currentdate.getHours() + currentdate.getMinutes() + currentdate.getSeconds();

        const generatedLootFolder = fileLocation + "\\Loot";
        const fileName = "Loot_" + datetime + ".md";
        
        const overviewContent = '## Overview\r\n\r\n**Additional GP**: !GP_AMOUNT\r\n!ITEM_LIST\r\n\r\n\r\n';
    
        const fullContent = overviewContent.replace("!GP_AMOUNT", '' + loot.getMapping()['Remaining GP']).replace("!ITEM_LIST", loot.getListAsString("\r\n", true));

        
        FileUtils.saveDataToFile(generatedLootFolder, fileName, fullContent);
    }

    private fillItemMapping(lootMap: Loot, lootSettings: LootGeneratorSettings) {
        const itemMapping = lootMap.getItemMapping();
        const mapping = lootMap.getMapping();
        for(const rarity in itemMapping) {
            const listOfAllItems = this.getAllObjectsOfRarity(rarity, lootSettings);
            for(let counter = 0; counter < mapping[rarity as keyof typeof mapping]; counter++) {
                lootMap.getItemMapping()[rarity as keyof typeof itemMapping].push(listOfAllItems[Math.floor(Math.random()*listOfAllItems.length)])
            }
        }
    }

    private getAllObjectsOfRarity(rarity: string, lootSettings: LootGeneratorSettings) {
        const itemSourceListAtRarity = lootSettings.itemList[rarity as keyof typeof lootSettings];
        const listOfAllItems = [];
        for(const source in itemSourceListAtRarity) {
            const itemListInSource = itemSourceListAtRarity[source as keyof typeof itemSourceListAtRarity];
            for(const item in itemListInSource) {
                listOfAllItems.push(itemListInSource[item] + " [" + source + "]")
            }
        }
        return listOfAllItems;
    }

    private addItemsAsLoot(lootMap: Loot) {
        this.updateLootMapForType(lootMap, "Legendary");
        this.updateLootMapForType(lootMap, "Very Rare");
        this.updateLootMapForType(lootMap, "Rare");
        this.updateLootMapForType(lootMap, "Uncommon");
        this.updateLootMapForType(lootMap, "Common");
    }

    private updateLootMapForType(lootMap: Loot, type: string) {
        const mapping = lootMap.getMapping();
        const currentRemainingGP = lootMap.getMapping()["Remaining GP"];
        lootMap.getMapping()[type as keyof typeof mapping] = Math.floor(currentRemainingGP/this.ITEM_VALUE_MAPPING[type as keyof typeof this.ITEM_VALUE_MAPPING]);
        lootMap.getMapping()["Remaining GP"] = currentRemainingGP % this.ITEM_VALUE_MAPPING[type as keyof typeof this.ITEM_VALUE_MAPPING];
    }

    private getTotalGP(cr: number, diceScore: number) {
        if(cr < 5) {
            return this.getTotalGP_CR4(diceScore);
        } else if(cr < 10) {
            return this.getTotalGP_CR10(diceScore);
        } else if(cr < 16) {
            return this.getTotalGP_CR16(diceScore);
        } else {
            return this.getTotalGP_CR20(diceScore);
        }  
    }

    private getTotalGP_CR4(diceScore: number) {
        if(diceScore < 30) {
            return 0.17
        } else if(diceScore < 60) {
            return 1.4
        } else if(diceScore < 70) {
            return 5
        } else if(diceScore < 95) {
            return 10
        } else  {
            return 30
        }
    }

    private getTotalGP_CR10(diceScore: number) {
        if(diceScore < 30) {
            return 31.5
        } else if(diceScore < 60) {
            return 91
        } else if(diceScore < 70) {
            return 122.5
        } else if(diceScore < 95) {
            return 140
        } else  {
            return 170
        }
    }

    private getTotalGP_CR16(diceScore: number) {
        if(diceScore < 20) {
            return 490
        } else if(diceScore < 35) {
            return 525
        } else if(diceScore < 75) {
            return 1050
        } else  {
            return 1400
        }
    }

    private getTotalGP_CR20(diceScore: number) {
        if(diceScore < 15) {
            return 6300
        } else if(diceScore < 55) {
            return 7000
        } else  if(diceScore < 95) {
            return 10500
        } else {
            return 23500
        }
    }
    
  }
