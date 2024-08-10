import { DrinkGeneratorSettings } from 'src/types/drink/DrinkGeneratorSettings';
import { InnGeneratorSettings } from 'src/types/inn/InnGeneratorSettings';
import { LootGeneratorSettings } from 'src/types/loot/LootGeneratorSettings';
import { NPCGeneratorSettings } from 'src/types/npc/NPCGeneratorSettings';

export interface FantasyPluginSettings {
    saveToFileLocation: string;
    innSettings: InnGeneratorSettings;
    drinkSettings: DrinkGeneratorSettings;
    lootSettings: LootGeneratorSettings;
    npcSettings: { available: NPCGeneratorSettings, used: NPCGeneratorSettings }
}